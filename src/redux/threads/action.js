import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { threadsAPI } from '../../api/threads.js'
import { types } from '../types.js'
import { usersAPI } from '../../api/users.js'

export const createThreadAction = (payload) => async (dispatch) => {
  dispatch(showLoading())

  try {
    return await threadsAPI.createThread(payload)
  } catch (error) {
    alert(error.message)
  }

  dispatch(hideLoading())
}

export const getThreadsAction = () => async (dispatch) => {
  dispatch(showLoading())

  try {
    const users = await usersAPI.getUsers()
    const threads = await threadsAPI.getThreads()

    dispatch({
      type: types.GET_THREADS,
      payload: {
        threads: threads.map(({ ownerId, ...thread }) => ({
          ...thread,
          content: thread.body,
          owner: users.find(({ id }) => id === ownerId),
        })),
      },
    })
  } catch (error) {
    alert(error.message)
  }

  dispatch(hideLoading())
}

export const getThreadAction = (id) => async (dispatch) => {
  dispatch(showLoading())

  try {
    const thread = await threadsAPI.getThread(id)

    dispatch({
      type: types.GET_THREAD,
      payload: {
        thread: {
          ...thread,
          content: thread.body,
          totalComments: thread?.comments?.length,
        },
      },
    })
  } catch (error) {
    alert(error.message)
  }

  dispatch(hideLoading())
}

export const upVoteThreadAction =
  ({ id, isDetailPage = false }) =>
  async (dispatch, getState) => {
    const { users } = getState()

    dispatch(showLoading())

    dispatch({
      type: isDetailPage
        ? types.UP_VOTE_THREAD_DETAIL
        : types.UP_VOTE_THREAD_LIST,
      payload: {
        threadId: id,
        userId: users.authedUser.id,
      },
    })

    try {
      await threadsAPI.upVoteThread(id)
    } catch (error) {
      dispatch({
        type: isDetailPage
          ? types.UP_VOTE_THREAD_DETAIL
          : types.UP_VOTE_THREAD_LIST,
        payload: {
          threadId: id,
          userId: users.authedUser.id,
        },
      })
    }

    dispatch(hideLoading())
  }

export const downVoteThreadAction =
  ({ id, isDetailPage = false }) =>
  async (dispatch, getState) => {
    const { users } = getState()

    dispatch(showLoading())

    dispatch({
      type: isDetailPage
        ? types.DOWN_VOTE_THREAD_DETAIL
        : types.DOWN_VOTE_THREAD_LIST,
      payload: {
        threadId: id,
        userId: users.authedUser.id,
      },
    })

    try {
      await threadsAPI.downVoteThread(id)
    } catch (error) {
      dispatch({
        type: isDetailPage
          ? types.DOWN_VOTE_THREAD_DETAIL
          : types.DOWN_VOTE_THREAD_LIST,
        payload: {
          threadId: id,
          userId: users.authedUser.id,
        },
      })
    }

    dispatch(hideLoading())
  }

export const neutralVoteThreadAction =
  ({ id, isUpVote = false, isDownVote = false, isDetailPage = false }) =>
  async (dispatch, getState) => {
    const { users } = getState()

    dispatch(showLoading())

    dispatch({
      type: isDetailPage
        ? types.NEUTRAL_VOTE_THREAD_DETAIL
        : types.NEUTRAL_VOTE_THREAD_LIST,
      payload: {
        threadId: id,
        userId: users.authedUser.id,
        isUpVote,
        isDownVote,
      },
    })

    try {
      await threadsAPI.neutralVoteThread(id)
    } catch (error) {
      dispatch({
        type: isDetailPage
          ? types.NEUTRAL_VOTE_THREAD_DETAIL
          : types.NEUTRAL_VOTE_THREAD_LIST,
        payload: {
          threadId: id,
          userId: users.authedUser.id,
          isUpVote,
          isDownVote,
        },
      })
    }

    dispatch(hideLoading())
  }
