import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { commentsAPI } from '../../api/comments.js'
import { types } from '../types.js'

export const createCommentAction =
  ({ content, threadId }) =>
  async (dispatch) => {
    dispatch(showLoading())

    try {
      const comment = await commentsAPI.createComment({ content, threadId })

      dispatch({
        type: types.CREATE_COMMENT,
        payload: {
          comment,
        },
      })
    } catch (error) {
      alert(error.message)
    }

    dispatch(hideLoading())
  }

export const upVoteCommentAction =
  ({ commentId, threadId }) =>
  async (dispatch, getState) => {
    dispatch(showLoading())

    const { users } = getState()

    dispatch({
      type: types.UP_VOTE_COMMENT_LIST,
      payload: {
        commentId,
        userId: users.authedUser.id,
      },
    })

    try {
      await commentsAPI.upVoteComment({ commentId, threadId })
    } catch (error) {
      dispatch({
        type: types.UP_VOTE_COMMENT_LIST,
        payload: {
          commentId,
          userId: users.authedUser.id,
        },
      })
    }

    dispatch(hideLoading())
  }

export const downVoteCommentAction =
  ({ commentId, threadId }) =>
  async (dispatch, getState) => {
    dispatch(showLoading())

    const { users } = getState()

    dispatch({
      type: types.DOWN_VOTE_COMMENT_LIST,
      payload: {
        commentId,
        userId: users.authedUser.id,
      },
    })

    try {
      await commentsAPI.downVoteComment({ commentId, threadId })
    } catch (error) {
      dispatch({
        type: types.DOWN_VOTE_COMMENT_LIST,
        payload: {
          commentId,
          userId: users.authedUser.id,
        },
      })
    }

    dispatch(hideLoading())
  }

export const neutralVoteCommentAction =
  ({ commentId, threadId, isUpVote = false, isDownVote = false }) =>
  async (dispatch, getState) => {
    dispatch(showLoading())

    const { users } = getState()

    dispatch({
      type: types.NEUTRAL_VOTE_COMMENT_LIST,
      payload: {
        commentId,
        userId: users.authedUser.id,
        isUpVote,
        isDownVote,
      },
    })

    try {
      await commentsAPI.neutralVoteComment({ commentId, threadId })
    } catch (error) {
      dispatch({
        type: types.NEUTRAL_VOTE_COMMENT_LIST,
        payload: {
          commentId,
          userId: users.authedUser.id,
          isUpVote,
          isDownVote,
        },
      })
    }

    dispatch(hideLoading())
  }
