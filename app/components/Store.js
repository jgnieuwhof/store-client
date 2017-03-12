
import React, { Component } from 'react'
import { Grid, Col, Thumbnail } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Loading from './Loading'
import StoreCarousel from './StoreCarousel'
import { fetchProducts } from '../reducers/reduceShop'

class Store extends Component {
  componentWillMount = () => {
    this.props.dispatch(fetchProducts())
  }

  productClick = (e, id) => {
    e.preventDefault()
    this.props.router.push(`/product/${id}`)
  }

  render = () => {
    let { products } = this.props
    let loading = products.length === 0
    return (
      <div className="store-container">
        <StoreCarousel />
        <div className="store-items">
          { loading &&
            <Loading size='5x' />
          }
          { !loading &&
            <Grid>
              { products.map(product => {
                let showMeta = !!product.size
                return (
                  <Col
                    key={product.id}
                    xs={6} md={4} lg={3}
                    className="top-buffer fadein"
                  >
                    <Thumbnail
                      className='store-thumbnail'
                      onClick={e => { this.productClick(e, product.id) }}
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
            </Grid>
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
