
import { combineReducers } from 'redux'

import reduceApp from './reduceApp'
import reduceCart from './reduceCart'
import reduceModal from './reduceModal'
import reduceShop from './reduceShop'

let reducers = {
  app: reduceApp,
  cart: reduceCart,
  modal: reduceModal,
  shop: reduceShop,
}

let finalReducer = combineReducers(reducers)

export default finalReducer
