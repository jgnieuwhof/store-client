
import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { withRouter } from 'react-router'

let CallToAction = ({ large, className, onClick, disabled, title, router }) => (
  <Row className={`action-buttons ${className || ``}`}>
    <Col xs={12} sm={large ? 6 : 3} smOffset={large ? 6 : 9}>
      <Button block bsSize='large' bsStyle='primary' onClick={onClick} disabled={disabled}>
        {title}
      </Button>
    </Col>
    <Col xs={12} sm={3}>
      <Button className='naked' onClick={() => { router.push(`/store`) }}>
        <FontAwesome name='arrow-left' />
        <span>Store</span>
      </Button>
    </Col>
  </Row>
)

export default withRouter(CallToAction)
