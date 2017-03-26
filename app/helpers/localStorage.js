
export const lsSet = (key, value) => {
  try {
    localStorage.setItem(key, value)
    return true
  }
  catch (e) {
    return false
  }
}

export const lsGet = key => {
  try {
    return localStorage.getItem(key)
  }
  catch (e) {
    return false
  }
}
