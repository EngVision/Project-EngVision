import { Appearance } from '../pages/Appearance'
import Chat from '../pages/Chat'
import CourseDetailsPage from '../pages/CourseDetails'
import Discover from '../pages/Discover'
import Exam from '../pages/Exam'
import Exercise from '../pages/Exercise'
import HelpCenter from '../pages/HelpCenter'
import Home from '../pages/Home'
import MakeSentences from '../pages/Lesson/MakeSentences'
import MultipleChoice from '../pages/Lesson/MultipleChoice'
import MyHub from '../pages/MyHub'
import Settings from '../pages/Settings'
import Statistic from '../pages/Statistic'
import { UpdateProfile } from '../pages/UpdateProfile'
import { PRIVATE_ROUTES, STUDENT_ROUTES } from '../utils/constants'
import RoleRoutes from './RoleRoutes'
import type { RouteElement } from './types'

const studentRoutes: RouteElement[] = [
  {
    element: Home,
    path: PRIVATE_ROUTES.home,
  },
  {
    element: MyHub,
    path: STUDENT_ROUTES.myHub,
  },
  {
    element: Exam,
    path: STUDENT_ROUTES.exam,
  },
  {
    element: Exercise,
    layout: null,
    path: PRIVATE_ROUTES.exercise,
  },
  {
    element: Discover,
    path: STUDENT_ROUTES.discover,
  },
  {
    element: Statistic,
    path: PRIVATE_ROUTES.statistic,
  },
  {
    element: Chat,
    path: PRIVATE_ROUTES.chat,
  },
  {
    element: MakeSentences,
    path: PRIVATE_ROUTES.makeSentence,
  },
  {
    element: Settings,
    path: PRIVATE_ROUTES.settings,
  },
  {
    element: HelpCenter,
    path: PRIVATE_ROUTES.helpCenter,
  },
  {
    element: CourseDetailsPage,
    path: STUDENT_ROUTES.courseDetails,
  },
  {
    element: Exercise,
    layout: null,
    path: PRIVATE_ROUTES.exercise,
  },
  {
    element: Discover,
    path: STUDENT_ROUTES.courses,
  },
  {
    element: MultipleChoice,
    path: PRIVATE_ROUTES.multipleChoice,
  },
  {
    element: Appearance,
    path: STUDENT_ROUTES.appearance,
  },
  {
    element: UpdateProfile,
    path: PRIVATE_ROUTES.updateProfile,
  },
]

const StudentRoutes = () => {
  return <RoleRoutes routes={studentRoutes} />
}

export default StudentRoutes
