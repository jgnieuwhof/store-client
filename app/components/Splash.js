import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import { withRouter } from 'react-router'

import Gun from './icons/Gun'
import { daysBetween } from '../helpers/date'
import { lsSet, lsGet } from '../helpers/localStorage'
import splashImage from '../img/content/splash.jpg'


class Splash extends Component {
  componentWillMount = () => {
    let visited = lsGet(`visited`)
    if (visited && daysBetween(Date.now(), visited) <= 1) {
      this.props.router.push(`/store`)
    }
  }

  enterSite = () => {
    lsSet(`visited`, Date.now())
    this.props.router.push(`/store`)
  }

  render = () => {
    return (
      <div className='splash-container'>
        <Grid className='text-center' style={{ maxWidth: 800, padding: 0 }}>
          <h1 className='splash-header'>RAMBLE ON</h1>
          <img style={{ width: `100%` }} src={splashImage} onClick={this.enterSite} />
          <a className='enter-site pull-right' onClick={this.enterSite}>
            <h2>ENTER</h2>
            <Gun color='white' />
          </a>
        </Grid>
      </div>
    )
  }
}

export default withRouter(Splash)
