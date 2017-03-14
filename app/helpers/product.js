
export const productArray = (productHash) => {
  return Object.keys(productHash).map(id => productHash[id])
}
