import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import { withRouter } from 'react-router'

import Gun from './icons/Gun'

const VERSION = 1 // Increment to force users to view the splash

class Splash extends Component {
  componentWillMount = () => {
    if (+localStorage.version === VERSION) {
      this.props.router.push(`/store`)
    }
  }

  enterSite = () => {
    localStorage.version = VERSION
    this.props.router.push(`/store`)
  }

  render = () => {
    return (
      <div className='splash-container full-size center-content'>
        <Grid className='text-center' style={{ maxWidth: 900, padding: 0 }}>
          <h1 className='splash-header'>RAMBLE ON</h1>
          <img style={{ width: `100%` }} src='img/content/splash.jpg' />
          <a className='enter-site pull-right' onClick={this.enterSite}>
            <span>ENTER</span>
            <Gun size={45} color='white' />
          </a>
        </Grid>
      </div>
    )
  }
}

export default withRouter(Splash)
