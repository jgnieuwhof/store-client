
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Footer from './Footer'
import Header from './Header'
import Modals from './modals'

import { setupCart } from '../reducers/reduceCart'
import { modalOpen } from '../reducers/reduceModal'
import { fetchProducts } from '../reducers/reduceShop'

class App extends Component {
  state = {
    numberOfClicks: 0,
  }

  componentWillMount = async () => {
    let { dispatch } = this.props
    await dispatch(fetchProducts())
    dispatch(setupCart())
  }

  handleClick = () => {
    let { email, dispatch } = this.props
    let numberOfClicks = this.state.numberOfClicks + 1
    if (numberOfClicks === 2 && !email) {
      dispatch(modalOpen({ modalComponent: `JoinNewsletter` }))
    }
    this.setState({ numberOfClicks })
  }

  render = () => {
    let { children, routes, modal: { show, activeModal } } = this.props
    let { maximize } = routes[2]
    let squeeze = maximize ? `` : `container-squeeze`
    let ActiveModal = Modals[activeModal]
    return (
      <div className="app-container" onClick={this.handleClick}>
        <Header />
        <div className={`body container ${squeeze}`}>
          { children }
        </div>
        <Footer />
        { show && <ActiveModal show /> }
      </div>
    )
  }
}

export default connect(s => ({
  email: s.app.email,
  modal: s.modal,
}))(App)
