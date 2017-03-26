import React, { Component } from 'react'
import { Row, Col, Thumbnail } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import CallToAction from './CallToAction'
import Loading from './Loading'
import PageHeader from './PageHeader'
import { addVariantToCart } from '../reducers/reduceCart'
import { fetchProduct } from '../reducers/reduceShop'

class ProductDetail extends Component {
  state = {
    featureImage: null,
  }

  product = () => {
    let { products, params: { id } } = this.props
    return products[+id]
  }

  componentWillMount = () => {
    let { dispatch, params: { id } } = this.props
    if (!this.product())
      dispatch(fetchProduct({ id }))
  }

  descriptionHTML = (description) => ({
    __html: description,
  })

  addProductToCartHandler = (add) => {
    let { dispatch, router } = this.props
    let { variant } = this.product()
    if (add) {
      dispatch(addVariantToCart({ variant }))
    }
    router.push(`/cart`)
  }

  render = () => {
    let actionText, disabled = false, add = false
    let { featureImage } = this.state
    let { products, lineItems, params: { id } } = this.props
    let product = products[+id]
    if (!product) {
      return <Loading size='5x' />
    }
    if (!product.variant.available) {
      disabled = true
      actionText = `SOLD OUT`
    }
    else if (lineItems && lineItems.find(li => li.variant_id === product.variant.id)) {
      actionText = `GO TO CART`
    }
    else {
      add = true
      actionText = `ADD TO CART`
    }
    return (
      <div className='product-detail fadein'>
        <PageHeader title={product.title} />
        <Row className='feature-image center-content top-buffer'>
          <img
            style={{ maxHeight: 300 }}
            className='img-responsive'
            src={ featureImage || product.images[0].src }
          />
        </Row>
        <Row className='thumbnails center-content'>
          { product.images.map(({ src }, i) => (
            <Col key={i} xs={4} sm={2}>
              <Thumbnail
                src={src}
                onClick={() => this.setState({ featureImage: src })}
              />
            </Col>
          ))}
        </Row>
        <Row className='top-buffer'>
          <Col md={12} className='description'>
            <div dangerouslySetInnerHTML={this.descriptionHTML(product.description)} />
            <p><strong>Price: {product.variant.formattedPrice}</strong></p>
          </Col>
        </Row>
        <div className='top-buffer hidden-md hidden-lg' />
        <CallToAction
          onClick={() => {this.addProductToCartHandler(add)}}
          disabled={disabled}
          title={actionText}
        />
      </div>
    )
  }
}

ProductDetail.contextTypes = {
  shopify: React.PropTypes.object,
}

export default withRouter(connect(state => ({
  lineItems: state.cart.lineItems,
  products: state.shop.products,
}))(ProductDetail))
