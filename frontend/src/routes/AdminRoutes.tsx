import Chat from '../pages/Chat'
import Exam from '../pages/Exam'
import HelpCenter from '../pages/HelpCenter'
import Home from '../pages/Home'
import MakeSentences from '../pages/Lesson/MakeSentences'
import MyHub from '../pages/MyHub'
import Settings from '../pages/Settings'
import Statistic from '../pages/Statistic'
import { ADMIN_ROUTES, PRIVATE_ROUTES } from '../utils/constants'

import RoleRoutes from './RoleRoutes'
import type { RouteElement } from './types'

const adminRoutes: RouteElement[] = [
  {
    element: Home,
    path: PRIVATE_ROUTES.home,
  },
  {
    element: MyHub,
    path: ADMIN_ROUTES.courses,
  },
  {
    element: Exam,
    path: ADMIN_ROUTES.assignmentExam,
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
]

const AdminRoutes = () => {
  return <RoleRoutes routes={adminRoutes} />
}

export default AdminRoutes
