
import React, { Component } from 'react'
import { Button, Col, DropdownButton, MenuItem, Pagination, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import BoloText from './BoloText'
import Loading from './Loading'
import ProductThumbnail from './ProductThumbnail'
import StoreCarousel from './StoreCarousel'
import { applyFilters, subFilters } from '../helpers/store'
import { productArray } from '../helpers/product'
import { setFilter } from '../reducers/reduceShop'

const Filter = connect()(({ children, dispatch, filter, current, currentSub }) => {
  let subs = filter && subFilters[filter.toLowerCase()]
  let className = `naked ${filter === current ? `active` : ``}`
  let setSub = ({ name, option }) => dispatch(setFilter({ filter, subFilter: { name, option } }))
  return (
    <span className='filter-container'>
      { subs ? (
        <DropdownButton id={filter} title={filter} className={className}>
          <MenuItem eventKey='0'
            onClick={() => dispatch(setFilter({ filter }))}
          >
            All
          </MenuItem>
          { subs.map(({ name, options }) => ([
            <MenuItem key={name} header>{name}</MenuItem>,
            options.map((x, i) => (
              <MenuItem key={i} eventKey={i}
                className={currentSub && currentSub.option === x ? `active` : ``}
                onClick={() => { setSub({ name: name.toLowerCase(), option: x })}}
              >
                {x}
              </MenuItem>
            )),
          ]))}
        </DropdownButton>
      ) : (
        <Button className={className}
          onClick={() => dispatch(setFilter({ filter }))}
        >
          { children }
        </Button>
      )}
    </span>
  )
})

const Filters = ({ types, current, currentSub }) => (
  <div className='filters top-buffer bordered'>
    <Row>
      <Col xs={12}>
        <Filter filter={null} current={current}>All</Filter>
        <Filter filter='new' current={current}>New Arrivals</Filter>
        { types.sort().map(filter => (
          <Filter key={filter} filter={filter}
            current={current} currentSub={currentSub}
          >
            {filter}
          </Filter>
        ))}
        <span className='filter-container'>
          <Button
            className='naked'
            onClick={() => { browserHistory.push(`/contact/customOrderRequest`) }}
          >
            Request Custom Order
          </Button>
        </span>
      </Col>
    </Row>
  </div>
)

class Store extends Component {
  state = {
    loaded: {},
    products: [],
    types: [],
    page: 1,
    pageSize: 12,
  }

  updateProducts = ({ products: productHash }) => {
    let products = productArray(productHash)
    if (products) {
      let types = products
        .filter(({ type }) => (type !== null && type.trim() !== ``))
        .map(({ type }) => (type.trim()))
        .reduce((arr, type) => (
          arr.includes(type) ? arr : [ ...arr, type ]
        ), [])
      products.sort((p1, p2) => (
        p1.variant.available && p2.variant.available ? 0 : (p1.variant.available ? -1 : 1)
      ))
      let loaded = products.reduce((loaded, product) => {
        let image = product.images[0]
        if (!image.complete && !image.onload) {
          image.onload = () => {
            this.setState({ loaded: { ...this.state.loaded, [product.id]: true } })
          }
        }
        return { ...loaded, [product.id]: image.complete }
      }, {})
      this.setState({ products, types, loaded })
    }
  }

  componentDidMount = () => {
    this.updateProducts(this.props)
  }

  componentWillReceiveProps = (nextProps) => {
    this.updateProducts(nextProps)
  }

  componentWillUnmount = () => {
    let { products } = this.props
    productArray(products).forEach(x => x.images[0].onload = null)
  }

  setPage = page => this.setState({ page })

  render = () => {
    let { loaded, page, pageSize, products, types } = this.state
    let { currentFilter, currentSubFilter } = this.props
    let loading = products.length === 0
    let filteredProducts = applyFilters({
      products, currentFilter, currentSubFilter,
    })
    let paginatedProducts = filteredProducts.
      slice((page - 1) * pageSize, page * pageSize)
    console.log(products.length / pageSize)
    return (
      <div className='store-container fadein'>
        <h1 className='text-center hidden-xs hidden-sm'>
          <BoloText>RAMBLE ON</BoloText>
        </h1>
        <StoreCarousel />
        <div className='store-items'>
          { loading &&
            <Loading size='5x' />
          }
          { !loading &&
            <div>
              <Filters types={types} current={currentFilter} currentSub={currentSubFilter} />
              <Row>
                { paginatedProducts && paginatedProducts.length ? (
                  paginatedProducts.map(x => (
                    <ProductThumbnail key={x.id} product={x} isLoaded={loaded[x.id]} />
                  ))
                ) : (
                  <p className='top-buffer text-center'>
                    There's nothing here, please try another selection
                  </p>
                )}
              </Row>
              <Row className='text-center'>
                <Pagination
                  prev next first last
                  ellipsis boundaryLinks
                  maxButtons={5}
                  items={Math.ceil(filteredProducts.length / pageSize)}
                  activePage={page}
                  onSelect={this.setPage}
                />
              </Row>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  products: state.shop.products,
  currentFilter: state.shop.filter,
  currentSubFilter: state.shop.subFilter,
}))(Store)
