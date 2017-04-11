
import React from 'react'
import { Col, Thumbnail } from 'react-bootstrap'
import { withRouter } from 'react-router'

const ProductThumbnail = ({ product, router }) => {
  let showMeta = !!product.size
  let soldOut = !product.variant.available
  let titleClass = `${soldOut ? `sold-out` : ``} ${showMeta ? `with-meta` : ``}`
  return (
    <Col
      key={product.id}
      xs={6} md={3} lg={3}
      className='fadein top-buffer'
    >
      <Thumbnail
        className='store-thumbnail'
        onClick={() => { router.push(`/product/${product.id}`) }}
        src={product.images[0].src}
      >
        <span className={`title text-center showguide ${titleClass}`}>
          <h2 style={{ margin: 0 }}>
            <span>{ soldOut ? `SOLD OUT` : product.title }</span>
          </h2>
        </span>
        { showMeta && (
          <span className='meta'>
            <span>{`Size: ${product.size}`}</span>
          </span>
        )}
      </Thumbnail>
    </Col>
  )
}

export default withRouter(ProductThumbnail)
