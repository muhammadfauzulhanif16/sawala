import { types } from '../types.js'

const initialState = {
  users: [],
}

export const leaderboardsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_LEADERBOARDS:
      return {
        ...state,
        users: action.payload.users,
      }
    default:
      return state
  }
}
