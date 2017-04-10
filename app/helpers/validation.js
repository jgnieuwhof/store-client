
const SUCCESS = `success`
const WARNING = `warning`
const ERROR = `error`

export const isValidEmail = email => {
  if (!email) return null
  let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailReg.test(email) ? SUCCESS : ERROR
}

export const isValidName = name => {
  if (!name) return null
  return name.length > 1 ? SUCCESS : ERROR
}

export const isValidNote = note => {
  if (!note) return null
  if (note.length > 10)
    return SUCCESS
  else if (note.length > 5)
    return WARNING
  return ERROR
}

export const isValidTrackingNumber = trackingNumber => {
  if (!trackingNumber) return null
  return trackingNumber.length > 8 ? SUCCESS : ERROR
}
