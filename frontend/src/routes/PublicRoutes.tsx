import AuthLayout from '../layouts/AuthLayout'
import CourseDetailsPage from '../pages/CourseDetails'
import CreateProfile from '../pages/CreateProfile'
import Discover from '../pages/Discover'
import Exercise from '../pages/Exercise'
import MultipleChoice from '../pages/Lesson/MultipleChoice'
import ResetForgotPassword from '../pages/ResetForgotPassword'
import SendMailResetPassword from '../pages/SendMailResetPassword'
import SignIn from '../pages/SignIn'
import SSOSuccess from '../pages/SignIn/components/SSOSuccess'
import SignUp from '../pages/SignUp'
import TeacherSignUp from '../pages/SignUp/TeacherSignUp'
import { UpdateProfile } from '../pages/UpdateProfile'
import { ROUTES } from '../utils/constants'

import RoleRoutes from './RoleRoutes'
import type { RouteElement } from './types'

import { Appearance } from '../pages/Appearance'

const publicRoutes: RouteElement[] = [
  {
    element: SignIn,
    layout: AuthLayout,
    path: ROUTES.signIn,
  },
  {
    element: SignUp,
    layout: AuthLayout,
    path: ROUTES.signUp,
  },
  {
    element: SendMailResetPassword,
    layout: AuthLayout,
    path: ROUTES.sendMailResetPassword,
  },
  {
    element: ResetForgotPassword,
    layout: AuthLayout,
    path: ROUTES.resetForgotPassword,
  },
  {
    element: TeacherSignUp,
    layout: AuthLayout,
    path: ROUTES.signUpTeacher,
  },
  {
    element: CreateProfile,
    path: ROUTES.createProfile,
    layout: AuthLayout,
  },
  {
    element: UpdateProfile,
    path: ROUTES.updateProfile,
  },
  {
    element: SSOSuccess,
    path: ROUTES.ssoSuccess,
  },
  {
    element: CourseDetailsPage,
    path: ROUTES.courseDetails,
  },
  {
    element: Exercise,
    layout: null,
    path: ROUTES.exercise,
  },
  {
    element: Discover,
    path: ROUTES.courses,
  },
  {
    element: MultipleChoice,
    path: ROUTES.multipleChoice,
  },
  {
    element: Appearance,
    path: ROUTES.appearance,
  },
]

const PublicRoutes = () => {
  return <RoleRoutes routes={publicRoutes} />
}

export default PublicRoutes
