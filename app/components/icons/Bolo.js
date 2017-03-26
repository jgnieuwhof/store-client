
import React from 'react'

export default ({ style }) => (
  <svg viewBox="0 0 70 10" style={{ ...style, maxWidth: 200 }}>
    <circle cx="5" cy="5" r="5" />
    <polygon points="15,5 60,1 70,5 60,9" />
  </svg>
)
