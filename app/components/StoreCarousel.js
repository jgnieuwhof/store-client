
import React from 'react'
import { Grid, Carousel } from 'react-bootstrap'

import cImage from '../img/content/store-slider/carousel.png'

export default () => {
  return (
    <Grid className="store-carousel fadein">
      <Carousel>
        <Carousel.Item>
          <img width={1140} height={600} src={cImage} />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={1140} height={600} src={cImage} />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={1140} height={600} src={cImage} />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Grid>
  )
}
