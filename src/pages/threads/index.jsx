import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getThreadsAction } from '../../redux/threads/action.js'
import { Layout } from '../../components/common/Layout.jsx'
import { ThreadList } from '../../components/threads/List.jsx'
import { useSearchParams } from 'react-router-dom'

export const Threads = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()

  const { threads } = useSelector(({ threads }) => threads)

  let threadList = threads
  if (searchParams.get('category')) {
    threadList = threads.filter(
      ({ category }) => category === searchParams.get('category'),
    )
  }

  useEffect(() => {
    dispatch(getThreadsAction())
  }, [dispatch])

  return (
    <Layout isShowSearch>
      <ThreadList threads={threadList} />
    </Layout>
  )
}
