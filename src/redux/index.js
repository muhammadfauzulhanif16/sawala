import { configureStore } from '@reduxjs/toolkit'
import { preloadReducer } from './preload/reducer.js'
import { usersReducer } from './users/reducer.js'
import { threadsReducer } from './threads/reducer.js'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { leaderboardsReducer } from './leaderboards/reducer.js'

export const store = configureStore({
  reducer: {
    preload: preloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    leaderboards: leaderboardsReducer,
    loadingBar: loadingBarReducer,
  },
})
