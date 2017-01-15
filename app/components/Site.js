import React from 'react'
import Helmet from "react-helmet"

let Site = ({ children }) => {
  let faviconConfig = [{
    rel: "icon",
    href: require('../img/favicon.ico'),
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
