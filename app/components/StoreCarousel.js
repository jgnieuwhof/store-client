
import React from 'react'
import { Carousel } from 'react-bootstrap'

import img1 from '../img/content/store-slider/slider-1.jpg'
import img2 from '../img/content/store-slider/slider-2.jpg'
import img3 from '../img/content/store-slider/slider-3.jpg'

export default () => {
  return (
    <Carousel className='store-carousel'>
      <Carousel.Item>
        <img width={1140} height={300} src={img1} />
      </Carousel.Item>
      <Carousel.Item>
        <img width={1140} height={300} src={img2} />
      </Carousel.Item>
      <Carousel.Item>
        <img width={1140} height={300} src={img3} />
      </Carousel.Item>
    </Carousel>
  )
}
