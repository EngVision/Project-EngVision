import { useRoutes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {
  setCurrentLevel,
  setUser,
  setUserChat,
  showGetStarted,
} from '../redux/app/slice'
import { useEffect } from 'react'
import authApi from '../services/authApi'
import userLevelApi from '../services/userLevelApi'
import { Role } from '../utils/constants'
import chatApi from '../services/chatApi'

const AppRoutes = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.app.user)

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
      console.log('chatUserId: ', chatUserId, 'chatToken: ', chatToken)
      dispatch(setUserChat({ userId: chatUserId, authToken: chatToken }))
    }
  }

  useEffect(() => {
    fetchAuthUser()
  }, [])

  useEffect(() => {
    handleAuthChat()
  }, [user])

  const element = useRoutes([...PublicRoutes, ...PrivateRoutes()])

  return element
}

export default AppRoutes
