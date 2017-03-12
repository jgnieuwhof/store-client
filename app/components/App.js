
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Footer from 'components/Footer'
import Header from 'components/Header'
import { setupCart } from 'reducers/reduceCart'

class App extends Component {
  componentWillMount = () => {
    let { dispatch } = this.props
    dispatch(setupCart())
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

export default connect(() => ({}))(App)
