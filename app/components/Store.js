
import React, { Component } from 'react'
import { Button, ButtonGroup, ButtonToolbar, Row } from 'react-bootstrap'
import { connect } from 'react-redux'

import BoloText from './BoloText'
import Loading from './Loading'
import ProductThumbnail from './ProductThumbnail'
import StoreCarousel from './StoreCarousel'
import { productArray } from '../helpers/product'
import { setFilter } from '../reducers/reduceShop'

const Filter = connect()(({ children, dispatch, filter, current }) => (
  <Button
    className={filter === current ? `active` : ``}
    onClick={() => dispatch(setFilter({ filter }))}
  >
    { children }
  </Button>
))

const Filters = ({ types, current }) => (
  <div className='filters top-buffer'>
    <ButtonToolbar>
      <ButtonGroup>
        <Filter filter={null} current={current}>All</Filter>
        <Filter filter='new' current={current}>New Arrivals</Filter>
        { types.map(filter => (
          <Filter
            key={filter}
            filter={filter}
            current={current}
          >
            { filter }
          </Filter>
        ))}
      </ButtonGroup>
      <Button>Request Custom Order</Button>
    </ButtonToolbar>
  </div>
)

class Store extends Component {
  state = {
    loaded: {},
    products: [],
    types: [],
  }

  updateProducts = ({ products: productHash }) => {
    let products = productArray(productHash)
    if (products) {
      let types = products.reduce((arr, { type }) => (
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

  componentWillMount = () => {
    this.updateProducts(this.props)
  }

  componentWillReceiveProps = (nextProps) => {
    this.updateProducts(nextProps)
  }

  render = () => {
    let { products, types, loaded } = this.state
    let { currentFilter } = this.props
    let loading = products.length === 0 && Object.values(loaded).every(l => !l)
    let today = new Date()
    let newCutoff = today.setMonth(today.getMonth() - 1)
    let filteredProducts = products.filter(p => (
      loaded[p.id] &&
        (!currentFilter ||
          p.type === currentFilter ||
          (currentFilter === `new` && p.createdAt > newCutoff)
        )
    ))
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
              <Filters types={types} current={currentFilter} />
              <Row>
                { filteredProducts.map(product => (
                  <ProductThumbnail key={product.id} product={product} />
                )) }
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
}))(Store)
