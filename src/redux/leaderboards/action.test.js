/**
 * skenario test
 *
 * - getLeaderboardsAction
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getLeaderboardsAction } from './action.js'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { leaderboardsAPI } from '../../api/leaderboards.js'
import { types } from '../types.js'

const fakeUsersResponse = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  },
]

const fakeErrorResponse = new Error('Ups, something went wrong')

describe('getLeaderboardsAction', () => {
  beforeEach(() => {
    leaderboardsAPI._getLeaderboards = leaderboardsAPI.getLeaderboards
  })

  afterEach(() => {
    leaderboardsAPI.getLeaderboards = leaderboardsAPI._getLeaderboards
  })

  it('should dispatch action correctly when data fetching success', async () => {
    leaderboardsAPI.getLeaderboards = () => Promise.resolve(fakeUsersResponse)
    const dispatch = vi.fn()

    await getLeaderboardsAction()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith({
      type: types.GET_LEADERBOARDS,
      payload: {
        users: fakeUsersResponse,
      },
    })
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    leaderboardsAPI.getLeaderboards = () => Promise.reject(fakeErrorResponse)
    const dispatch = vi.fn()
    window.alert = vi.fn()

    await getLeaderboardsAction()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
  })
})
