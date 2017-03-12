
import React from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'

const CartBadge = ({ subtotal }) => (
  <div>
    <FontAwesome name='shopping-cart' />
    { subtotal && <span> ${subtotal}</span> }
  </div>
)

export default connect((state) => ({
  subtotal: state.cart.subtotal,
}))(CartBadge)
