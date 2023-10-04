import { useAppSelector } from '../hooks/redux'
import Chat from '../pages/Chat'
import Discover from '../pages/Discover'
import Exam from '../pages/Exam'
import HelpCenter from '../pages/HelpCenter'
import Home from '../pages/Home'
import MakeSentences from '../pages/Lesson/MakeSentences'
import MyHub from '../pages/MyHub'
import Search from '../pages/Search'
import Settings from '../pages/Settings'
import Statistic from '../pages/Statistic'
import { ROLES, ROUTES } from '../utils/constants'

import RoleRoutes from './RoleRoutes'
import type { RouteElement } from './types'

const studentRoutes: RouteElement[] = [
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
    element: Settings,
    path: ROUTES.settings,
  },
  {
    element: HelpCenter,
    path: ROUTES.helpCenter,
  },
]

const StudentRoutes = () => {
  const role = useAppSelector((state) => state.app.role)

  return role === ROLES.student.value && <RoleRoutes routes={studentRoutes} />
}

export default StudentRoutes
