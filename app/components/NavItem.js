import React from 'react'
import { Link } from 'react-router'

const NavLink = (props, context) => {
  let { router } = context
  let { href, className, children, onClick } = props
  let isActive = href && router.isActive(href)
  let klassName = className || ``
  return (
    <li className={isActive ? `${klassName} active` : klassName}>
      <Link to={href} onClick={onClick}>
        {children}
      </Link>
    </li>
  )
}

NavLink.contextTypes = {
  router: React.PropTypes.object,
}

export default NavLink
