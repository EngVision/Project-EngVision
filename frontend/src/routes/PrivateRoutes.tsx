import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import DefaultLayout from '../layouts/DefaultLayout'
import Chat from '../pages/Chat'
import CreateProfile from '../pages/CreateProfile'
import HelpCenter from '../pages/HelpCenter'
import Home from '../pages/Home'
import { UpdateProfile } from '../pages/UpdateProfile'
import { PRIVATE_ROUTES, PUBLIC_ROUTES, ROLES } from '../utils/constants'
import AdminRoutes from './AdminRoutes'
import StudentRoutes from './StudentRoutes'
import TeacherRoutes from './TeacherRoutes'

const ProtectedLayout = () => {
  const user = useAppSelector((state) => state.app.user)

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
]

function PrivateRoutes() {
  const user = useAppSelector((state) => state.app.user)

  let routes: RouteObject[] = []

  switch (user?.role) {
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
