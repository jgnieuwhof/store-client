import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'

import JoinNewsletter from './JoinNewsletter'

export default () => {
  return (
    <div className="footer-container">
      <Grid>
        <Row>
          <Col xs={6} sm={3}>
            <p><Link to='/about'>About</Link></p>
            <p><Link to='/contact/customOrderRequest'>Request Custom Order</Link></p>
            <p><Link to='/events'>Upcoming Events</Link></p>
          </Col>
          <Col xs={6} sm={3} style={{ marginBottom: 20 }}>
            <p><Link to='/help'>Need Help?</Link></p>
            <p><Link to='/shipping'>Shipping Information</Link></p>
            <p><Link to='/returns'>Returns / Exchanges</Link></p>
            <p><Link to='/international'>International Orders</Link></p>
            <p><Link to='/faq'>FAQ</Link></p>
          </Col>
          <Col xs={12} sm={6}>
            <JoinNewsletter />
          </Col>
        </Row>
      </Grid>
      <div
        className='text-center text-gray-light'
        style={{ position: `absolute`, left: 0, right: 0, bottom: 45 }}
      >
        <span>&copy; Ramble On Silver Co.</span>
      </div>
    </div>
  )
}
