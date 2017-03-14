
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Footer from './Footer'
import Header from './Header'
import { setupCart } from '../reducers/reduceCart'
import { fetchProducts } from '../reducers/reduceShop'

class App extends Component {
  componentWillMount = () => {
    let { dispatch } = this.props
    dispatch(setupCart())
    dispatch(fetchProducts())
  }

  render = () => {
    let { children, routes } = this.props
    let { maximize } = routes[2]
    let squeeze = maximize ? `` : `container-squeeze`
    return (
      <div className="app-container">
        <Header />
        <div className={`body container ${squeeze}`}>
          { children }
        </div>
        <Footer />
      </div>
    )
  }
}

export default connect()(App)
