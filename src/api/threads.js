import { _fetchWithAuth, baseURL } from './index.js'

export const threadsAPI = {
  createThread: async (payload) => {
    const response = await _fetchWithAuth(`${baseURL}/threads`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (data.status !== 'success') {
      throw new Error(data.message)
    }

    return data
  },

  getThreads: async () => {
    const response = await fetch(`${baseURL}/threads`)
    const {
      status,
      message,
      data: { threads },
    } = await response.json()

    if (status !== 'success') {
      throw new Error(message)
    }

    return threads
  },

  getThread: async (id) => {
    const response = await fetch(`${baseURL}/threads/${id}`)

    const {
      status,
      message,
      data: { detailThread },
    } = await response.json()

    if (status !== 'success') {
      throw new Error(message)
    }

    return detailThread
  },

  upVoteThread: async (id) => {
    const response = await _fetchWithAuth(`${baseURL}/threads/${id}/up-vote`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const { status, message } = await response.json()

    if (status !== 'success') {
      throw new Error(message)
    }
  },

  downVoteThread: async (id) => {
    const response = await _fetchWithAuth(
      `${baseURL}/threads/${id}/down-vote`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const { status, message } = await response.json()

    if (status !== 'success') {
      throw new Error(message)
    }
  },

  neutralVoteThread: async (id) => {
    const response = await _fetchWithAuth(
      `${baseURL}/threads/${id}/neutral-vote`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const { status, message } = await response.json()

    if (status !== 'success') {
      throw new Error(message)
    }
  },
}
