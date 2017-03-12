import React, { Component } from 'react'
import { Button, Row, Col, Thumbnail } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'

import { removeItemFromCart } from 'reducers/reduceCart'

class Cart extends Component {
  checkout = () => {
    window.location.href = this.props.cart.checkoutUrl
  }

  productClick = (productId) => {
    this.props.router.push(`/product/${productId}`)
  }

  removeItem = async (listItemId) => {
    let { dispatch, router } = this.props
    await dispatch(removeItemFromCart({ id: listItemId }))
    if (this.props.cart.lineItems.length === 0) {
      router.push(`/store`)
    }
  }

  render = () => {
    let { cart, router } = this.props
    let { lineItems } = cart
    return (
      <div className='cart'>
        <Row className='action-buttons'>
          <Col xs={12} sm={6}>
            <Button onClick={() => { router.push(`/store`) }}>
              <FontAwesome name='arrow-left' />
              <span>Back to Store</span>
            </Button>
          </Col>
        </Row>
        <div>
          { lineItems.map(lineItem => (
            <Row key={lineItem.id} className='top-buffer line-item'>
              <Col xs={4} sm={2}>
                <Thumbnail
                    onClick={() => { this.productClick(lineItem.product_id) }}
                    src={lineItem.image.src}
                  />
              </Col>
              <Col sm={8}>
                <h4>
                  <a onClick={() => { this.productClick(lineItem.product_id) }}>
                    { lineItem.title }
                  </a>
                </h4>
              </Col>
              <Col xs={12} sm={2} className='action-buttons'>
                <Button onClick={() => { this.removeItem(lineItem.id)}}>
                  <FontAwesome name='times'/>
                  <span>Remove</span>
                </Button>
              </Col>
            </Row>
          ))}
        </div>
        <Row className='action-buttons top-buffer'>
          <Col xs={12} sm={6} smOffset={3} className='text-center'>
            <Button
                block
                bsSize='large'
                bsStyle='primary'
                onClick={this.checkout}
                disabled={!lineItems.length}
              >
              Checkout
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(connect(state => ({
  cart: state.cart,
}))(Cart))
