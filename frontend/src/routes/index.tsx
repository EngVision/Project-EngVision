import { useRoutes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'
import { useAppDispatch } from '../hooks/redux'
import { setCurrentLevel, setUser } from '../redux/app/slice'
import { useEffect } from 'react'
import authApi from '../services/authApi'
import userLevelApi from '../services/userLevelApi'
import { Role } from '../utils/constants'

const AppRoutes = () => {
  const dispatch = useAppDispatch()

  const fetchAuthUser = async () => {
    try {
      const data = await authApi.fetchAuthUser()
      dispatch(setUser(data))

      if (data?.showGetStarted) {
        dispatch(showGetStarted())
      }

      if (data?.role === Role.Student) {
        const level = await userLevelApi.getUserLevel()
        dispatch(setCurrentLevel(level))
      }
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
