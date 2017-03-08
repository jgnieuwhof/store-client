
import React, { Component } from 'react'
import { Grid, Col, Thumbnail } from 'react-bootstrap'
import { withRouter } from 'react-router'

import Loading from 'components/Loading'
import StoreCarousel from 'components/StoreCarousel'
import { productFromShopify } from 'util/product'

class Store extends Component {
  state = {
    loading: true,
    products: [],
  }

  componentDidMount = () => {
    this.fetchProducts()
  }

  fetchProducts = async () => {
    let { shopify } = this.context
    let shopifyProducts = await shopify.fetchAllProducts()
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
    let products = []
    if (this.state.products.length) {
      let product = this.state.products[0]
      for(let i = 0; i < 8; i++) {
        products = [
          ...products,
          { ...product, key: i },
        ]
      }
    }
    return (
      <div className="store-container">
        <StoreCarousel />
        <div className="store-items">
          { this.state.loading &&
            <Loading size='5x'/>
          }
          { !this.state.loading &&
            <Grid>
              { products.map(product => (
                <Col
                    key={product.key}
                    xs={6} md={4} lg={3}
                    className="center-content top-buffer fadein"
                  >
                  <Thumbnail
                      href=""
                      className="store-thumbnail center-content"
                      onClick={e => { this.productClick(e, product.id) }}
                      src={product.images[0].src}
                    >
                    <span>{product.title}</span>
                  </Thumbnail>
                </Col>
              ))}
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
