import { ThreadInput } from '../../components/threads/Input.jsx'
import { useDispatch } from 'react-redux'
import { createThreadAction } from '../../redux/threads/action.js'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../../components/common/Layout.jsx'

export const CreateThread = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onAddThread = async (payload) => {
    const { status, message } = await dispatch(createThreadAction(payload))
    alert(message)
    if (status === 'success') navigate(`/threads`)
  }

  return (
    <Layout>
      <ThreadInput onAddThread={onAddThread} />
    </Layout>
  )
}
