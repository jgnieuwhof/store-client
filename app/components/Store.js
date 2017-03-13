
import React, { Component } from 'react'
import { Row, Col, Thumbnail } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Loading from './Loading'
import StoreCarousel from './StoreCarousel'

class Store extends Component {
  render = () => {
    let { products } = this.props
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
              { Object.keys(products).map(id => {
                let product = products[id]
                let showMeta = !!product.size
                return (
                  <Col
                    key={product.id}
                    xs={6} md={4} lg={3}
                    className="top-buffer fadein"
                  >
                    <Thumbnail
                      className='store-thumbnail'
                      onClick={() => { this.props.router.push(`/product/${product.id}`) }}
                      src={product.images[0].src}
                    >
                      <span className={`title text-center ${showMeta ? `with-meta` : ``}`}>
                        {product.title}
                      </span>
                      { showMeta && (
                        <span className='meta'>
                          <span>{`Size: ${product.size}`}</span>
                        </span>
                      )}
                    </Thumbnail>
                  </Col>
                )}
              )}
            </Row>
          }
        </div>
      </div>
    )
  }
}

Store.contextTypes = {
  shopify: React.PropTypes.object,
}

export default withRouter(connect(state => ({
  products: state.shop.products,
}))(Store))
