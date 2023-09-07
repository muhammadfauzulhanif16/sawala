import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { usersAPI } from '../../api/users.js'
import { types } from '../types.js'

export const registerAction = (payload) => async (dispatch) => {
  dispatch(showLoading())

  try {
    return await usersAPI.register(payload)
  } catch (error) {
    alert(error.message)
  }

  dispatch(hideLoading())
}

export const logInAction = (payload) => async (dispatch) => {
  dispatch(showLoading())

  try {
    const {
      status,
      data: { token },
    } = await usersAPI.logIn(payload)
    localStorage.setItem('accessToken', token)

    const authedUser = await usersAPI.getMe()

    dispatch({
      type: types.LOG_IN,
      payload: {
        authedUser,
      },
    })

    return { status, authedUser }
  } catch (error) {
    alert(error.message)
  }

  dispatch(hideLoading())
}

export const logOutAction = () => (dispatch) => {
  dispatch(showLoading())

  localStorage.removeItem('accessToken')

  dispatch({
    type: types.LOG_OUT,
    payload: {
      authedUser: null,
    },
  })

  dispatch(hideLoading())
}
