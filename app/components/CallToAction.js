
import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

let CallToAction = ({ onClick, disabled, title, topBuffer }) => {
  if (topBuffer === undefined) topBuffer = true
  return (
    <Row className={`action-buttons ${topBuffer ? `top-buffer` : ``}`}>
      <Col xs={12} sm={6} smOffset={3} className='text-center'>
        <Button
          block
          bsSize='large'
          bsStyle='primary'
          onClick={onClick}
          disabled={disabled}
        >
          {title}
        </Button>
      </Col>
    </Row>
  )
}

export default CallToAction
