/**
 * test scenario for usersReducer
 *
 * - usersReducer
 *  - should return the initial state when given by unknown action
 *  - should return the authed user when given by LOG_IN action
 *  - should return the authed user is null when given by LOG_OUT action
 */

import { describe, expect, it } from 'vitest'
import { usersReducer } from './reducer.js'
import { types } from '../types.js'

describe('users reducer', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = {
      authedUser: null,
    }
    const action = {
      type: 'UNKNOWN',
    }

    const result = usersReducer(initialState, action)

    expect(result).toEqual(initialState)
  })

  it('should return the authed user when given by LOG_IN action', () => {
    const initialState = {
      authedUser: null,
    }
    const action = {
      type: types.LOG_IN,
      payload: {
        authedUser: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    }

    const result = usersReducer(initialState, action)

    expect(result).toEqual({
      authedUser: action.payload.authedUser,
    })
  })

  it('should return the authed user is null when given by LOG_OUT action', () => {
    const initialState = {
      authedUser: {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
    }
    const action = {
      type: types.LOG_OUT,
      payload: {
        authedUser: null,
      },
    }

    const result = usersReducer(initialState, action)

    expect(result).toEqual({
      authedUser: null,
    })
  })
})
