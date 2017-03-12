import u from 'updeep'

import { shop } from '../actions'
import { productFromShopify } from '../helpers/shopify'

// ============================================================================
// Shop Action Creators
// ============================================================================

export const fetchProduct = ({ id }) => {
  return async (dispatch, getState, { shopify: { client } }) => {
    let product = await client.fetchProduct(id)
    dispatch({
      type: shop.SET_PRODUCT,
      product: productFromShopify(product),
    })
  }
}

export const fetchProducts = () => {
  return async (dispatch, getState, { shopify: { client } }) => {
    let shopifyProducts = await client.fetchAllProducts()
    dispatch({
      type: shop.SET_PRODUCTS,
      products: shopifyProducts.map(product => productFromShopify(product)),
    })
  }
}

// ============================================================================
// Shop Reducer
// ============================================================================

const defaultState = {
  products: {},
}

export default function (state = defaultState, action) {
  let update
  switch (action.type) {
  // ------------------------------------------------------------------------
  case shop.SET_PRODUCT:
    update = { products: { [action.product.id]: action.product } }
    break
  // ------------------------------------------------------------------------
  case shop.SET_PRODUCTS:
    update = {
      products: action.products.reduce((obj, product) => ({
        ...obj,
        [product.id]: product,
      }), {}),
    }
    break
  }
  return update ? u(update, state) : state
}
