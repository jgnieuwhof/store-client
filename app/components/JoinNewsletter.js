
import React, { Component } from 'react'
import { Button, Form, FormControl, Popover } from 'react-bootstrap'

import api from '../helpers/api'
import { lsGet, lsSet } from '../helpers/localStorage'

class JoinNewsletter extends Component {
  state = {
    email: lsGet(`email`),
    message: null,
  }

  join = async e => {
    e.preventDefault()
    let { elements } = e.target
    let { value: email } = elements[`email`]
    if (!email) return
    let { success, message } = await api(`joinNewsletter`, { email })
    if (success) {
      this.setState({ email, message })
      lsSet(`email`, email)
    }
    else {
      this.setState({ message })
    }
  }

  close = () => {
    this.setState({ message: null })
  }

  render = () => {
    let { email, message } = this.state
    let joined = !!email
    return (
      <div className='email-form-container'>
        { joined && <strong>Subscribed to mailing list as {email}</strong> }
        { !joined &&
          <div>
            <p>Join the Mailing List</p>
            <Form inline className='email-form' onSubmit={this.join} onClick={this.close}>
              <div style={{ position: `relative` }}>
                { !!message &&
                  <Popover id='message' placement='bottom' positionLeft={84} positionTop={35}>
                    { message }
                  </Popover>
                }
                <FormControl type='email' name='email' placeholder='jane.doe@example.com' />
                {` `}
                <Button type="submit">JOIN</Button>
              </div>
            </Form>
          </div>
        }
      </div>
    )
  }
}

export default JoinNewsletter
