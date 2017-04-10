import React, { Component } from 'react'
import {
  Checkbox, Col, ControlLabel, Button, ButtonGroup,
  DropdownButton, FormGroup, MenuItem,
} from 'react-bootstrap'
import u from 'updeep'

import FieldGroup from './FieldGroup'
import Page from './Page'

import api from '../helpers/api'
import { formValues } from '../helpers/form'
import {
  isValidName, isValidEmail,
  isValidNote, isValidTrackingNumber,
} from '../helpers/validation'

const reasons = {
  generalInquiry: `General Inquiry`,
  customOrderRequest: `Custom Order Request`,
  shippingInquiry: `Shipping Inquiry`,
}

const isFormValid = ({ form, state }) => {
  let { reason, validation } = state
  if (!form) return false
  let { first, last, email, note, description, inquiry, trackingNumber } = formValues(form)
  return (
    (first && validation.first === `success`) &&
    (last && validation.last === `success`) &&
    (email && validation.email === `success`) &&
    (!note || validation.note === `success`) &&
    (reason !== reasons.customOrderRequest || (
      (description && validation.description === `success`)
    )) &&
    (reason !== reasons.shippingInquiry || (
      (!inquiry || validation.inquiry === `success`) &&
      (!trackingNumber || validation.trackingNumber === `success`)
    ))
  )
}

class Contact extends Component {
  state = {
    reason: reasons.generalInquiry,
    loading: false,
    success: false,
    validation: {},
  }

  componentWillMount = () => {
    let { params: { reason } } = this.props
    if (reasons[reason])
      this.setReason(reason)
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
    this.setState({ loading: true })
    let { form, state: { reason } } = this
    let { success, message } = await api(`contact`, {
      ...formValues(form),
      reason,
    })
    if (success) {
      message = null
    }
    this.setState({ success, validationMessage: message, loading: false })
  }

  render = () => {
    let { form, state } = this
    let valid = isFormValid({ form, state })
    let { success, loading, validationMessage, reason, validation } = state
    return (
      <Page title='Contact Us' className='contact-container'>
        { (success && (
          <p className='text-center text-success top-buffer'>
            <strong>Thank you!</strong>
          </p>
        ) || (
          <div>
            <div className='greeting'>
              <p>Want a custom piece? See something you like but it's not in your size?</p>
              <p>Wanna chat? Fill out the form below and I'll get back to you</p>
              <p>about creating a custom piece</p>
            </div>
            <Col sm={8} smOffset={2}>
              <form ref={x => { this.form = x }}>
                <ButtonGroup justified>
                  <DropdownButton title={reason} id='db-reason'>
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
                <FieldGroup name='first' type="text" label="First Name *" placeholder="First"
                  onChange={() => { this.validateField(`first`, isValidName) }}
                  validationState={validation.first}
                />
                <FieldGroup name='last' type="text" label="Last Name *" placeholder="Last"
                  onChange={() => { this.validateField(`last`, isValidName) }}
                  validationState={validation.last}
                />
                <FieldGroup name='email' type="text" label="Email *" placeholder="Email"
                  onChange={() => { this.validateField(`email`, isValidEmail) }}
                  validationState={validation.email}
                />
                { reason === reasons.customOrderRequest && (
                  <div>
                    <FormGroup>
                      <ControlLabel>Custom Piece Type</ControlLabel>
                      <div>
                        <Checkbox name='types[ring]' inline>Ring</Checkbox>{` `}
                        <Checkbox name='types[necklace]' inline>Necklace</Checkbox>{` `}
                        <Checkbox name='types[bracelet]' inline>Bracelet</Checkbox>{` `}
                        <Checkbox name='types[other]' inline>Other</Checkbox>
                      </div>
                    </FormGroup>
                    <FieldGroup name='description' componentClass='textarea' label='Description *'
                      placeholder='Style, similar items, size, ...'
                      onChange={() => { this.validateField(`description`, isValidNote) }}
                      validationState={validation.description}
                    />
                  </div>
                )}
                { reason === reasons.shippingInquiry && (
                  <div>
                    <FieldGroup name='trackingNumber' type='text' label='Tracking Number'
                      placeholder='Found on your "order has shipped" email'
                      onChange={() => {
                        this.validateField(`trackingNumber`, isValidTrackingNumber)
                      }}
                      validationState={validation.trackingNumber}
                    />
                    <FieldGroup name='inquiry' componentClass='textarea' label='Inquiry'
                      placeholder='Inquiry ...'
                      onChange={() => { this.validateField(`inquiry`, isValidNote) }}
                      validationState={validation.inquiry}
                    />
                  </div>
                )}
                <FieldGroup name='note' componentClass='textarea' label='Anything Else?'
                  placeholder='Questions, Comments, ...'
                  onChange={() => { this.validateField(`note`, isValidNote) }}
                  validationState={validation.note}
                />
                <Checkbox name='joinNewsletter'>
                  <span>Join our newsletter?</span>
                </Checkbox>
                <div className='action-buttons' style={{ marginTop: 40 }}>
                  <Button block bsSize='large' bsStyle='primary'
                    onClick={this.submit}
                    disabled={!valid}
                  >
                    <span>{ (loading && `...`) || `SUBMIT` }</span>
                  </Button>
                </div>
              </form>
            </Col>
          </div>
        ))}
      </Page>
    )
  }
}

export default Contact
