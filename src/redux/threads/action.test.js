/**
 * skenario test
 *
 * - getThreadsAction
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getThreadsAction } from './action.js'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { usersAPI } from '../../api/users.js'
import { threadsAPI } from '../../api/threads.js'
import { types } from '../types.js'

const fakeUsersResponse = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
]

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
]

const fakeErrorResponse = new Error('Ups, something went wrong')

describe('getThreadsAction', () => {
  beforeEach(() => {
    usersAPI._getUsers = usersAPI.getUsers
    threadsAPI._getThreads = threadsAPI.getThreads
  })

  afterEach(() => {
    usersAPI.getUsers = usersAPI._getUsers
    threadsAPI.getThreads = threadsAPI._getThreads
  })

  it('should dispatch action correctly when data fetching success', async () => {
    usersAPI.getUsers = () => Promise.resolve(fakeUsersResponse)
    threadsAPI.getThreads = () => Promise.resolve(fakeThreadsResponse)
    const dispatch = vi.fn()

    await getThreadsAction()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith({
      type: types.GET_THREADS,
      payload: {
        threads: fakeThreadsResponse.map(({ ownerId, ...thread }) => ({
          ...thread,
          content: thread.body,
          owner: fakeUsersResponse.find(({ id }) => id === ownerId),
        })),
      },
    })
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    usersAPI.getUsers = () => Promise.reject(fakeErrorResponse)
    threadsAPI.getThreads = () => Promise.reject(fakeErrorResponse)
    const dispatch = vi.fn()
    window.alert = vi.fn()

    await getThreadsAction()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
  })
})
