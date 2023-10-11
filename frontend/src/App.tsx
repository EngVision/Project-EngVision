import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from './hooks/redux'
import { setRole, setUserAccountId } from './redux/app/slice'
import AppRoutes from './routes'
import authApi from './services/authApi'

const App: React.FC = () => {
  // const userAccountId = useAppSelector((state) => state.app.userAccountId)

  // const dispatch = useAppDispatch()

  // const fetchAuthUser = async () => {
  //   if (!userAccountId) {
  //     try {
  //       const { data } = await authApi.fetchAuthUser()

  //       if (data?.id) {
  //         dispatch(setUserAccountId(data.id))
  //         dispatch(setRole(data.role))
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // }

  // useEffect(() => {
  //   // fetchAuthUser()
  // }, [])

  return <AppRoutes />
}

export default App
