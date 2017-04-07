
import React from 'react'

import BoloText from './BoloText'

export default ({ className, title, children }) => (
  <div className={`page-container ${className}`}>
    <h2>
      <BoloText boloClass='hidden-xs'>{ title }</BoloText>
    </h2>
    <div className='content'>
      { children }
    </div>
  </div>
)
