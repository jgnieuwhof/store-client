
import React from 'react'
import { Col, Thumbnail } from 'react-bootstrap'
import { withRouter } from 'react-router'

const ProductThumbnail = ({ product, router }) => {
  let showMeta = !!product.size || !product.variant.available
  return (
    <Col
      key={product.id}
      xs={6} md={4} lg={3}
      className='fadein top-buffer'
    >
      <Thumbnail
        className='store-thumbnail'
        onClick={() => { router.push(`/product/${product.id}`) }}
        src={product.images[0].src}
      >
        <span className={`title text-center ${showMeta ? `with-meta` : ``}`}>
          {product.title}
        </span>
        { showMeta && (
          <span className='meta'>
            <span>{!product.variant.available ? `Sold Out` : `Size: ${product.size}`}</span>
          </span>
        )}
      </Thumbnail>
    </Col>
  )
}

export default withRouter(ProductThumbnail)
