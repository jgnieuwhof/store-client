
import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { browserHistory } from 'react-router'

let CallToAction = ({ large, className, onClick, disabled, title, customContent }) => (
  <Row className={`action-buttons ${className || ``}`}>
    <Col xs={12} sm={large ? 6 : 3} smOffset={large ? 6 : 9}>
      { customContent }
      <Button block bsSize='large' bsStyle='primary' onClick={onClick} disabled={disabled}>
        {title}
      </Button>
    </Col>
    <Col xs={12} sm={3} className='back'>
      <Button className='naked' onClick={() => { browserHistory.push(`/store`) }}>
        <FontAwesome name='arrow-left' />
        <span>Store</span>
      </Button>
    </Col>
  </Row>
)

export default CallToAction
