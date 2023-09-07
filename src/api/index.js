export const baseURL = 'https://forum-api.dicoding.dev/v1'
export const _fetchWithAuth = async (url, options = {}) =>
  fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
