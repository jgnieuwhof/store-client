
import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { withRouter } from 'react-router'

const PageHeader = ({ title, router }) => (
  <Row className='page-header-klass action-buttons'>
    <Col className='hidden-xs' sm={3}>
      <Button onClick={() => { router.push(`/store`) }}>
        <FontAwesome name='arrow-left' />
        <span>Store</span>
      </Button>
    </Col>
    <Col xs={12} sm={6} className='title text-center'>
      <h3>{ title }</h3>
    </Col>
  </Row>
)

export default withRouter(PageHeader)
