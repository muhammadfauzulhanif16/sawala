/**
 * test scenario for preloadReducer
 *
 * - preloadReducer
 *  - should return the initial state when given by unknown action
 *  - should return the preload is false when given by PRELOAD action
 *
 */

import { describe, expect, it } from 'vitest'
import { preloadReducer } from './reducer.js'
import { types } from '../types.js'

describe('preload reducer', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = true
    const action = {
      type: 'UNKNOWN',
    }

    const result = preloadReducer(initialState, action)

    expect(result).toEqual(initialState)
  })

  it('should return the preload is false when given by PRELOAD action', () => {
    const initialState = true
    const action = {
      type: types.PRELOAD,
      payload: {
        isPreload: false,
      },
    }

    const result = preloadReducer(initialState, action)

    expect(result).toEqual(action.payload.isPreload)
  })
})
