
export const productFromShopify = (shopifyProduct) => {
  let { id, title, description, images, variants } = shopifyProduct
  let variant = variants[0]
  return {
    id, title, description, variant,
    size: variant.optionValues.find(o => o.name.toUpperCase() === `SIZE`).value,
    images: images.map(image => {
        let img = new Image()
        img.src = image.src
        return img
      }),
  }
}
