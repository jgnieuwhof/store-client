
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Button, Col, Row } from 'react-bootstrap'

import StoreFilter from './StoreFilter'

// eslint-disable-next-line
class StoreFilters extends Component { // refs - Store.js
  render() {
    let { types, current, currentSub, onChange } = this.props
    return (
      <div className='filters top-buffer bordered'>
        <Row>
          <Col xs={12}>
            <StoreFilter filter={null} current={current} onClick={onChange}>
              All
            </StoreFilter>
            <StoreFilter filter='new' current={current} onClick={onChange}>
              New Arrivals
            </StoreFilter>
            { types.sort().map(filter => (
              <StoreFilter
                key={filter}
                filter={filter}
                current={current}
                currentSub={currentSub}
                onClick={onChange}
              >
                {filter}
              </StoreFilter>
            ))}
            <span className='filter-container'>
              <Button
                className='naked'
                onClick={() => { browserHistory.push(`/contact/customOrderRequest`) }}
              >
                Request Custom Order
              </Button>
            </span>
          </Col>
        </Row>
      </div>
    )
  }
}

export default StoreFilters
