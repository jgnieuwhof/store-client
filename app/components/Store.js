
import React, { Component } from 'react'
import { ButtonToolbar, DropdownButton, MenuItem, Row } from 'react-bootstrap'
import { connect } from 'react-redux'

import Loading from './Loading'
import ProductThumbnail from './ProductThumbnail'
import StoreCarousel from './StoreCarousel'
import { productArray } from '../helpers/product'

class Store extends Component {
  state = {
    filter: null,
    products: [],
    types: [],
  }

  componentWillReceiveProps = (nextProps) => {
    let { products: productHash } = nextProps
    let products = productArray(productHash)
    if (products) {
      let types = products.reduce((arr, { type }) => (
        arr.includes(type) ? arr : [ ...arr, type ]
      ), [])
      products.sort((p1, p2) => (
        p1.available && p2.available ? 0 : (p1.available ? -1 : 1)
      ))
      this.setState({ products, types })
    }
  }

  render = () => {
    let { products, types, filter: currentFilter } = this.state
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
            <MenuItem key='clear' onClick={() => {this.setState({ filter: null })}}>
              All
            </MenuItem>
            <MenuItem divider />
            { types.map(filter => (
              <MenuItem key={filter} onClick={() => {this.setState({ filter })}}>
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
}))(Store)
