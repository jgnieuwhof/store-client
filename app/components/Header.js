
import React from 'react'
import {
  Navbar,
  Nav,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap'

import CartBadge from './CartBadge'
import NavItem from './NavItem'

let Header = () => {
  return (
    <div className="header-container">
      <Navbar inverse>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/store">Store</NavItem>
            <NavItem eventKey={2} href="/about">About</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
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
