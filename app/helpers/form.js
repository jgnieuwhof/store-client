
export const verifyImage = ({ url, timeout }) => (
  new Promise((resolve, reject) => {
    let timer, img = new Image()
    img.onerror = img.onabort = () => {
      clearTimeout(timer)
      reject(false)
    }
    img.onload = () => {
      clearTimeout(timer)
      resolve(img)
    }
    timer = setTimeout(() => {
      // reset .src to invalid URL so it stops previous
      // loading, but doesn't trigger new load
      img.src = `//!!!!/test.jpg`
      reject(false)
    }, timeout || 5000)
    img.src = url
  })
)

export const formValues = form => {
  if (!form) return {}
  let values = {}
  for (let i = 0; i < form.length; i++) {
    let { checked, name, value } = form.elements[i]
    if (!name || !value) continue
    let parts = name.split(`[`)
    if (value === `on`)
      value = checked
    if (parts.length > 1) {
      let parent = parts[0]
      let key = parts[1].slice(0, -1)
      if (values[parent]) {
        values[parent][key] = value
      } else {
        values[parent] = { [key]: value }
      }
    } else {
      values[name] = value
    }
  }
  return values
}
