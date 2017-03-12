import React, { Component } from 'react'
import { Button, Row, Col, Carousel } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import Loading from 'components/Loading'
import { productFromShopify } from 'helpers/shopify'
import { addVariantToCart } from 'reducers/reduceCart'

class ProductDetail extends Component {
  state = {
    loading: true,
    product: {},
  }

  componentWillMount = () => {
    this.fetchProduct()
  }

  fetchProduct = async () => {
    let { shopify: { client } } = this.context
    let { productId } = this.props.params
    let product = await client.fetchProduct(productId)
    this.setState({
      loading: false,
      product: productFromShopify(product),
    })
  }

  descriptionHTML = (description) => ({
    __html: description,
  })

  backToStore = () => {
    this.props.router.push(`/store`)
  }

  addProductToCartHandler = (add) => {
    let { dispatch, router } = this.props
    let { product: { variant } } = this.state
    if (add) {
      dispatch(addVariantToCart({ variant }))
    }
    router.push(`/cart`)
  }

  render = () => {
    let { loading, product } = this.state
    if (loading) {
      return <Loading size='5x' />
    }
    let actionText, disabled = false, add = false
    let { lineItems } = this.props
    let { variant } = product
    let { available } = variant
    if (!available) {
      disabled = true
      actionText = `Sold Out`
    }
    else if (lineItems && lineItems.find(li => li.variant_id === variant.id)) {
      actionText = `Go to Cart`
    }
    else {
      add = true
      actionText = `Add to Cart`
    }
    return (
      <div className='product-detail fadein'>
        <h3 className='text-center'>{product.title}</h3>
        <Carousel className='top-buffer'>
          { product.images.map((image, i) => (
            <Carousel.Item key={i}>
              <img height={600} src={image.src}/>
            </Carousel.Item>
          ))}
        </Carousel>
        <Row className='top-buffer'>
          <Col md={12} className='product-description'>
            <div dangerouslySetInnerHTML={this.descriptionHTML(product.description)} />
          </Col>
        </Row>
        <Row className='action-buttons top-buffer'>
          <Col xs={12} sm={6}>
            <Button onClick={() => {this.addProductToCartHandler(add)}} disabled={disabled}>
              {actionText}
            </Button>
          </Col>
          <Col xs={12} sm={6} className='text-right'>
            <Button onClick={this.backToStore}>Back to Store</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

ProductDetail.contextTypes = {
  shopify: React.PropTypes.object,
}

export default withRouter(connect(state => ({
  lineItems: state.cart.lineItems,
}))(ProductDetail))
