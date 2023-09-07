import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { LogIn } from './pages/users/LogIn.jsx'
import { Register } from './pages/users/Register.jsx'
import { Threads } from './pages/threads/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { NotFound } from './pages/NotFound.jsx'
import { useEffect } from 'react'
import { preloadAction } from './redux/preload/action.js'
import { ThreadDetail } from './pages/threads/Detail.jsx'
import { Leaderboards } from './pages/leaderboards/index.jsx'
import { CreateThread } from './pages/threads/Create.jsx'

export const Routers = () => {
  const dispatch = useDispatch()

  const { authedUser = null } = useSelector(({ users }) => users)
  const isPreload = useSelector(({ preload }) => preload)

  useEffect(() => {
    dispatch(preloadAction())
  }, [dispatch])

  if (isPreload) {
    return null
  }

  if (authedUser === null) {
    return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/*' element={<NotFound redirectPage='login' />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path='/threads/create' element={<CreateThread />} />
      <Route path='/threads' element={<Threads />} />
      <Route path='/threads/:id' element={<ThreadDetail />} />
      <Route path='/leaderboards' element={<Leaderboards />} />
      <Route path='/*' element={<NotFound redirectPage='threads' />} />
    </Routes>
  )
}
