
import React from 'react'
import { Row } from 'react-bootstrap'
import { connect } from 'react-redux'

import Loading from './Loading'
import ProductThumbnail from './ProductThumbnail'
import StoreCarousel from './StoreCarousel'

const Store = ({ products }) => {
  let loading = Object.keys(products).length === 0
  return (
    <div className="store-container fadein">
      <StoreCarousel />
      <div className="store-items">
        { loading &&
          <Loading size='5x' />
        }
        { !loading &&
          <Row>
            { Object.keys(products).map(id => (
              <ProductThumbnail key={id} product={products[id]} />
            )) }
          </Row>
        }
      </div>
    </div>
  )
}

export default connect(state => ({
  products: state.shop.products,
}))(Store)
