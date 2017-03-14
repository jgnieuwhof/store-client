
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
      this.setState({ products, types })
    }
  }

  componentWillMount = () => {
    this.updateProducts(this.props)
  }

  componentWillReceiveProps = (nextProps) => {
    this.updateProducts(nextProps)
  }

  render = () => {
    let { products, types } = this.state
    let { dispatch, filter: currentFilter } = this.props
    let loading = products.length === 0
    let filterProducts = products.filter(p => !currentFilter || p.type === currentFilter)
    let filterLabel = currentFilter ? `: ${currentFilter}` : ``
    return (
      <div className='store-container fadein'>
        <StoreCarousel />
        <ButtonToolbar className='top-buffer'>
          <DropdownButton
            id='filter-dropdown'
            title={`Type${filterLabel}`}
          >
            <MenuItem key='clear' onClick={() => { dispatch(setFilter({ filter: null })) }}>
              All
            </MenuItem>
            <MenuItem divider />
            { types.map(filter => (
              <MenuItem key={filter} onClick={() => { dispatch(setFilter({ filter })) }}>
                { filter }
              </MenuItem>
            ))}
          </DropdownButton>
        </ButtonToolbar>
        <div className='store-items'>
          { loading &&
            <Loading size='5x' />
          }
          { !loading &&
            <Row>
              { filterProducts.map(product => (
                <ProductThumbnail key={product.id} product={product} />
              )) }
            </Row>
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
