
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Navbar,
  Nav,
} from 'react-bootstrap'
import { Link } from 'react-router'

import CartBadge from './CartBadge'
import NavItem from './NavItem'

import { modalOpen } from '../reducers/reduceModal'

class Header extends Component {
  state = { expanded: false }
  setExpanded = expanded => this.setState({ expanded })
  closeNav = () => this.setState({ expanded: false })
  signup = () => this.props.dispatch(modalOpen({ modalComponent: `JoinNewsletter` }))
  render() {
    return (
      <div className="header-container">
        <Navbar inverse fixedTop
          onToggle={this.setExpanded}
          expanded={this.state.expanded}
        >
          <Navbar.Header>
            <Navbar.Brand className='showguide'>
              <Link to="/store"><span>RAMBLE ON</span></Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav onClick={this.closeNav}>
              <NavItem eventKey={1} href="/store">Store</NavItem>
              <NavItem eventKey={2} href="/about">About</NavItem>
              <NavItem eventKey={3} href="/contact">Contact</NavItem>
            </Nav>
            <Nav onClick={this.closeNav} pullRight>
              <NavItem eventKey={4} onClick={this.signup}>Sign Up</NavItem>
              <NavItem eventKey={5} href="/cart">
                <CartBadge />
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default connect()(Header)
