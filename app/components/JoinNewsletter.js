
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, FormControl, Popover } from 'react-bootstrap'

import api from '../helpers/api'
import { setEmail } from '../reducers/reduceApp'

class JoinNewsletter extends Component {
  state = {
    message: null,
  }

  join = async e => {
    e.preventDefault()
    let { dispatch, onSuccess } = this.props
    let { value: email } = e.target.elements[`email`]
    if (!email) return
    let { success, message } = await api(`joinNewsletter`, { email })
    this.setState({ message })
    if (success) {
      dispatch(setEmail({ email }))
      onSuccess()
    }
  }

  close = () => {
    this.setState({ message: null })
  }

  render = () => {
    let { children, className, email, hideLabel } = this.props
    let { message } = this.state
    let joined = !!email
    return (
      <div className={`email-form-container ${className}`}>
        { joined && <strong>Subscribed to mailing list as {email}</strong> }
        { !joined &&
          <div>
            { !hideLabel && (children || <p>Join the Mailing List</p>) }
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

export default connect(state => ({
  email: state.app.email,
}))(JoinNewsletter)
