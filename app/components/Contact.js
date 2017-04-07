import React, { Component } from 'react'
import {
  Col, Button, ButtonGroup,
  ControlLabel, DropdownButton,
  FormControl, FormGroup, MenuItem,
} from 'react-bootstrap'
import u from 'updeep'

import FieldGroup from './FieldGroup'
import Page from './Page'

import api from '../helpers/api'
import { isValidName, isValidEmail, isValidNote } from '../helpers/validation'

const reasons = {
  generalInquiry: `General Inquiry`,
  customOrderRequest: `Custom Order Request`,
  shippingInquiry: `Shipping Inquiry`,
}

class Contact extends Component {
  state = {
    reason: reasons.generalInquiry,
    loading: false,
    success: false,
    validation: {},
  }

  setReason = reason => {
    this.setState({ reason: reasons[reason] })
  }

  validateField = (field, validator, setState = true) => {
    let { [field]: { value } } = this.form
    let validation = validator(value)
    if (setState) {
      this.setState({
        validation: u({ [field]: validation }, this.state.validation),
      })
    }
    return validation
  }

  submit = async () => {
    let { form: { first, last, email, note }, state: { reason } } = this

    this.setState({ loading: true })
    let { success, message } = await api(`contact`, {
      first: first.value,
      last: last.value,
      email: email.value,
      note: note.value,
      reason,
    })
    if (success) {
      message = null
    }
    this.setState({ success, validationMessage: message, loading: false })
  }

  render = () => {
    let { success, loading, validationMessage, reason, validation } = this.state
    let form = this.form
    let valid = false
    if (form) {
      let { first, last, email, note } = form
      valid =
        (first.value && validation.first === `success`) &&
        (last.value && validation.last === `success`) &&
        (email.value && validation.email === `success`) &&
        (!note.value || validation.note === `success`)
    }
    return (
      <Page title='Contact Us' className='contact-container'>
        <div className='greeting'>
          <p>Want a custom piece? See something you like but it's not in your size?</p>
          <p>Wanna chat? Fill out the form below and I'll get back to you</p>
          <p>about creating a custom piece</p>
        </div>
        <Col sm={8} smOffset={2}>
          { (success &&
            <p className='text-center text-success'>
              Thank you! I'll get back to you as soon as possible.
            </p>
          ) || (
            <form ref={x => { this.form = x }}>
              <ButtonGroup justified>
                <DropdownButton title={reason} id="bg-justified-dropdown">
                  { Object.keys(reasons).map(x => (
                    <MenuItem key={x} onClick={() => { this.setReason(x) }}>
                      { reasons[x] }
                    </MenuItem>
                  ))}
                </DropdownButton>
              </ButtonGroup>
              { validationMessage &&
                <p className='text-center text-danger'>{ validationMessage }</p>
              }
              <FieldGroup
                name='first'
                type="text"
                label="First Name"
                placeholder="First"
                onChange={() => { this.validateField(`first`, isValidName) }}
                validationState={validation.first}
              />
              <FieldGroup
                name='last'
                type="text"
                label="Last Name"
                placeholder="Last"
                onChange={() => { this.validateField(`last`, isValidName) }}
                validationState={validation.last}
              />
              <FieldGroup
                name='email'
                type="text"
                label="Email"
                placeholder="Email"
                onChange={() => { this.validateField(`email`, isValidEmail) }}
                validationState={validation.email}
              />
              <FormGroup validationState={validation.note}>
                <ControlLabel>Anything Else?</ControlLabel>
                <FormControl name='note'
                  componentClass="textarea"
                  placeholder="Comments, questions, jokes"
                  onChange={() => { this.validateField(`note`, isValidNote) }}
                />
              </FormGroup>
              <div className='action-buttons' style={{ marginTop: 40 }}>
                <Button block bsSize='large' bsStyle='primary'
                  onClick={this.submit}
                  disabled={!valid}
                >
                  <span>{ (loading && `...`) || `SUBMIT` }</span>
                </Button>
              </div>
            </form>
          )}
        </Col>
      </Page>
    )
  }
}

export default Contact
