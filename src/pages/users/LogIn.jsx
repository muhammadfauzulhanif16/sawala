import { Layout } from '../../components/common/Layout.jsx'
import { LogInInput } from '../../components/users/LogInInput.jsx'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logInAction } from '../../redux/users/action.js'

export const LogIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (payload) => {
    const { status, authedUser } = await dispatch(logInAction(payload))
    alert(`Authenticated as ${authedUser.email}`)
    if (status === 'success') navigate('/threads')
  }

  return (
    <Layout isAuth>
      <LogInInput onSubmit={onSubmit} />
    </Layout>
  )
}
