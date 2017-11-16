import React, { Component } from 'react'
import {
  Checkbox, Col, ControlLabel, Button, ButtonGroup,
  DropdownButton, FormGroup, MenuItem, FormControl,
  Radio,
} from 'react-bootstrap'
import u from 'updeep'

import FieldGroup from './FieldGroup'
import Page from './Page'

import api from '../helpers/api'
import { verifyImage, formValues } from '../helpers/form'
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

let TypeCheckbox = ({ name, onChange }) => (
  <span>
    <Checkbox name={`types[${name.toLowerCase()}]`} inline onChange={onChange}>
      {name}
    </Checkbox>
    {` `}
  </span>
)

class Contact extends Component {
  state = {
    reason: reasons.generalInquiry,
    loading: false,
    success: false,
    validation: {},
    types: [],
    similarPhoto: null,
    price: null,
  }

  componentWillMount = () => {
    let { params: { reason } } = this.props
    if (reasons[reason])
      this.setReason(reason)
  }

  setReason = reason => {
    this.setState({ reason: reasons[reason] })
  }

  setValidationField = ({ field, validation }) => {
    this.setState({
      validation: u({ [field]: validation }, this.state.validation),
    })
  }

  validateField = (field, validator, setState = true) => {
    let { [field]: { value } } = this.form
    let validation = validator(value)
    if (setState) this.setValidationField({ field, validation })
    return validation
  }

  componentWillReceiveProps = ({ params: { reason } }) => {
    if (reason && reasons[reason] && this.state.reason !== reason)
      this.setReason(reason)
  }

  onTypeChange = (e) => {
    let { checked, name } = e.target
    let { types } = this.state
    if (checked)
      types[name] = true
    else if (types[name])
      delete types[name]
    this.setState({ types })
  }

  onSimilarPhotoUrlChange = async e => {
    let { value: url } = e.target
    let imgReg = /\.(jpeg|jpg|gif|png)$/
    let img = (url.match(imgReg) !== null) && (await verifyImage({ url }))
    this.setState({ similarPhoto: img || null })
    this.setValidationField({
      field: `similarPhoto`,
      validation: img ? `success` : `error`,
    })
  }

  onPriceRangeChange = e => {
    this.setState({ price: e.target.value })
  }

  submit = async () => {
    this.setState({ loading: true })
    let { form, state: { reason, similarPhoto } } = this
    let fv = formValues(form)
    if (!similarPhoto) delete fv.similarPhotoUrl
    let { success, message } = await api(`contact`, { ...fv, reason })
    if (success) message = null
    this.setState({ success, validationMessage: message, loading: false })
  }

  render = () => {
    let { form, state } = this
    let valid = isFormValid({ form, state })
    let {
      success, loading, validationMessage,
      reason, validation, similarPhoto, price,
    } = state
    let isRing = !!state.types[`types[ring]`]
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
                        { [`Ring`, `Necklace`, `Bracelet`, `Other`].map((x) => (
                          <TypeCheckbox key={x} name={x} onChange={this.onTypeChange} />
                        ))}
                      </div>
                    </FormGroup>
                    { isRing && (
                      <div>
                        <FormGroup>
                          <ControlLabel>Ring Size (US)</ControlLabel>
                          <FormControl name='ringSize' componentClass='select'>
                            { [...Array(17)].map((_a, i, _b, j = (i / 2) + 4) => (
                              <option key={i} value={j}>{j}</option>
                            ))}
                          </FormControl>
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Style</ControlLabel>
                          <div>
                            { [`Single Stone`, `Multiple Stone`].map((x, i) => (
                              <Radio key={x} inline
                                name='ringStyle' value={x}
                                defaultChecked={!i}
                              >{x}</Radio>
                            ))}
                          </div>
                        </FormGroup>
                      </div>
                    )}
                    <FieldGroup name='description' componentClass='textarea' label='Description *'
                      placeholder='Style, similar items, size, ...'
                      onChange={() => { this.validateField(`description`, isValidNote) }}
                      validationState={validation.description}
                    />
                    <FormGroup>
                      <FieldGroup name='similarPhotoUrl' type='text'
                        label='Similar Photo URL'
                        placeholder='Paste a URL to an image here'
                        onChange={this.onSimilarPhotoUrlChange}
                        validationState={validation.similarPhoto}
                      />
                      { similarPhoto && (
                        <div className='text-center'>
                          <img className='similar-photo' src={similarPhoto.src} />
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Price Range (US): { price && `$${price}` || ``}</ControlLabel>
                      <input type='range' name='price'
                        onChange={this.onPriceRangeChange}
                        min='40' max='500'
                      />
                    </FormGroup>
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
                  </div>
                )}
                <FieldGroup
                  name='note'
                  componentClass='textarea'
                  label={reason === reasons.customOrderRequest ? `Anything Else?` : `Inquiry` }
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
