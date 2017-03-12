import u from 'updeep'

import { cart as cartActions } from 'actions'

// ============================================================================
// Cart Action Creators
// ============================================================================

export const setupCart = () => {
  return async (dispatch, getState, { shopify }) => {
    let cart
    let { cart: { id } } = getState()
    if (!id)
      cart = await shopify.client.createCart()
    else
      cart = await shopify.client.fetchCart(id)
    shopify.cart = cart
    dispatch({ type: cartActions.SET_ID, id: cart.id })
    dispatch(updateCart({ cart }))
  }
}

export const addVariantToCart = ({ variant }) => {
  return async (dispatch, getState, { shopify }) => {
    let cart = await shopify.cart.createLineItemsFromVariants({ variant, quantity: 1 })
    dispatch(updateCart({ cart }))
  }
}

const updateCart = ({ cart }) => {
  return dispatch => {
    let { lineItemCount, subtotal, lineItems, checkoutUrl } = cart
    lineItems = lineItems.map(lineItem => {
      let { id, variant_id, quantity, line_price, title, image, product_id } = lineItem
      return { id, variant_id, quantity, line_price, title, image, product_id }
    })
    dispatch({
      type: cartActions.UPDATE_CART,
      payload: {
        lineItems,
        lineItemCount,
        subtotal,
        checkoutUrl,
      },
    })
  }
}

export const removeItemFromCart = ({ id }) => {
  return async (dispatch, getState, { shopify }) => {
    let cart = await shopify.cart.removeLineItem(id)
    dispatch(updateCart({ cart }))
  }
}

// ============================================================================
// Cart Reducer
// ============================================================================

const defaultState = {
  id: localStorage.cartId,
  lineItems: [],
  lineItemCount: null,
  subtotal: null,
}

export default function (state = defaultState, action) {
  let update
  switch (action.type) {
    // ------------------------------------------------------------------------
    case cartActions.SET_ID:
      localStorage.cartId = action.id
      update = { id: action.id }
      break

    // ------------------------------------------------------------------------
    case cartActions.UPDATE_CART:
      update = { ...action.payload }
      break
  }
  return update ? u(update, state) : state
}
