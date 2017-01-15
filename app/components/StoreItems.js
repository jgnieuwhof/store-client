
import React from 'react'
import { Row, Col, Thumbnail } from 'react-bootstrap'

import cImage from 'img/thumbnail.png'

export default () => {
  return (
    <div className="store-items-container">
      { [0,1].map((i) => (
        <Row key={i}>
          { [0,1,2,3].map(j => (
            <Col key={j} xs={12} md={6} lg={3} className="top-buffer">
              <Thumbnail href="#" src={cImage} />
            </Col>
          ))}
        </Row>
      ))}
    </div>
  )
}
