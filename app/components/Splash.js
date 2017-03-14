import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import { withRouter } from 'react-router'

import { daysBetween } from '../helpers/date'

class Splash extends Component {
  componentWillMount = () => {
    if (localStorage.visited && daysBetween(Date.now(), localStorage.visited) <= 30) {
      this.props.router.push(`/store`)
    }
  }

  enterSite = () => {
    localStorage.visited = Date.now()
    this.props.router.push(`/store`)
  }

  render = () => {
    return (
      <div className='splash-container full-size center-content'>
        <Grid className='text-center'>
          <h2>Welcome to the Store!</h2>
          <button
            className='btn btn-lg btn-primary top-buffer'
            onClick={this.enterSite}
          >
            Enter Site!
          </button>
        </Grid>
      </div>
    )
  }
}

export default withRouter(Splash)
