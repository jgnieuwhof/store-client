
import namespace from './namespace'

export const cart = namespace(
  `cart`,
  [
    `SET_ID`,
    `UPDATE_CART`,
  ],
)

export const shop = namespace(
  `shop`,
  [
    `SET_FILTER`,
    `SET_PRODUCT`,
    `SET_PRODUCTS`,
  ],
)

export const app = namespace(
  `app`,
  [
    `SET_EMAIL`,
  ],
)

export const modal = namespace(
  `modal`,
  [
    `OPEN`,
    `CLOSE`,
  ],
)
