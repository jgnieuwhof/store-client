import React from 'react'
import Helmet from "react-helmet"

import favicon from 'img/favicon.ico'

let Site = ({ children }) => {
  let faviconConfig = [{
    rel: "icon",
    href: favicon,
    type: "img/ico",
  }]

  return (
    <div className="site-container">
      <Helmet link={faviconConfig} />
      <div>
        { children }
      </div>
    </div>
  )
}

export default Site
