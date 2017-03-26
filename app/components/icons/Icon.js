
import React from 'react'

export default ({ size, fullSize, children }) => (
  <svg
    className='icon'
    width={`${size}px`}
    height={`${size}px`}
    viewBox={`0 0 ${fullSize} ${fullSize}`}
    preserveAspectRatio="xMidYMid meet"
  >
    {children}
  </svg>
)
