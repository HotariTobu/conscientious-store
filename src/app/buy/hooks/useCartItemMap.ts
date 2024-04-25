import { useReducer } from "react"

export const cartItemMapReducer = (state: Map<string, number>, action: {
  method: 'add-front-item' | 'remove-front-item' | 'add-cart-item' | 'remove-cart-item',
  productCode: string,
} | {
  method: 'clear',
}) => {
  if (action.method === 'clear') {
    return new Map()
  }

  switch (action.method) {
    case 'add-front-item':
      return new Map([
        ...state,
        [action.productCode, 0],
      ])
    case 'remove-front-item':
      return new Map([
        ...Array.from(state)
          .filter(([productCode]) => productCode !== action.productCode),
      ])

  }

  const countInCart = state.get(action.productCode) ?? 0

  switch (action.method) {
    case 'add-cart-item':
      return new Map([
        ...state,
        [action.productCode, countInCart + 1]
      ])
    case 'remove-cart-item':
      return new Map([
        ...state,
        [action.productCode, countInCart - 1]
      ])
  }
}

export const useCartItemMap = () => {
  return useReducer(cartItemMapReducer, new Map())
}
