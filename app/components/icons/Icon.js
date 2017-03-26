
import React from 'react'

export default ({ className, fullSize, children }) => (
  <svg
    className={`icon ${className}`}
    viewBox={`0 0 ${fullSize} ${fullSize}`}
    preserveAspectRatio="xMidYMid meet"
  >
    {children}
  </svg>
)
