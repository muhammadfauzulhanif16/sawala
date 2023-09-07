/**
 * skenario test
 *
 * - (createCommentAction)
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action and call alert correctly when data fetching failed
 * - (upVoteCommentAction)
 *   - should dispatch action correctly when data fetching success and dispatch action again when data fetching failed
 * - (downVoteCommentAction)
 *   - should dispatch action correctly when data fetching success and dispatch action again when data fetching failed
 * - (neutralVoteCommentAction)
 *   - (upVote)
 *     - should dispatch action correctly when data fetching success and dispatch action again when data fetching failed
 *   - (downVote)
 *     - should dispatch action correctly when data fetching success and dispatch action again when data fetching failed
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  createCommentAction,
  upVoteCommentAction,
  downVoteCommentAction,
  neutralVoteCommentAction,
} from './action.js'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { commentsAPI } from '../../api/comments.js'
import { types } from '../types.js'

const fakeCommentResponse = {
  id: 'comment-1',
  content: 'Ini adalah komentar pertama',
  createdAt: '2021-06-21T07:00:00.000Z',
  upVotesBy: [],
  downVotesBy: [],
  owner: {
    id: 'users-1',
    name: 'John Doe',
    email: 'john@example.com',
  },
}

const fakeErrorResponse = new Error('Ups, something went wrong')

describe('createCommentAction', () => {
  beforeEach(() => {
    commentsAPI._createComment = commentsAPI.createComment
  })

  afterEach(() => {
    commentsAPI.createComment = commentsAPI._createComment
  })

  it('should dispatch action correctly when data fetching success', async () => {
    commentsAPI.createComment = () => Promise.resolve(fakeCommentResponse)
    const dispatch = vi.fn()

    await createCommentAction({
      content: fakeCommentResponse.content,
      threadId: 'thread-1',
    })(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith({
      type: types.CREATE_COMMENT,
      payload: {
        comment: fakeCommentResponse,
      },
    })
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    commentsAPI.createComment = () => Promise.reject(fakeErrorResponse)
    const dispatch = vi.fn()
    window.alert = vi.fn()

    await createCommentAction({
      content: fakeCommentResponse.content,
      threadId: 'thread-1',
    })(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
  })
})

describe('upVoteCommentAction', () => {
  beforeEach(() => {
    commentsAPI._upVoteComment = commentsAPI.upVoteComment
  })

  afterEach(() => {
    commentsAPI.upVoteComment = commentsAPI._upVoteComment
  })

  it('should dispatch action correctly when data fetching success and dispatch action again when data fetching failed', async () => {
    commentsAPI.upVoteComment = () => Promise.resolve()
    const dispatch = vi.fn()
    const getState = () => ({
      users: {
        authedUser: {
          id: 'users-1',
        },
      },
    })

    await upVoteCommentAction({
      commentId: 'comment-1',
      threadId: 'thread-1',
    })(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith({
      type: types.UP_VOTE_COMMENT_LIST,
      payload: {
        commentId: 'comment-1',
        userId: 'users-1',
      },
    })
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})

describe('downVoteCommentAction', () => {
  beforeEach(() => {
    commentsAPI._downVoteComment = commentsAPI.downVoteComment
  })

  afterEach(() => {
    commentsAPI.downVoteComment = commentsAPI._downVoteComment
  })

  it('should dispatch action correctly when data fetching success and dispatch action again when data fetching failed', async () => {
    commentsAPI.downVoteComment = () => Promise.resolve()
    const dispatch = vi.fn()
    const getState = () => ({
      users: {
        authedUser: {
          id: 'users-1',
        },
      },
    })

    await downVoteCommentAction({
      commentId: 'comment-1',
      threadId: 'thread-1',
    })(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith({
      type: types.DOWN_VOTE_COMMENT_LIST,
      payload: {
        commentId: 'comment-1',
        userId: 'users-1',
      },
    })
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})

describe('neutralVoteCommentAction', () => {
  commentsAPI.neutralVoteComment = () => Promise.resolve()
  const dispatch = vi.fn()
  const getState = () => ({
    users: {
      authedUser: {
        id: 'users-1',
      },
    },
  })

  describe('upVote', () => {
    it('should dispatch action correctly when data fetching success and dispatch action again when data fetching failed', async () => {
      await neutralVoteCommentAction({
        commentId: 'comment-1',
        threadId: 'thread-1',
        isUpVote: true,
      })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith(showLoading())
      expect(dispatch).toHaveBeenCalledWith({
        type: types.NEUTRAL_VOTE_COMMENT_LIST,
        payload: {
          commentId: 'comment-1',
          userId: 'users-1',
          isUpVote: true,
          isDownVote: false,
        },
      })
      expect(dispatch).toHaveBeenCalledWith(hideLoading())
    })
  })

  describe('downVote', () => {
    it('should dispatch action correctly when data fetching success and dispatch action again when data fetching failed', async () => {
      await neutralVoteCommentAction({
        commentId: 'comment-1',
        threadId: 'thread-1',
        isDownVote: true,
      })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith(showLoading())
      expect(dispatch).toHaveBeenCalledWith({
        type: types.NEUTRAL_VOTE_COMMENT_LIST,
        payload: {
          commentId: 'comment-1',
          userId: 'users-1',
          isDownVote: true,
          isUpVote: false,
        },
      })
      expect(dispatch).toHaveBeenCalledWith(hideLoading())
    })
  })
})
