
export const set = ({ key, value }) => {
  try {
    localStorage.setItem(key, value)
    return true
  }
  catch (e) {
    return false
  }
}

export const get = key => {
  try {
    return localStorage.getItem(key)
  }
  catch (e) {
    return false
  }
}
