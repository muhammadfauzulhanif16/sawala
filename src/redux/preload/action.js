import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { usersAPI } from '../../api/users.js'
import { types } from '../types.js'

export const preloadAction = () => async (dispatch) => {
  dispatch(showLoading())

  try {
    const authedUser = await usersAPI.getMe()

    dispatch({
      type: types.LOG_IN,
      payload: {
        authedUser,
      },
    })
  } catch (error) {
    dispatch({
      type: types.LOG_IN,
      payload: {
        authedUser: null,
      },
    })
  } finally {
    dispatch({
      type: types.PRELOAD,
      payload: {
        isPreload: false,
      },
    })
  }

  dispatch(hideLoading())
}
