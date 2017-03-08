import React from 'react'
import { Route, IndexRoute } from 'react-router'

import About from 'components/About'
import App from 'components/App'
import Error404 from 'components/Error404'
import ProductDetail from 'components/ProductDetail'
import Site from 'components/Site'
import Splash from 'components/Splash'
import Store from 'components/Store'

export default (
  <Route path="/" component={Site}>
    <IndexRoute component={Splash} />
    <Route path="/" component={App}>
      <Route path="store" component={Store} />
      <Route path="product/:productId" component={ProductDetail} />
      <Route path="about" component={About} />
    </Route>
    <Route path="*" component={Error404} />
  </Route>
)
