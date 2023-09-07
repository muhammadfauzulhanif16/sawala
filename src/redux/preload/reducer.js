import { types } from '../types.js'

export const preloadReducer = (state = true, action = {}) => {
  switch (action.type) {
    case types.PRELOAD:
      return action.payload.isPreload
    default:
      return state
  }
}
