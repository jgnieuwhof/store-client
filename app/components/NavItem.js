import React from 'react'
import { Link } from 'react-router'

// NavLink wraps boostrap NavItem to inject 'active' from react-router
const NavLink = (props, context) => {
  let { router } = context
  let { href, className, children } = props
  let isActive = href && router.isActive(href, true)
  let klassName = className || ``
  return (
    <li className={isActive ? `${klassName} active` : klassName}>
      <Link to={href}>
        {children}
      </Link>
    </li>
  )
}

NavLink.contextTypes = {
  router: React.PropTypes.object,
}

export default NavLink
