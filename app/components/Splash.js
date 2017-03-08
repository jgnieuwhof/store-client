import React from 'react'
import { Grid } from 'react-bootstrap'
import { Link } from 'react-router'

let Splash = () => {
  return (
    <div className="splash-container full-size center-content">
      <Grid className="text-center">
        <h2>Welcome to the Store!</h2>
        <Link to="/store" className="btn btn-lg btn-primary">
          <span className="fa fa-sign-in" /><span> Enter Site</span>
        </Link>
      </Grid>
    </div>
  )
}

export default Splash
