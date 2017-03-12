
import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { withRouter } from 'react-router'

const PageHeader = ({ button, title, router }) => (
  <Row className='page-header-klass action-buttons'>
    <Col xs={12} sm={3}>
      <Button onClick={() => { router.push(button.page) }}>
        { button.icon && <FontAwesome name={`${button.icon}`} /> }
        <span>{button.title}</span>
      </Button>
    </Col>
    <Col xs={12} sm={6} className='text-center'>
      <h3 className='title'>{ title }</h3>
    </Col>
  </Row>
)

export default withRouter(PageHeader)
