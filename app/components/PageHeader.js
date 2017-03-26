
import React from 'react'

import BoloText from './BoloText'

const PageHeader = ({ title }) => (
  <div className='page-header-klass text-center'>
    <h2>
      <BoloText boloClass='hidden-xs'>{ title }</BoloText>
    </h2>
  </div>
)

export default PageHeader
