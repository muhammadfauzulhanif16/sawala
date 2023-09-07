import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { leaderboardsAPI } from '../../api/leaderboards.js'
import { types } from '../types.js'

export const getLeaderboardsAction = () => async (dispatch) => {
  dispatch(showLoading())

  try {
    const users = await leaderboardsAPI.getLeaderboards()

    dispatch({
      type: types.GET_LEADERBOARDS,
      payload: {
        users,
      },
    })
  } catch (error) {
    alert(error.message)
  }

  dispatch(hideLoading())
}
