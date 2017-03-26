
import React from 'react'

import Bolo from './icons/Bolo'

export default ({ children }) => (
  <div className='bolo-text'>
    <Bolo />
    <span>{ children }</span>
    <Bolo style={{ transform: `scale(-1,1)` }} />
  </div>
)
