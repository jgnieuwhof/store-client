
import React from 'react'

import Bolo from './icons/Bolo'

export default ({ boloClass, children }) => (
  <div className='bolo-text'>
    <Bolo className={boloClass} />
    <span>{ children }</span>
    <Bolo className={boloClass} style={{ transform: `scale(-1,1)` }} />
  </div>
)
