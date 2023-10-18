import { Button } from 'antd'

import { useAppDispatch } from '../../hooks/redux'
import { setUser } from '../../redux/app/slice'
import authApi from '../../services/authApi'

const LogoutButton = () => {
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    try {
      await authApi.logout()
      dispatch(setUser(null))
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  return (
    <Button size="middle" onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default LogoutButton
