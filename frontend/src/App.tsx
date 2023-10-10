import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from './hooks/redux'
import { setRole, setUserAccountId } from './redux/app/slice'
import AppRoutes from './routes'
import authApi from './services/authApi'
import { publicRoutes } from './routes/PublicRoutes'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './utils/constants'

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

          if (
            pathname === PUBLIC_ROUTES.signIn ||
            pathname.includes(PUBLIC_ROUTES.signUp)
          ) {
            navigate(PRIVATE_ROUTES.home)
          }
        }
      } catch (error) {
        if (!publicRoutes.find((route) => route.path === pathname)) {
          navigate(PUBLIC_ROUTES.signIn)
        }
        console.log(error)
      }
    }
  }

  useEffect(() => {
    fetchAuthUser()
  }, [])

  return <AppRoutes />
}

export default App
