import { RouteObject } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import CreateProfile from '../pages/CreateProfile'
import ResetForgotPassword from '../pages/ResetForgotPassword'
import SendMailResetPassword from '../pages/SendMailResetPassword'
import SignIn from '../pages/SignIn'
import SSOSuccess from '../pages/SignIn/components/SSOSuccess'
import SignUp from '../pages/SignUp'
import TeacherSignUp from '../pages/SignUp/TeacherSignUp'
import { PUBLIC_ROUTES } from '../utils/constants'

const publicRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      { element: <SignIn />, path: PUBLIC_ROUTES.signIn },
      { element: <SignUp />, path: PUBLIC_ROUTES.signUp },
      {
        element: <SendMailResetPassword />,
        path: PUBLIC_ROUTES.sendMailResetPassword,
      },
      {
        element: <ResetForgotPassword />,
        path: PUBLIC_ROUTES.resetForgotPassword,
      },
      {
        element: <TeacherSignUp />,
        path: PUBLIC_ROUTES.signUpTeacher,
      },
      {
        element: <CreateProfile />,
        path: PUBLIC_ROUTES.createProfile,
      },
    ],
  },
  {
    element: <SSOSuccess />,
    path: PUBLIC_ROUTES.ssoSuccess,
  },
]

export default publicRoutes
