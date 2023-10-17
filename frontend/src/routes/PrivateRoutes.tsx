import { useEffect } from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import DefaultLayout from '../layouts/DefaultLayout'
import Chat from '../pages/Chat'
import CreateProfile from '../pages/CreateProfile'
import HelpCenter from '../pages/HelpCenter'
import Home from '../pages/Home'
import { UpdateProfile } from '../pages/UpdateProfile'
import { setUser } from '../redux/app/slice'
import authApi from '../services/authApi'
import { PRIVATE_ROUTES, PUBLIC_ROUTES, Role } from '../utils/constants'
import AdminRoutes from './AdminRoutes'
import StudentRoutes from './StudentRoutes'
import TeacherRoutes from './TeacherRoutes'

const ProtectedLayout = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.app.user)

  const fetchAuthUser = async () => {
    try {
      const data = await authApi.fetchAuthUser()

      dispatch(setUser(data))
    } catch (error) {
      dispatch(setUser(null))
      console.log('error: ', error)
    }
  }

  useEffect(() => {
    fetchAuthUser()
  }, [])

  return user ? (
    user.firstLogin ? (
      <CreateProfile />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to={PUBLIC_ROUTES.signIn} />
  )
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
  // {
  //   element: <CreateProfile />,
  //   path: PUBLIC_ROUTES.createProfile,
  // },
]

function PrivateRoutes() {
  const user = useAppSelector((state) => state.app.user)
  console.log('🚀 ~ file: PrivateRoutes.tsx:75 ~ PrivateRoutes ~ user:', user)

  let routes: RouteObject[] = []

  switch (user?.role) {
    case Role.Admin:
      routes = AdminRoutes
      break
    case Role.Teacher:
      routes = TeacherRoutes
      break
    case Role.Student:
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
