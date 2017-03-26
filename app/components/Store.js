
import React, { Component } from 'react'
import { ButtonToolbar, DropdownButton, MenuItem, Row } from 'react-bootstrap'
import { connect } from 'react-redux'

import Loading from './Loading'
import ProductThumbnail from './ProductThumbnail'
import StoreCarousel from './StoreCarousel'
import { productArray } from '../helpers/product'
import { setFilter } from '../reducers/reduceShop'

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
    let { dispatch, filter: currentFilter } = this.props
    let loading = products.length === 0 && Object.values(loaded).every(l => !l)
    let filterProducts = products.filter(p => {
      return loaded[p.id] && (!currentFilter || p.type === currentFilter)
    })
    let filterLabel = currentFilter ? `: ${currentFilter}` : ``
    return (
      <div className='store-container fadein'>
        <h1 className='text-center hidden-xs hidden-sm'>RAMBLE ON</h1>
        <StoreCarousel />
        <div className='store-items'>
          { loading &&
            <Loading size='5x' />
          }
          { !loading &&
            <div>
              <ButtonToolbar className='top-buffer'>
                <DropdownButton id='filter-dropdown' title={`Type${filterLabel}`}>
                  <MenuItem key='clear' onClick={() => { dispatch(setFilter({ filter: null })) }}>
                    <span>All</span>
                  </MenuItem>
                  <MenuItem divider />
                  { types.map(filter => (
                    <MenuItem key={filter} onClick={() => { dispatch(setFilter({ filter })) }}>
                      { filter }
                    </MenuItem>
                  ))}
                </DropdownButton>
              </ButtonToolbar>
              <Row>
                { filterProducts.map(product => (
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
  filter: state.shop.filter,
}))(Store)
