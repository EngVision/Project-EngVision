import { useRoutes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'
import { useAppDispatch } from '../hooks/redux'
import { setUser } from '../redux/app/slice'
import { useEffect } from 'react'
import authApi from '../services/authApi'

const AppRoutes = () => {
  const dispatch = useAppDispatch()
  const fetchAuthUser = async () => {
    try {
      const data = await authApi.fetchAuthUser()

      dispatch(setUser(data))
    } catch (error) {
      console.error('error: ', error)
    }
  }

  useEffect(() => {
    fetchAuthUser()
  }, [])

  const element = useRoutes([...PublicRoutes, ...PrivateRoutes()])

  return element
}

export default AppRoutes
