import React, { Component } from 'react'
import { Button, Row, Col, Thumbnail } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'

import CallToAction from './CallToAction'
import PageHeader from './PageHeader'
import { removeItemFromCart } from '../reducers/reduceCart'

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
    let { cart } = this.props
    let { lineItems } = cart
    let hasLineItems = lineItems && lineItems.length > 0
    return (
      <div className='cart'>
        <PageHeader title='My Cart' />
        { !hasLineItems && <div>There's nothing here!</div>}
        { hasLineItems && (
          <div>
            <div className='line-items top-buffer'>
              { hasLineItems && lineItems.length && lineItems.map(lineItem => {
                let price = (lineItem.line_price * lineItem.quantity).toFixed(2)
                return (
                  <Row key={lineItem.id}>
                    <Col xs={4} sm={2}>
                      <Thumbnail
                        onClick={() => { this.productClick(lineItem.product_id) }}
                        src={lineItem.image.src}
                      />
                    </Col>
                    <Col sm={8}>
                      <a onClick={() => { this.productClick(lineItem.product_id) }}>
                        <h4>{lineItem.title}</h4>
                        <span>{`// Price: $${price}`}</span>
                      </a>
                    </Col>
                    <Col xs={12} sm={2} className='action-buttons'>
                      <Button onClick={() => { this.removeItem(lineItem.id)}}>
                        <FontAwesome name='times' />
                        <span>Remove</span>
                      </Button>
                    </Col>
                  </Row>
                )
              })}
            </div>
          </div>
        )}
        <CallToAction
          className='top-buffer'
          onClick={this.checkout}
          disabled={!lineItems.length}
          title='CHECKOUT'
        />
      </div>
    )
  }
}

export default withRouter(connect(state => ({
  cart: state.cart,
}))(Cart))
