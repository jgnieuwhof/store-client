
import React from 'react'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from 'react-bootstrap'

const FieldGroup = ({ id, label, help, validationState, ...props }) => (
  <FormGroup controlId={id} validationState={validationState}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} />
    {help && <HelpBlock>{help}</HelpBlock>}
  </FormGroup>
)

export default FieldGroup