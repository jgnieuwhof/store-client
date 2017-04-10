
import React from 'react'
import { Col, Row } from 'react-bootstrap'

import BoloText from './BoloText'

export const BodyImg = ({ src }) => (
  <Row>
    <Col sm={8} smOffset={2}>
      <img src={src} className='img-responsive' />
    </Col>
  </Row>
)

export default ({ className, title, children }) => (
  <div className={`page-container ${className}`}>
    <h2>
      <BoloText boloClass='hidden-xs'>{ title }</BoloText>
    </h2>
    <div className='content'>
      { children }
    </div>
  </div>
)
