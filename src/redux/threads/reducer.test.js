/**
 * test scenario for threadsReducer
 *
 * - (thread)
 *   - should return the initial state when given by unknown action
 *   - should return the threads when given by GET_THREADS action
 *   - should return the thread when given by GET_THREAD action
 *   - (upVoteThread)
 *     - (in thread list)
 *       - should return the thread by adding non-existent user to upvote when given by UP_VOTE_THREAD_LIST action
 *       - should return the thread by removing user at upvote when given by UP_VOTE_THREAD_LIST action
 *     - (in thread detail)
 *       - should return the thread by adding non-existent user to upvote when given by UP_VOTE_THREAD_DETAIL action
 *       - should return the thread by removing user at upvote when given by UP_VOTE_THREAD_DETAIL action
 *   - (downVoteThread)
 *     - (in thread list)
 *       - should return the thread by adding non-existent user to downvote when given by DOWN_VOTE_THREAD_LIST action
 *       - should return the thread by removing user at downvote when given by DOWN_VOTE_THREAD_LIST action
 *     - (in thread detail)
 *       - should return the thread by adding non-existent user to downvote when given by DOWN_VOTE_THREAD_DETAIL action
 *       - should return the thread by removing user at downvote when given by DOWN_VOTE_THREAD_DETAIL action
 *   - (neutralVoteThread)
 *     - (in thread list)
 *       - should return the thread by removing user at upvote when given by NEUTRAL_VOTE_THREAD_LIST action
 *       - should return the thread by removing user at downvote when given by NEUTRAL_VOTE_THREAD_LIST action
 *     - (in thread detail)
 *       - should return the thread by removing user at upvote when given by NEUTRAL_VOTE_THREAD_DETAIL action
 *       - should return the thread by removing user at downvote when given by NEUTRAL_VOTE_THREAD_DETAIL action
 *
 * - (comment)
 *   - should return the thread with comments when given by CREATE_COMMENT action
 *   - (upVoteComment)
 *     - should return the thread with comments by adding non-existent user to upvote when given by UP_VOTE_COMMENT_LIST action
 *     - should return the thread with comments by removing user at upvote when given by UP_VOTE_COMMENT_LIST action
 *   - (downVoteComment)
 *     - should return the thread with comments by adding non-existent user to downvote when given by DOWN_VOTE_COMMENT_LIST action
 *     - should return the thread with comments by removing user at downvote when given by DOWN_VOTE_COMMENT_LIST action
 *   - (neutralVoteComment)
 *     - should return the thread with comments by removing user at upvote when given by NEUTRAL_VOTE_COMMENT_LIST action
 *     - should return the thread with comments by removing user at downvote when given by NEUTRAL_VOTE_COMMENT_LIST action
 */

import { describe, expect, it } from 'vitest'
import { threadsReducer } from './reducer.js'
import { types } from '../types.js'

describe('threads reducer', () => {
  describe('thread', () => {
    it('should return the initial state when given by unknown action', () => {
      const initialState = {
        threads: [],
        thread: {},
      }
      const action = {
        type: 'UNKNOWN',
      }

      const result = threadsReducer(initialState, action)

      expect(result).toEqual(initialState)
    })

    it('should return the threads when given by GET_THREADS action', () => {
      const initialState = {
        threads: [],
        thread: {},
      }
      const action = {
        type: types.GET_THREADS,
        payload: {
          threads: [
            {
              id: 'thread-1',
            },
          ],
        },
      }

      const result = threadsReducer(initialState, action)

      expect(result).toEqual({
        ...initialState,
        threads: action.payload.threads,
      })
    })

    it('should return the thread when given by GET_THREAD action', () => {
      const initialState = {
        threads: [],
        thread: {},
      }
      const action = {
        type: types.GET_THREAD,
        payload: {
          thread: {
            id: 'thread-1',
          },
        },
      }

      const result = threadsReducer(initialState, action)

      expect(result).toEqual({
        ...initialState,
        thread: action.payload.thread,
      })
    })

    describe('upVoteThread', () => {
      describe('in thread list', () => {
        it('should return the thread by adding non-existent user to upvote when given by UP_VOTE_THREAD_LIST action', () => {
          const initialState = {
            threads: [
              {
                id: 'thread-1',
                upVotesBy: [],
              },
            ],
            thread: {},
          }
          const action = {
            type: types.UP_VOTE_THREAD_LIST,
            payload: {
              threadId: 'thread-1',
              userId: 'user-1',
            },
          }

          const result = threadsReducer(initialState, action)

          expect(result).toEqual({
            ...initialState,
            threads: [
              {
                id: action.payload.threadId,
                upVotesBy: [action.payload.userId],
              },
            ],
          })
        })

        it('should return the thread by removing user at upvote when given by UP_VOTE_THREAD_LIST action', () => {
          const initialState = {
            threads: [
              {
                id: 'thread-1',
                upVotesBy: ['user-1'],
              },
            ],
            thread: {},
          }
          const action = {
            type: types.UP_VOTE_THREAD_LIST,
            payload: {
              threadId: 'thread-1',
              userId: 'user-1',
            },
          }

          const result = threadsReducer(initialState, action)

          expect(result).toEqual({
            ...initialState,
            threads: [
              {
                id: action.payload.threadId,
                upVotesBy: [],
              },
            ],
          })
        })
      })

      describe('in thread detail', () => {
        it('should return the thread by adding non-existent user to upvote when given by UP_VOTE_THREAD_DETAIL action', () => {
          const initialState = {
            threads: [],
            thread: {
              id: 'thread-1',
              upVotesBy: [],
            },
          }
          const action = {
            type: types.UP_VOTE_THREAD_DETAIL,
            payload: {
              userId: 'user-1',
            },
          }

          const result = threadsReducer(initialState, action)

          expect(result).toEqual({
            ...initialState,
            thread: {
              id: initialState.thread.id,
              upVotesBy: [action.payload.userId],
            },
          })
        })

        it('should return the thread by removing user at upvote when given by UP_VOTE_THREAD_DETAIL action', () => {
          const initialState = {
            threads: [],
            thread: {
              id: 'thread-1',
              upVotesBy: ['user-1'],
            },
          }
          const action = {
            type: types.UP_VOTE_THREAD_DETAIL,
            payload: {
              userId: 'user-1',
            },
          }

          const result = threadsReducer(initialState, action)

          expect(result).toEqual({
            ...initialState,
            thread: {
              id: initialState.thread.id,
              upVotesBy: [],
            },
          })
        })
      })
    })

    describe('downVoteThread', () => {
      describe('in thread list', () => {
        it('should return the thread by adding non-existent user to downvote when given by DOWN_VOTE_THREAD_LIST action', () => {
          const initialState = {
            threads: [
              {
                id: 'thread-1',
                downVotesBy: [],
              },
            ],
            thread: {},
          }
          const action = {
            type: types.DOWN_VOTE_THREAD_LIST,
            payload: {
              threadId: 'thread-1',
              userId: 'user-1',
            },
          }

          const result = threadsReducer(initialState, action)

          expect(result).toEqual({
            ...initialState,
            threads: [
              {
                id: action.payload.threadId,
                downVotesBy: [action.payload.userId],
              },
            ],
          })
        })

        it('should return the thread by removing user at downvote when given by DOWN_VOTE_THREAD_LIST action', () => {
          const initialState = {
            threads: [
              {
                id: 'thread-1',
                downVotesBy: ['user-1'],
              },
            ],
            thread: {},
          }
          const action = {
            type: types.DOWN_VOTE_THREAD_LIST,
            payload: {
              threadId: 'thread-1',
              userId: 'user-1',
            },
          }

          const result = threadsReducer(initialState, action)

          expect(result).toEqual({
            ...initialState,
            threads: [
              {
                id: action.payload.threadId,
                downVotesBy: [],
              },
            ],
          })
        })
      })

      describe('in thread detail', () => {
        it('should return the thread by adding non-existent user to downvote when given by DOWN_VOTE_THREAD_DETAIL action', () => {
          const initialState = {
            threads: [],
            thread: {
              id: 'thread-1',
              downVotesBy: [],
            },
          }
          const action = {
            type: types.DOWN_VOTE_THREAD_DETAIL,
            payload: {
              userId: 'user-1',
            },
          }

          const result = threadsReducer(initialState, action)

          expect(result).toEqual({
            ...initialState,
            thread: {
              id: initialState.thread.id,
              downVotesBy: [action.payload.userId],
            },
          })
        })

        it('should return the thread by removing user at downvote when given by DOWN_VOTE_THREAD_DETAIL action', () => {
          const initialState = {
            threads: [],
            thread: {
              id: 'thread-1',
              downVotesBy: ['user-1'],
            },
          }
          const action = {
            type: types.DOWN_VOTE_THREAD_DETAIL,
            payload: {
              userId: 'user-1',
            },
          }

          const result = threadsReducer(initialState, action)

          expect(result).toEqual({
            ...initialState,
            thread: {
              id: initialState.thread.id,
              downVotesBy: [],
            },
          })
        })
      })
    })

    describe('neutralVoteThread', () => {
      describe('in thread list', () => {
        it('should return the thread by removing user at upvote when given by NEUTRAL_VOTE_THREAD_LIST action', () => {
          const initialState = {
            threads: [
              {
                id: 'thread-1',
                upVotesBy: ['user-1'],
              },
            ],
            thread: {},
          }

          const action = {
            type: types.NEUTRAL_VOTE_THREAD_LIST,
            payload: {
              threadId: 'thread-1',
              userId: 'user-1',
              isUpVote: true,
            },
          }

          const result = threadsReducer(initialState, action)

          expect(result).toEqual({
            ...initialState,
            threads: [
              {
                id: action.payload.threadId,
                upVotesBy: [],
              },
            ],
          })
        })

        it('should return the thread by removing user at downvote when given by NEUTRAL_VOTE_THREAD_LIST action', () => {
          const initialState = {
            threads: [
              {
                id: 'thread-1',
                downVotesBy: ['user-1'],
              },
            ],
            thread: {},
          }

          const action = {
            type: types.NEUTRAL_VOTE_THREAD_LIST,
            payload: {
              threadId: 'thread-1',
              userId: 'user-1',
              isDownVote: true,
            },
          }

          const result = threadsReducer(initialState, action)

          expect(result).toEqual({
            ...initialState,
            threads: [
              {
                id: action.payload.threadId,
                downVotesBy: [],
              },
            ],
          })
        })
      })

      describe('in thread detail', () => {
        it('should return the thread by removing user at upvote when given by NEUTRAL_VOTE_THREAD_DETAIL action', () => {
          const initialState = {
            threads: [],
            thread: {
              id: 'thread-1',
              upVotesBy: ['user-1'],
            },
          }

          const action = {
            type: types.NEUTRAL_VOTE_THREAD_DETAIL,
            payload: {
              userId: 'user-1',
              isUpVote: true,
            },
          }

          const result = threadsReducer(initialState, action)

          expect(result).toEqual({
            ...initialState,
            thread: {
              id: 'thread-1',
              upVotesBy: [],
            },
          })
        })

        it('should return the thread by removing user at downvote when given by NEUTRAL_VOTE_THREAD_DETAIL action', () => {
          const initialState = {
            threads: [],
            thread: {
              id: 'thread-1',
              downVotesBy: ['user-1'],
            },
          }

          const action = {
            type: types.NEUTRAL_VOTE_THREAD_DETAIL,
            payload: {
              userId: 'user-1',
              isDownVote: true,
            },
          }

          const result = threadsReducer(initialState, action)

          expect(result).toEqual({
            ...initialState,
            thread: {
              id: 'thread-1',
              downVotesBy: [],
            },
          })
        })
      })
    })
  })

  describe('comment', () => {
    it('should return the thread with comments when given by CREATE_COMMENT action', () => {
      const initialState = {
        threads: [],
        thread: {
          id: 'thread-1',
          comments: [],
        },
      }

      const action = {
        type: types.CREATE_COMMENT,
        payload: {
          comment: {
            id: 'comment-1',
            content: 'content',
          },
        },
      }

      const result = threadsReducer(initialState, action)

      expect(result).toEqual({
        ...initialState,
        thread: {
          ...initialState.thread,
          comments: [action.payload.comment],
        },
      })
    })

    describe('upVoteComment', () => {
      it('should return the thread with comments by adding non-existent user to upvote when given by UP_VOTE_COMMENT_LIST action', () => {
        const initialState = {
          threads: [],
          thread: {
            id: 'thread-1',
            comments: [
              {
                id: 'comment-1',
                upVotesBy: [],
              },
            ],
          },
        }

        const action = {
          type: types.UP_VOTE_COMMENT_LIST,
          payload: {
            commentId: 'comment-1',
            userId: 'user-1',
          },
        }

        const result = threadsReducer(initialState, action)

        expect(result).toEqual({
          ...initialState,
          thread: {
            ...initialState.thread,
            comments: [
              {
                id: action.payload.commentId,
                upVotesBy: [action.payload.userId],
              },
            ],
          },
        })
      })

      it('should return the thread with comments by removing user at upvote when given by UP_VOTE_COMMENT_LIST action', () => {
        const initialState = {
          threads: [],
          thread: {
            id: 'thread-1',
            comments: [
              {
                id: 'comment-1',
                upVotesBy: ['user-1'],
              },
            ],
          },
        }

        const action = {
          type: types.UP_VOTE_COMMENT_LIST,
          payload: {
            commentId: 'comment-1',
            userId: 'user-1',
          },
        }

        const result = threadsReducer(initialState, action)

        expect(result).toEqual({
          ...initialState,
          thread: {
            ...initialState.thread,
            comments: [
              {
                id: action.payload.commentId,
                upVotesBy: [],
              },
            ],
          },
        })
      })
    })

    describe('downVoteComment', () => {
      it('should return the thread with comments by adding non-existent user to downvote when given by DOWN_VOTE_COMMENT_LIST action', () => {
        const initialState = {
          threads: [],
          thread: {
            id: 'thread-1',
            comments: [
              {
                id: 'comment-1',
                downVotesBy: [],
              },
            ],
          },
        }

        const action = {
          type: types.DOWN_VOTE_COMMENT_LIST,
          payload: {
            commentId: 'comment-1',
            userId: 'user-1',
          },
        }

        const result = threadsReducer(initialState, action)

        expect(result).toEqual({
          ...initialState,
          thread: {
            ...initialState.thread,
            comments: [
              {
                id: action.payload.commentId,
                downVotesBy: [action.payload.userId],
              },
            ],
          },
        })
      })

      it('should return the thread with comments by removing user at downvote when given by DOWN_VOTE_COMMENT_LIST action', () => {
        const initialState = {
          threads: [],
          thread: {
            id: 'thread-1',
            comments: [
              {
                id: 'comment-1',
                downVotesBy: ['user-1'],
              },
            ],
          },
        }

        const action = {
          type: types.DOWN_VOTE_COMMENT_LIST,
          payload: {
            commentId: 'comment-1',
            userId: 'user-1',
          },
        }

        const result = threadsReducer(initialState, action)

        expect(result).toEqual({
          ...initialState,
          thread: {
            ...initialState.thread,
            comments: [
              {
                id: action.payload.commentId,
                downVotesBy: [],
              },
            ],
          },
        })
      })
    })

    describe('neutralVoteComment', () => {
      it('should return the thread with comments by removing user at upvote when given by NEUTRAL_VOTE_COMMENT_LIST action', () => {
        const initialState = {
          threads: [],
          thread: {
            id: 'thread-1',
            comments: [
              {
                id: 'comment-1',
                upVotesBy: ['user-1'],
              },
            ],
          },
        }

        const action = {
          type: types.NEUTRAL_VOTE_COMMENT_LIST,
          payload: {
            commentId: 'comment-1',
            userId: 'user-1',
            isUpVote: true,
          },
        }

        const result = threadsReducer(initialState, action)

        expect(result).toEqual({
          ...initialState,
          thread: {
            ...initialState.thread,
            comments: [
              {
                id: action.payload.commentId,
                upVotesBy: [],
              },
            ],
          },
        })
      })

      it('should return the thread with comments by removing user at downvote when given by NEUTRAL_VOTE_COMMENT_LIST action', () => {
        const initialState = {
          threads: [],
          thread: {
            id: 'thread-1',
            comments: [
              {
                id: 'comment-1',
                downVotesBy: ['user-1'],
              },
            ],
          },
        }

        const action = {
          type: types.NEUTRAL_VOTE_COMMENT_LIST,
          payload: {
            commentId: 'comment-1',
            userId: 'user-1',
            isDownVote: true,
          },
        }

        const result = threadsReducer(initialState, action)

        expect(result).toEqual({
          ...initialState,
          thread: {
            ...initialState.thread,
            comments: [
              {
                id: action.payload.commentId,
                downVotesBy: [],
              },
            ],
          },
        })
      })
    })
  })
})
