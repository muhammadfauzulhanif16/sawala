import { baseURL } from './index.js'

export const leaderboardsAPI = {
  getLeaderboards: async () => {
    const response = await fetch(`${baseURL}/leaderboards`)

    const {
      status,
      message,
      data: { leaderboards },
    } = await response.json()

    if (status !== 'success') {
      throw new Error(message)
    }

    return leaderboards
  },
}
