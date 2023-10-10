import AuthLayout from '../layouts/AuthLayout'
import Chat from '../pages/Chat'
import CourseDetailsPage from '../pages/CourseDetails'
import CreateProfile from '../pages/CreateProfile'
import Discover from '../pages/Discover'
import Exam from '../pages/Exam'
import Exercise from '../pages/Exercise'
import HelpCenter from '../pages/HelpCenter'
import Home from '../pages/Home'
import MakeSentences from '../pages/Lesson/MakeSentences'
import MultipleChoice from '../pages/Lesson/MultipleChoice'
import MyHub from '../pages/MyHub'
import ResetForgotPassword from '../pages/ResetForgotPassword'
import Search from '../pages/Search'
import SendMailResetPassword from '../pages/SendMailResetPassword'
import SettingBar from '../components/SettingBar'
import SignIn from '../pages/SignIn'
import SSOSuccess from '../pages/SignIn/components/SSOSuccess'
import SignUp from '../pages/SignUp'
import TeacherSignUp from '../pages/SignUp/TeacherSignUp'
import Statistic from '../pages/Statistic'
import { UpdateProfile } from '../pages/UpdateProfile'
import { ROUTES } from '../utils/constants'

import TeacherCourses from '../pages/Teacher/Courses'
import type { RouteElement } from './types'
import TeacherCourseDetail from '../pages/Teacher/CourseDetail'
import TeacherCreateCourse from '../pages/Teacher/CreateCourse'

import { Appearance } from '../pages/Appearance'

import ManageExercise from '../pages/ManageExercise'

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

const privateRoutes: RouteElement[] = [
  {
    element: Home,
    path: ROUTES.home,
  },
  {
    element: MyHub,
    path: ROUTES.myHub,
  },
  {
    element: Exam,
    path: ROUTES.exam,
  },
  {
    element: Exercise,
    layout: null,
    path: ROUTES.exercise,
  },
  {
    element: ManageExercise,
    path: ROUTES.createExercise,
  },
  {
    element: ManageExercise,
    path: ROUTES.editExercise,
  },
  {
    element: Discover,
    path: ROUTES.discover,
  },
  {
    element: Statistic,
    path: ROUTES.statistic,
  },
  {
    element: Chat,
    path: ROUTES.chat,
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
    element: UpdateProfile,
    path: ROUTES.settings,
  },
  {
    element: HelpCenter,
    path: ROUTES.helpCenter,
  },
  {
    element: TeacherCourses,
    path: ROUTES.teacherCourses,
  },
  {
    element: TeacherCourseDetail,
    path: ROUTES.teacherCourseDetail,
  },
  {
    element: TeacherCreateCourse,
    path: ROUTES.teacherCreateCourse,
  },
]

export { privateRoutes, publicRoutes }
