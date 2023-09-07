import { _fetchWithAuth, baseURL } from './index.js'

export const usersAPI = {
  register: async (payload) => {
    const response = await fetch(`${baseURL}/register`, {
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

  logIn: async (payload) => {
    const response = await fetch(`${baseURL}/login`, {
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

  getUsers: async () => {
    const response = await fetch(`${baseURL}/users`)
    const {
      status,
      message,
      data: { users },
    } = await response.json()

    if (status !== 'success') {
      throw new Error(message)
    }

    return users
  },

  getMe: async () => {
    if (localStorage.getItem('accessToken')) {
      const response = await _fetchWithAuth(`${baseURL}/users/me`)
      const {
        status,
        message,
        data: { user },
      } = await response.json()

      if (status !== 'success') {
        throw new Error(message)
      }

      return user
    }
  },
}
