
import { combineReducers } from 'redux'

import reduceCart from './reduceCart'

let reducers = {
  cart: reduceCart,
}

let finalReducer = combineReducers(reducers)

export default finalReducer
