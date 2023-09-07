/**
 * test scenario for leaderboardsReducer
 *
 * - leaderboardsReducer
 *  - should return the initial state when given by unknown action
 *  - should return the users when given by GET_LEADERBOARDS action
 *
 */

import { describe, expect, it } from 'vitest'
import { leaderboardsReducer } from './reducer.js'
import { types } from '../types.js'

describe('leaderboards reducer', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = {
      users: [],
    }
    const action = {
      type: 'UNKNOWN',
    }

    const result = leaderboardsReducer(initialState, action)

    expect(result).toEqual(initialState)
  })

  it('should return the users when given by GET_LEADERBOARDS action', () => {
    const initialState = {
      users: [],
    }
    const action = {
      type: types.GET_LEADERBOARDS,
      payload: {
        users: [
          {
            user: {
              id: 'users-1',
              name: 'John Doe',
              email: 'john@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 10,
          },
        ],
      },
    }

    const result = leaderboardsReducer(initialState, action)

    expect(result).toEqual({ users: action.payload.users })
  })
})
