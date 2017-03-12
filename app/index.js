import 'babel-polyfill'
import 'whatwg-fetch'

import './index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import ShopifyBuy from 'shopify-buy'

import appConfig from './app.config'
import Routes from './components/Routes'
import ShopifyProvider from './components/ShopifyProvider'
import finalReducer from './reducers/reduce'

const SHOPIFY = {
  client: ShopifyBuy.buildClient(appConfig.shopify),
  cart: {},
}

const THUNKY = {
  shopify: SHOPIFY,
}

const finalCreateStore = compose(
  applyMiddleware(thunk.withExtraArgument(THUNKY)),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const STORE = finalCreateStore(finalReducer)

window.onload = () => {
  let root = document.createElement(`div`)
  document.body.appendChild(root)
  ReactDOM.render(
    <Provider store={STORE}>
      <ShopifyProvider shopify={SHOPIFY}>
        <Router
          onUpdate={() => window.scrollTo(0, 0)}
          history={browserHistory}
        >
          { Routes }
        </Router>
      </ShopifyProvider>
    </Provider>,
    root
  )
}
