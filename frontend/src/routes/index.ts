import AuthLayout from '../layouts/AuthLayout'
import CourseDetailsPage from '../pages/CourseDetails'
import { CourseList } from '../pages/CourseList'
import CreateProfile from '../pages/CreateProfile'
import Exercise from '../pages/Exercise'
import HelpCenter from '../pages/HelpCenter'
import Home from '../pages/Home'
import MakeSentences from '../pages/Lesson/MakeSentences'
import ResetForgotPassword from '../pages/ResetForgotPassword'
import Search from '../pages/Search'
import SendMailResetPassword from '../pages/SendMailResetPassword'
import Settings from '../pages/Settings'
import SignIn from '../pages/SignIn'
import SSOSuccess from '../pages/SignIn/components/SSOSuccess'
import SignUp from '../pages/SignUp'
import TeacherSignUp from '../pages/SignUp/TeacherSignUp'
import TeacherCourses from '../pages/Teacher/Courses'
import { UpdateProfile } from '../pages/UpdateProfile'
import { ROUTES } from '../utils/constants'

import type { RouteElement } from './types'

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
    path: ROUTES.UpdateProfile,
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
    element: CourseList,
    path: ROUTES.courses,
  },
  {
    element: Exercise,
    layout: null,
    path: ROUTES.exercise,
  },
  {
    element: TeacherCourses,
    path: ROUTES.coursesTeacher,
  },
]

const privateRoutes: RouteElement[] = [
  {
    element: Home,
    path: ROUTES.home,
  },
  {
    element: MakeSentences,
    path: ROUTES.makeSentence,
  },
  {
    element: Search,
    path: ROUTES.search,
  },
  {
    element: Settings,
    path: ROUTES.settings,
  },
  {
    element: HelpCenter,
    path: ROUTES.helpCenter,
  },
]

export { privateRoutes, publicRoutes }
