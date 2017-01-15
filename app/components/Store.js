
import React from 'react'
import { Grid } from 'react-bootstrap'

import StoreCarousel from 'components/StoreCarousel'
import StoreItems from 'components/StoreItems'

let Store = () => {
  return (
    <div className="store-container">
      <Grid>
        <StoreCarousel />
        <StoreItems />
      </Grid>
    </div>
  )
}

export default Store
