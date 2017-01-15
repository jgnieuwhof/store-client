
import React from 'react'
import { Carousel, Grid } from 'react-bootstrap'

let Store = () => {
  return (
    <div className="store-container">
      <Grid>
        <Carousel>
          <Carousel.Item>
            <img width={1140} height={600} src="/img/content/store-slider/carousel.png"/>
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={1140} height={600} src="/img/content/store-slider/carousel.png"/>
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={1140} height={600} src="/img/content/store-slider/carousel.png"/>
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Grid>
    </div>
  )
}

export default Store
