import AuthLayout from '../layouts/AuthLayout'
import CreateProfile from '../pages/CreateProfile'
import ResetForgotPassword from '../pages/ResetForgotPassword'
import SendMailResetPassword from '../pages/SendMailResetPassword'
import SignIn from '../pages/SignIn'
import SSOSuccess from '../pages/SignIn/components/SSOSuccess'
import SignUp from '../pages/SignUp'
import TeacherSignUp from '../pages/SignUp/TeacherSignUp'
import { PUBLIC_ROUTES } from '../utils/constants'

import RoleRoutes from './RoleRoutes'
import type { RouteElement } from './types'

export const publicRoutes: RouteElement[] = [
  {
    element: SignIn,
    layout: AuthLayout,
    path: PUBLIC_ROUTES.signIn,
  },
  {
    element: SignUp,
    layout: AuthLayout,
    path: PUBLIC_ROUTES.signUp,
  },
  {
    element: SendMailResetPassword,
    layout: AuthLayout,
    path: PUBLIC_ROUTES.sendMailResetPassword,
  },
  {
    element: ResetForgotPassword,
    layout: AuthLayout,
    path: PUBLIC_ROUTES.resetForgotPassword,
  },
  {
    element: TeacherSignUp,
    layout: AuthLayout,
    path: PUBLIC_ROUTES.signUpTeacher,
  },
  {
    element: CreateProfile,
    path: PUBLIC_ROUTES.createProfile,
    layout: AuthLayout,
  },
  {
    element: SSOSuccess,
    path: PUBLIC_ROUTES.ssoSuccess,
  },
]

const PublicRoutes = () => {
  return <RoleRoutes routes={publicRoutes} />
}

export default PublicRoutes
