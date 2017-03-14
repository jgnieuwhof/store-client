import React, { Component } from 'react'
import { Row, Col, Carousel } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import CallToAction from './CallToAction'
import Loading from './Loading'
import PageHeader from './PageHeader'
import { addVariantToCart } from '../reducers/reduceCart'
import { fetchProduct } from '../reducers/reduceShop'

class ProductDetail extends Component {
  state: {
    product: null,
  }

  setProductFromProps = ({ props, fetch }) => {
    let { dispatch, products, params: { id } } = props
    let product = products[+id]
    if (product) {
      this.setState({ product })
    }
    else if (fetch) {
      dispatch(fetchProduct({ id }))
    }
  }

  componentWillMount = () => {
    this.setProductFromProps({
      props: this.props,
      fetch: true,
    })
  }

  componentWillReceiveProps = (nextProps) => {
    this.setProductFromProps({
      props: nextProps,
      fetch: true,
    })
  }

  descriptionHTML = (description) => ({
    __html: description,
  })

  addProductToCartHandler = (add) => {
    let { dispatch, router } = this.props
    let { product: { variant } } = this.state
    if (add) {
      dispatch(addVariantToCart({ variant }))
    }
    router.push(`/cart`)
  }

  render = () => {
    let detailStyle = { paddingLeft: 20 }
    let actionText, disabled = false, add = false
    let { products, lineItems, params: { id } } = this.props
    let product = products[+id]
    if (!product) {
      return <Loading size='5x' />
    }
    if (!product.variant.available) {
      disabled = true
      actionText = `Sold Out`
    }
    else if (lineItems && lineItems.find(li => li.variant_id === product.variant.id)) {
      actionText = `Go to Cart`
    }
    else {
      add = true
      actionText = `Add to Cart`
    }
    return (
      <div className='product-detail fadein'>
        <PageHeader title={product.title} />
        <Carousel className='top-buffer'>
          { product.images.map((image, i) => (
            <Carousel.Item key={i}>
              <img height={400} src={image.src} />
            </Carousel.Item>
          ))}
        </Carousel>
        <Row className='top-buffer' style={{ paddingRight: 20, paddingLeft: 20 }}>
          <Col md={12} className='well product-description'>
            <p><strong>Description:</strong></p>
            <div
              style={detailStyle}
              dangerouslySetInnerHTML={this.descriptionHTML(product.description)}
            />
            <p><strong>Price: </strong></p>
            <div style={detailStyle}>{product.variant.formattedPrice}</div>
          </Col>
        </Row>
        <CallToAction
          onClick={() => {this.addProductToCartHandler(add)}}
          disabled={disabled}
          topBuffer={false}
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
