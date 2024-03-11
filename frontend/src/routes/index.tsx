import { remove } from 'lodash'
import { useEffect } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {
  setCurrentLevel,
  setUser,
  setUserChat,
  showGetStarted,
} from '../redux/app/slice'
import authApi from '../services/authApi'
import chatApi from '../services/chatApi'
import userLevelApi from '../services/userLevelApi'
import { Role } from '../utils/constants'
import PrivateRoutes from './PrivateRoutes'
import {
  default as PublicRoutes,
  default as publicRoutes,
} from './PublicRoutes'

const AppRoutes = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.app.user)
  const { pathname } = useLocation()

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

  const handleAuthChat = async () => {
    if (!user) return
    const userChat = await chatApi.login(user?.email, user?.email)

    const chatUserId = userChat?.userId
    const chatToken = userChat?.authToken

    if (chatUserId && chatToken) {
      dispatch(setUserChat({ userId: chatUserId, authToken: chatToken }))
    }
  }

  useEffect(() => {
    fetchAuthUser()
  }, [])

  useEffect(() => {
    handleAuthChat()
  }, [user])

  if (pathname === '/' && user) {
    remove(publicRoutes, (route) => route.path === '/')
  }

  const element = useRoutes([...PublicRoutes, ...PrivateRoutes()])

  return element
}

export default AppRoutes
