
import React from 'react'
import { Grid, Col, Row } from 'react-bootstrap'

import JoinNewsletter from './JoinNewsletter'
import comingSoonImage from '../img/content/comingSoon.jpg'

export default () => (
  <div className='full-size center-content coming-soon-container'>
    <Grid className='text-center'>
      <Row>
        <Col xs={12}>
          <div style={{ position: `relative` }}>
            <img style={{ width: `100%` }} src={comingSoonImage} />
            <div className='overlay full-size center-content'>
              <div>
                <div className='feature-text'>
                  <h2 className='splash-header'>RAMBLE ON</h2>
                  <h3>SILVER CO</h3>
                  <h1>COMING SOON</h1>
                </div>
                <div className='newsletter-container'>
                  <JoinNewsletter hideLabel>
                    <span>
                      JOIN THE MAILING LIST
                    </span>
                  </JoinNewsletter>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
)
