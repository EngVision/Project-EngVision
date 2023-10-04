import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from './hooks/redux'
import { setRole, setUserAccountId } from './redux/app/slice'
import AppRoutes from './routes'
import authApi from './services/authApi'
import { ROUTES } from './utils/constants'
import { setupAxiosInterceptor } from './services/axiosClient'

const App: React.FC = () => {
  const userAccountId = useAppSelector((state) => state.app.userAccountId)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { pathname } = useLocation()

  const fetchAuthUser = async () => {
    if (!userAccountId) {
      try {
        const { data } = await authApi.fetchAuthUser()

        if (data?.id) {
          dispatch(setUserAccountId(data.id))
          dispatch(setRole(data.role))

          if (pathname === ROUTES.signIn || pathname.includes(ROUTES.signUp)) {
            navigate(ROUTES.home)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    setupAxiosInterceptor(navigate)
    fetchAuthUser()
  }, [])

  return <AppRoutes />
}

export default App
