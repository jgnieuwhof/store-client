
import React from 'react'
import {
  Navbar,
  Nav,
} from 'react-bootstrap'
import { Link } from 'react-router'

import CartBadge from './CartBadge'
import NavItem from './NavItem'

let Header = () => {
  return (
    <div className="header-container">
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand className='showguide'>
            <Link to="/store"><span>RAMBLE ON</span></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/store">Store</NavItem>
            <NavItem eventKey={2} href="/about">About</NavItem>
            <NavItem eventKey={3} href="/contact">Contact</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={4} href="/cart">
              <CartBadge />
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
