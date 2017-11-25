import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'

import JoinNewsletter from './JoinNewsletter'
import SocialIcons from './SocialIcons'

const FooterLink = ({ to, label }) => (
  <p><Link to={to}>{label}</Link></p>
)

export default () => {
  return (
    <div className="footer-container">
      <Grid>
        <Row>
          <Col xs={6} sm={3}>
            <FooterLink to='/about' label='About' />
            <FooterLink to='/contact/customOrderRequest' label='Request Custom Order' />
            <FooterLink to='/events' label='Upcoming Events' />
          </Col>
          <Col xs={6} sm={3} style={{ marginBottom: 20 }}>
            <FooterLink to='/shipping' label='Shipping Information' />
            <FooterLink to='/returns' label='Returns / Exchanges' />
            <FooterLink to='/faq' label='FAQ' />
            <FooterLink to='/stockists' label='Stockists' />
          </Col>
          <Col xs={12} sm={6}>
            <JoinNewsletter />
            <SocialIcons />
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
