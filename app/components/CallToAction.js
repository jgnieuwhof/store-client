
import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { withRouter } from 'react-router'

let CallToAction = ({ onClick, disabled, title, topBuffer, router }) => {
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
      <Col className='hidden-sm' xs={12}>
        <Button onClick={() => { router.push(`/store`) }}>
          <FontAwesome name='arrow-left' />
          <span>Store</span>
        </Button>
      </Col>
    </Row>
  )
}

export default withRouter(CallToAction)
