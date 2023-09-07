import { Layout } from '../../components/common/Layout.jsx'
import { RegisterInput } from '../../components/users/RegisterInput.jsx'
import { useDispatch } from 'react-redux'
import { registerAction } from '../../redux/users/action.js'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (payload) => {
    const { status, message } = await dispatch(registerAction(payload))
    alert(message)
    if (status === 'success') navigate('/login')
  }

  return (
    <Layout isAuth>
      <RegisterInput onSubmit={onSubmit} />
    </Layout>
  )
}
