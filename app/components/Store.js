
import React from 'react'
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap'

import StoreCarousel from 'components/StoreCarousel'
import cImage from 'img/thumbnail.png'

let Store = () => {
  return (
    <div className="store-container">
      <StoreCarousel />
      <Grid className="store-items">
        { [0,1].map((i) => (
          <Row key={i}>
            { [0,1,2,3].map(j => (
              <Col key={j} xs={12} md={6} lg={3} className="top-buffer">
                <Thumbnail href="#" src={cImage} />
              </Col>
            ))}
          </Row>
        ))}
      </Grid>
    </div>
  )
}

export default Store
