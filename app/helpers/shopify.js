
export const productFromShopify = (shopifyProduct) => {
  let {
    id, title, description, images, variants, available,
    attrs: { product_type: type, tags, created_at },
  } = shopifyProduct
  let variant = variants[0]
  let sizeVariant = variant.optionValues.find(o => o.name.toUpperCase() === `SIZE`)
  return {
    id, title, description, variant, type, tags, available,
    createdAt: Date.parse(created_at),
    size: sizeVariant ? sizeVariant.value : null,
    images: images.map(image => {
      let img = new Image()
      img.src = image.src
      return img
    }),
  }
}
