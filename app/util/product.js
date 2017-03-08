
export let productFromShopify = (shopifyProduct) => {
  let { id, title, description, images, variants } = shopifyProduct
  let variant = variants[0]
  let size = variant.optionValues.find(o => o.name.toUpperCase() === `SIZE`).value
  return {
    id, title, description, size,
    images: images.map(image => {
        let img = new Image()
        img.src = image.src
        return img
      }),
  }
}
