import React from 'react'
import Helmet from "react-helmet"

import withCanTouch from './withCanTouch'
import favicon from '../img/favicon.png'

let Site = ({ canTouch, children }) => {
  let faviconConfig = [{
    rel: `icon`,
    href: favicon,
    type: `img/png`,
  }]
  let withHover = canTouch ? `` : `with-hover`
  return (
    <div className={`site-container ${withHover}`}>
      <Helmet link={faviconConfig} />
      <div>
        { children }
      </div>
    </div>
  )
}

export default withCanTouch(Site)
