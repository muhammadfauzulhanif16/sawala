import { _fetchWithAuth, baseURL } from './index.js'

export const commentsAPI = {
  createComment: async ({ content, threadId }) => {
    const response = await _fetchWithAuth(
      `${baseURL}/threads/${threadId}/comments`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
        }),
      },
    )

    const {
      status,
      message,
      data: { comment },
    } = await response.json()

    if (status !== 'success') {
      throw new Error(message)
    }

    return comment
  },

  upVoteComment: async ({ commentId, threadId }) => {
    const response = await _fetchWithAuth(
      `${baseURL}/threads/${threadId}/comments/${commentId}/up-vote`,
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

  downVoteComment: async ({ commentId, threadId }) => {
    const response = await _fetchWithAuth(
      `${baseURL}/threads/${threadId}/comments/${commentId}/down-vote`,
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

  neutralVoteComment: async ({ commentId, threadId }) => {
    const response = await _fetchWithAuth(
      `${baseURL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
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
