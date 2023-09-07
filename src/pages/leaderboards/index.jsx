import { Layout } from '../../components/common/Layout.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getLeaderboardsAction } from '../../redux/leaderboards/action.js'
import { LeaderboardList } from '../../components/leaderboards/List.jsx'

export const Leaderboards = () => {
  const dispatch = useDispatch()

  const { users } = useSelector(({ leaderboards }) => leaderboards)

  useEffect(() => {
    dispatch(getLeaderboardsAction())
  }, [dispatch])

  return (
    <Layout>
      <LeaderboardList users={users} />
    </Layout>
  )
}
