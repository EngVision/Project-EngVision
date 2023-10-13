import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import DefaultLayout from '../layouts/DefaultLayout'
import Chat from '../pages/Chat'
import HelpCenter from '../pages/HelpCenter'
import Home from '../pages/Home'
import { UpdateProfile } from '../pages/UpdateProfile'
import { PRIVATE_ROUTES, PUBLIC_ROUTES, ROLES } from '../utils/constants'
import AdminRoutes from './AdminRoutes'
import StudentRoutes from './StudentRoutes'
import TeacherRoutes from './TeacherRoutes'
import { useEffect } from 'react'
import { setRole, setUserAccountId } from '../redux/app/slice'
import authApi from '../services/authApi'

const ProtectedLayout = () => {
  const dispatch = useAppDispatch()
  const isLogin = !!useAppSelector((state) => state.app.userAccountId)

  const fetchAuthUser = async () => {
    try {
      const { data } = await authApi.fetchAuthUser()

      dispatch(setUserAccountId(data.id))
      dispatch(setRole(data.role))
    } catch (error) {
      console.log('error: ', error)
    }
  }

  useEffect(() => {
    fetchAuthUser()
  }, [])

  return isLogin ? <Outlet /> : <Navigate to={PUBLIC_ROUTES.signIn} />
}

const privateRoutes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      ...['home', ''].map((path) => ({ element: <Home />, path })),
      {
        element: <Chat />,
        path: PRIVATE_ROUTES.chat,
      },
      {
        element: <UpdateProfile />,
        path: PRIVATE_ROUTES.settings,
      },
      {
        element: <HelpCenter />,
        path: PRIVATE_ROUTES.helpCenter,
      },
    ],
  },
]

function PrivateRoutes() {
  const role = useAppSelector((state) => state.app.role)

  let routes: RouteObject[] = []

  switch (role) {
    case ROLES.admin.value:
      routes = AdminRoutes
      break
    case ROLES.teacher.value:
      routes = TeacherRoutes
      break
    case ROLES.student.value:
      routes = StudentRoutes
      break
    default:
      break
  }

  routes = [
    {
      element: <ProtectedLayout />,
      children: [...routes, ...privateRoutes],
    },
  ]

  return routes
}

export default PrivateRoutes