
import React from 'react'
import { Col, Row } from 'react-bootstrap'

import BoloText from './BoloText'

export const Section = ({ title, children }) => (
  <div className='page-section'>
    { title && <h4><strong>{ title }</strong></h4> }
    <p>
      { children }
    </p>
  </div>
)

export const Image = ({ src }) => (
  <Row>
    <Col sm={8} smOffset={2}>
      <img src={src} className='img-responsive' />
    </Col>
  </Row>
)

export default ({ className, title, children, center }) => (
  <div className={`page-container ${className} ${center ? `text-center` : ``}`}>
    <h2>
      <BoloText boloClass='hidden-xs'>{ title }</BoloText>
    </h2>
    <div className='content'>
      { children }
    </div>
  </div>
)
