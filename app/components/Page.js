
import React from 'react'

export default ({ className, title, children }) => (
  <div className={`page-container ${className}`}>
    <h2>{title}</h2>
    <div className='content'>
      { children }
    </div>
  </div>
)
