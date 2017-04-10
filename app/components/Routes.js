import React from 'react'
import { Route, IndexRoute } from 'react-router'

import About from './About'
import App from './App'
import Cart from './Cart'
import Contact from './Contact'
import Error404 from './Error404'
import ProductDetail from './ProductDetail'
import Site from './Site'
import Splash from './Splash'
import Store from './Store'

export default (
  <Route path="/" component={Site}>
    <IndexRoute component={Splash} />
    <Route path="/" component={App}>
      <Route path="store" component={Store} maximize />
      <Route path="product/:id" component={ProductDetail} />
      <Route path="about" component={About} />
      <Route path="contact(/:reason)" component={Contact} />
      <Route path="cart" component={Cart} />
    </Route>
    <Route path="*" component={Error404} />
  </Route>
)
