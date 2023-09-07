import { types } from '../types.js'

const initialState = {
  threads: [],
  thread: {},
}

export const threadsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_THREADS:
      return {
        ...state,
        threads: action.payload.threads,
      }
    case types.GET_THREAD:
      return {
        ...state,
        thread: action.payload.thread,
      }
    case types.UP_VOTE_THREAD_LIST:
      return {
        ...state,
        threads: state.threads.map((thread) => {
          if (thread.id === action.payload.threadId) {
            return {
              ...thread,
              upVotesBy: thread.upVotesBy.includes(action.payload.userId)
                ? thread.upVotesBy.filter(
                    (userId) => userId !== action.payload.userId,
                  )
                : thread.upVotesBy.concat([action.payload.userId]),
            }
          }

          return thread
        }),
      }
    case types.UP_VOTE_THREAD_DETAIL:
      return {
        ...state,
        thread: {
          ...state.thread,
          upVotesBy: state.thread.upVotesBy.includes(action.payload.userId)
            ? state.thread.upVotesBy.filter(
                (userId) => userId !== action.payload.userId,
              )
            : state.thread.upVotesBy.concat([action.payload.userId]),
        },
      }
    case types.DOWN_VOTE_THREAD_LIST:
      return {
        ...state,
        threads: state.threads.map((thread) => {
          if (thread.id === action.payload.threadId) {
            return {
              ...thread,
              downVotesBy: thread.downVotesBy.includes(action.payload.userId)
                ? thread.downVotesBy.filter(
                    (userId) => userId !== action.payload.userId,
                  )
                : thread.downVotesBy.concat([action.payload.userId]),
            }
          }

          return thread
        }),
      }
    case types.DOWN_VOTE_THREAD_DETAIL:
      return {
        ...state,
        thread: {
          ...state.thread,
          downVotesBy: state.thread.downVotesBy.includes(action.payload.userId)
            ? state.thread.downVotesBy.filter(
                (userId) => userId !== action.payload.userId,
              )
            : state.thread.downVotesBy.concat([action.payload.userId]),
        },
      }
    case types.NEUTRAL_VOTE_THREAD_LIST:
      return {
        ...state,
        threads: state.threads.map((thread) => {
          if (thread.id === action.payload.threadId) {
            if (action.payload.isUpVote) {
              return {
                ...thread,
                upVotesBy: thread.upVotesBy.filter(
                  (userId) => userId !== action.payload.userId,
                ),
              }
            }

            if (action.payload.isDownVote) {
              return {
                ...thread,
                downVotesBy: thread.downVotesBy.filter(
                  (userId) => userId !== action.payload.userId,
                ),
              }
            }
          }

          return thread
        }),
      }
    case types.NEUTRAL_VOTE_THREAD_DETAIL:
      if (action.payload.isUpVote) {
        return {
          ...state,
          thread: {
            ...state.thread,
            upVotesBy: state.thread.upVotesBy.filter(
              (userId) => userId !== action.payload.userId,
            ),
          },
        }
      }

      if (action.payload.isDownVote) {
        return {
          ...state,
          thread: {
            ...state.thread,
            downVotesBy: state.thread.downVotesBy.filter(
              (userId) => userId !== action.payload.userId,
            ),
          },
        }
      }

      break
    case types.CREATE_COMMENT:
      return {
        ...state,
        thread: {
          ...state.thread,
          comments: [action.payload.comment, ...state.thread.comments],
        },
      }
    case types.UP_VOTE_COMMENT_LIST:
      return {
        ...state,
        thread: {
          ...state.thread,
          comments: state.thread.comments.map((comment) => {
            if (comment.id === action.payload.commentId) {
              return {
                ...comment,
                upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                  ? comment.upVotesBy.filter(
                      (userId) => userId !== action.payload.userId,
                    )
                  : comment.upVotesBy.concat([action.payload.userId]),
              }
            }

            return comment
          }),
        },
      }
    case types.DOWN_VOTE_COMMENT_LIST:
      return {
        ...state,
        thread: {
          ...state.thread,
          comments: state.thread.comments.map((comment) => {
            if (comment.id === action.payload.commentId) {
              return {
                ...comment,
                downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                  ? comment.downVotesBy.filter(
                      (userId) => userId !== action.payload.userId,
                    )
                  : comment.downVotesBy.concat([action.payload.userId]),
              }
            }

            return comment
          }),
        },
      }
    case types.NEUTRAL_VOTE_COMMENT_LIST:
      if (action.payload.isUpVote) {
        return {
          ...state,
          thread: {
            ...state.thread,
            comments: state.thread.comments.map((comment) => {
              if (comment.id === action.payload.commentId) {
                return {
                  ...comment,
                  upVotesBy: comment.upVotesBy.filter(
                    (userId) => userId !== action.payload.userId,
                  ),
                }
              }

              return comment
            }),
          },
        }
      }

      if (action.payload.isDownVote) {
        return {
          ...state,
          thread: {
            ...state.thread,
            comments: state.thread.comments.map((comment) => {
              if (comment.id === action.payload.commentId) {
                return {
                  ...comment,
                  downVotesBy: comment.downVotesBy.filter(
                    (userId) => userId !== action.payload.userId,
                  ),
                }
              }

              return comment
            }),
          },
        }
      }

      break
    default:
      return state
  }
}
