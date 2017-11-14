
import React from 'react'
import { Col, Thumbnail } from 'react-bootstrap'
import { browserHistory } from 'react-router'

const ProductThumbnail = ({ product }) => {
  let soldOut = !product.variant.available
  let titleClass = `${soldOut ? `sold-out` : ``}`
  return (
    <Col
      key={product.id}
      xs={6} md={3} lg={3}
      className='fadein top-buffer'
    >
      <Thumbnail
        className='store-thumbnail'
        onClick={() => { browserHistory.push(`/product/${product.id}`) }}
        src={product.images[0].src}
      >
        <span className={`title text-center showguide ${titleClass}`}>
          <h2 style={{ margin: 0 }}>
            <span>{ soldOut ? `SOLD OUT` : product.title }</span>
          </h2>
        </span>
      </Thumbnail>
    </Col>
  )
}

export default ProductThumbnail
