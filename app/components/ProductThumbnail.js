
import React from 'react'
import { Col, Thumbnail } from 'react-bootstrap'
import { withRouter } from 'react-router'

const ProductThumbnail = ({ product, router }) => {
  let showMeta = !!product.size
  return (
    <Col
      key={product.id}
      xs={6} md={4} lg={3}
      className="top-buffer"
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
            <span>{`Size: ${product.size}`}</span>
          </span>
        )}
      </Thumbnail>
    </Col>
  )
}

export default withRouter(ProductThumbnail)
