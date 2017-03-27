
import React, { Component } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'

import api from '../helpers/api'
import { lsGet, lsSet } from '../helpers/localStorage'

class JoinNewsletter extends Component {
  state = {
    email: lsGet(`email`),
  }

  join = async e => {
    e.preventDefault()
    let { elements } = e.target
    let { value: email } = elements[`email`]
    if (email) {
      let { success, message } = await api(`joinNewsletter`, { email })
      if (success) {
        this.setState({ email })
        lsSet(`email`, email)
      }
      else {
        alert(message)
      }
    }
  }

  render = () => {
    let { email } = this.state
    let joined = !!email
    return (
      <div className='email-form-container'>
        { joined && <strong>Subscribed to mailing list as {email}</strong> }
        { !joined &&
          <div>
            <p>Join the Mailing List</p>
            <Form inline className='email-form' onSubmit={this.join}>
              <FormControl type='email' name='email' placeholder='jane.doe@example.com' />
              {` `}
              <Button type="submit">JOIN</Button>
            </Form>
          </div>
        }
      </div>
    )
  }
}

export default JoinNewsletter
