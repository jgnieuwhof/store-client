
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { mode } from '../app.config'

import About from './About'
import App from './App'
import Cart from './Cart'
import ComingSoon from './ComingSoon'
import Contact from './Contact'
import Error404 from './Error404'
import Faq from './Faq'
import ProductDetail from './ProductDetail'
import Returns from './Returns'
import Shipping from './Shipping'
import Site from './Site'
import Splash from './Splash'
import Stockists from './Stockists'
import Store from './Store'
import UpcomingEvents from './UpcomingEvents'

const Maintenance = () => (
  <Route path="/" component={Site}>
    <IndexRoute component={ComingSoon} />
    <Route path="*" component={ComingSoon} />
  </Route>
)

const Other = () => (
  <Route path="/" component={Site}>
    <IndexRoute component={Splash} />
    <Route path="/" component={App}>
      <Route path="store" component={Store} maximize />
      <Route path="product/:id" component={ProductDetail} />
      <Route path="contact" component={Contact}>
        <Route path=":reason" />
      </Route>
      <Route path="cart" component={Cart} />

      <Route path="about" component={About} />
      <Route path="shipping" component={Shipping} />
      <Route path="faq" component={Faq} />
      <Route path="returns" component={Returns} />
      <Route path="events" component={UpcomingEvents} />
      <Route path="stockists" component={Stockists} />

    </Route>
    <Route path="*" component={Error404} />
  </Route>
)

export default mode === `maintenance` ? Maintenance : Other
