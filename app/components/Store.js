
import React, { Component } from 'react'
import { Pagination, Row } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import StoreFilters from './StoreFilters'
import Loading from './Loading'
import ProductThumbnail from './ProductThumbnail'
import StoreCarousel from './StoreCarousel'

import { getPosition } from '../helpers/dom'
import { applyFilters } from '../helpers/store'
import { productArray } from '../helpers/product'

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

  scrollToFilters = () => {
    let filters = ReactDOM.findDOMNode(this.filters)
    let { y } = getPosition(filters)
    window.scrollTo(0, window.scrollY + y - filters.offsetHeight)
  }

  setPage = (page) => {
    this.scrollToFilters()
    this.setState({ page })
  }

  render = () => {
    let { loaded, page, pageSize, products, types } = this.state
    let { currentFilter, currentSubFilter } = this.props
    let loading = products.length === 0
    let filteredProducts = applyFilters({ products, currentFilter, currentSubFilter })
    let paginatedProducts = filteredProducts.
      slice((page - 1) * pageSize, page * pageSize)
    let numberOfPages = Math.ceil(filteredProducts.length / pageSize)
    return (
      <div className='store-container fadein'>
        <StoreCarousel className='top-buffer' />
        <div className='store-items'>
          { loading &&
            <Loading size='5x' />
          }
          { !loading &&
            <div>
              <StoreFilters
                types={types}
                ref={x => this.filters = x}
                current={currentFilter}
                currentSub={currentSubFilter}
                onChange={() => this.setPage(1)}
              />
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
                  items={numberOfPages}
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
