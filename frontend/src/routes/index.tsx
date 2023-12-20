import { useRoutes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'
import { useAppDispatch } from '../hooks/redux'
import { setCurrentLevel, setUser } from '../redux/app/slice'
import { useEffect } from 'react'
import authApi from '../services/authApi'
import userLevelApi from '../services/userLevelApi'

const AppRoutes = () => {
  const dispatch = useAppDispatch()

  const fetchAuthUser = async () => {
    try {
      const [data, level] = await Promise.all([
        authApi.fetchAuthUser(),
        userLevelApi.getUserLevel(),
      ])
      console.log('🚀 ~ file: index.tsx:19 ~ fetchAuthUser ~ data:', data)

      dispatch(setUser(data))
      dispatch(setCurrentLevel(level))
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
