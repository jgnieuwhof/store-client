
import React, { Component } from 'react'
import { Grid, Col, Thumbnail } from 'react-bootstrap'
import { withRouter } from 'react-router'

import Loading from 'components/Loading'
import StoreCarousel from 'components/StoreCarousel'
import { productFromShopify } from 'helpers/shopify'

class Store extends Component {
  state = {
    loading: true,
    products: [],
  }

  componentWillMount = () => {
    this.fetchProducts()
  }

  fetchProducts = async () => {
    let { shopify: { client } } = this.context
    let shopifyProducts = await client.fetchAllProducts()
    this.setState({
      loading: false,
      products: shopifyProducts.map(product => productFromShopify(product)),
    })
  }

  productClick = (e, id) => {
    e.preventDefault()
    this.props.router.push(`/product/${id}`)
  }

  render = () => {
    return (
      <div className="store-container">
        <StoreCarousel />
        <div className="store-items">
          { this.state.loading &&
            <Loading size='5x'/>
          }
          { !this.state.loading &&
            <Grid>
              { this.state.products.map(product => {
                let showMeta = !!product.size
                return (
                  <Col
                      key={product.id}
                      xs={6} md={4} lg={3}
                      className="center-content top-buffer fadein"
                    >
                    <Thumbnail
                        className={`store-thumbnail center-content`}
                        onClick={e => { this.productClick(e, product.id) }}
                        src={product.images[0].src}
                      >
                      <span className={`title text-center ${showMeta?`with-meta`:``}`}>
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

export default withRouter(Store)
