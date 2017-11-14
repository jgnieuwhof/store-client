
import React from 'react'

import JoinNewsletter from './JoinNewsletter'
import Page from './Page'

let Signup = () => {
  return (
    <Page title='Sign Up' className='signup-container'>
      <div id="lipsum">
        <p>
          Our account service isn't quite ready yet. Sign up for the email list
          below and we'll send you an email when it's ready. Thanks!
        </p>
        <JoinNewsletter hideLabel />
      </div>
    </Page>
  )
}

export default Signup
