import React, { Component } from 'react'
import { Button, Grid, Row, Col, Carousel } from 'react-bootstrap'
import { withRouter } from 'react-router'

import Loading from 'components/Loading'
import { productFromShopify } from 'util/product'

class ProductDetail extends Component {
  state = {
    loading: true,
    product: {},
  }

  componentWillMount = () => {
    this.fetchProduct()
  }

  fetchProduct = async () => {
    let { shopify } = this.context
    let { productId } = this.props.params
    let product = await shopify.fetchProduct(productId)
    this.setState({
      loading: false,
      product: productFromShopify(product),
    })
  }

  descriptionHTML = (description) => ({
    __html: description,
  })

  backToStore = () => {
    this.props.router.push('/store')
  }

  render = () => {
    if (this.state.loading) {
      return <Loading size='5x' />
    }
    let { product } = this.state
    return (
      <Grid className="product-detail">
        <h3>{product.title}</h3>
        <Carousel>
          { product.images.map((image, i) => (
            <Carousel.Item key={i}>
              <img height={600} src={image.src}/>
            </Carousel.Item>
          ))}
        </Carousel>
        <Row>
          <Col md={12} className="product-description">
            <div dangerouslySetInnerHTML={this.descriptionHTML(product.description)} />
          </Col>
        </Row>
        <Button onClick={this.backToStore}>Back to Store</Button>
      </Grid>
    )
  }
}

ProductDetail.contextTypes = {
  shopify: React.PropTypes.object,
}

export default withRouter(ProductDetail)
