import { types } from '../types.js'

const initialState = {
  authedUser: null,
}

export const usersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LOG_IN:
      return {
        ...state,
        authedUser: action.payload.authedUser,
      }
    case types.LOG_OUT:
      return {
        ...state,
        authedUser: action.payload.authedUser,
      }
    default:
      return state
  }
}
