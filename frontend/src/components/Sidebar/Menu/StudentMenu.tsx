import { PRIVATE_ROUTES, STUDENT_ROUTES } from '../../../utils/constants'
import { DashboardIcon, GlobalSearchIcon, NoteIcon } from '../../Icons'

import { MenuItemType } from '../types'
import MenuItem from './MenuItem'

const STUDENT_MENU_ITEMS: MenuItemType[] = [
  {
    icon: <DashboardIcon />,
    path: PRIVATE_ROUTES.home,
    title: 'Dashboard',
  },
  // {
  //   icon: <BookIcon />,
  //   path: STUDENT_ROUTES.myHub,
  //   title: 'My hub',
  // },
  {
    icon: <NoteIcon />,
    path: STUDENT_ROUTES.exercisesAndExams,
    title: 'Exercises & Exams',
  },
  {
    icon: <GlobalSearchIcon />,
    path: STUDENT_ROUTES.discover,
    title: 'Discover',
  },
  // {
  //   icon: <ChartIcon />,
  //   path: PRIVATE_ROUTES.statistic,
  //   title: 'Statistic',
  // },
  // {
  //   icon: <MessageIcon />,
  //   path: PRIVATE_ROUTES.chat,
  //   title: 'Chats',
  // },
]

const StudentMenu = () => {
  return (
    <div className="flex flex-col my-4 gap-2">
      {STUDENT_MENU_ITEMS.map((item) => (
        <MenuItem key={item.path} item={item} />
      ))}
    </div>
  )
}

export default StudentMenu
