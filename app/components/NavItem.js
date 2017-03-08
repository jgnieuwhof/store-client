import React from 'react'
import { Link } from 'react-router'

// NavLink wraps boostrap NavItem to inject 'active' from react-router
const NavLink = (props, context) => {
  let isActive = props.href && context.router.isActive(props.href, true)
  let curClassName = props.className || ``
  let className = isActive ? `${curClassName} active` : curClassName
  return (
    <li className={className}>
      <Link to={props.href}>{props.children}</Link>
    </li>
  )
}

NavLink.contextTypes = {
    router: React.PropTypes.object,
}

export default NavLink
