
import { combineReducers } from 'redux'

import reduceCart from './reduceCart'
import reduceShop from './reduceShop'

let reducers = {
  cart: reduceCart,
  shop: reduceShop,
}

let finalReducer = combineReducers(reducers)

export default finalReducer
