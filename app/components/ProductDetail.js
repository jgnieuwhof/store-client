import React, { Component } from 'react'
import { Row, Col, Thumbnail, Carousel } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import CallToAction from './CallToAction'
import Loading from './Loading'
import PageHeader from './PageHeader'
import { addVariantToCart } from '../reducers/reduceCart'
import { fetchProduct } from '../reducers/reduceShop'

let Price = ({ price }) => (
  <p className='price'>Price: {price}</p>
)

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
    let { dispatch } = this.props
    let { variant } = this.product()
    if (add)
      dispatch(addVariantToCart({ variant }))
    browserHistory.push(`/cart`)
  }

  render = () => {
    let actionText, disabled = false, add = false
    let { featureImage } = this.state
    let { products, lineItems, params: { id } } = this.props
    let product = products[+id]
    let isSoldOut = product && !product.variant.available
    if (!product) {
      return <Loading size='5x' />
    }
    if (isSoldOut) {
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
    let thumbnailArrays = []
    let images = product.images.slice(0)
    while (images.length > 0)
      thumbnailArrays.push(images.splice(0, 4))
    return (
      <div className='product-detail fadein'>
        <PageHeader title={product.title} />
        <Row>
          <Col sm={6}>
            <Row className='feature-image center-content'>
              <img
                style={{ height: 400 }}
                className='img-responsive'
                src={ featureImage || product.images[0].src }
              />
            </Row>
            <Carousel className='thumbnails center-content'>
              { thumbnailArrays.map((images, i) => (
                <Carousel.Item key={i}>
                  <Row>
                    { images.map(({ src }) => (
                      <Col key={src} xs={3}>
                        <Thumbnail
                          src={src}
                          onClick={() => this.setState({ featureImage: src })}
                        />
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
                ))}
            </Carousel>
          </Col>
          <Col sm={6}>
            <Row>
              <Col md={12} className='description'>
                { isSoldOut && (
                  <p>
                    This item has sold.
                    If you'd like something similar click
                    <a onClick={() => {
                      browserHistory.push(`/contact/customOrderRequest`)
                    }}
                    > here </a>
                     and request a custom order.
                  </p>
                )}
                { !isSoldOut && (
                  <div
                    dangerouslySetInnerHTML={this.descriptionHTML(product.description)}
                  />
                )}
              </Col>
            </Row>
            <div className='top-buffer'>
              <CallToAction large
                customContent={<Price price={product.variant.formattedPrice} />}
                onClick={() => {this.addProductToCartHandler(add)}}
                disabled={disabled}
                title={actionText}
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

ProductDetail.contextTypes = {
  shopify: React.PropTypes.object,
}

export default connect(state => ({
  lineItems: state.cart.lineItems,
  products: state.shop.products,
}))(ProductDetail)
