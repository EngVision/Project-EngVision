import { ADMIN_ROUTES, PRIVATE_ROUTES } from '../../../utils/constants'
import {
  BookIcon,
  ChartIcon,
  DashboardIcon,
  MessageIcon,
  NoteIcon,
  UsersIcon,
} from '../../Icons'

import { MenuItemType } from '../types'
import MenuItem from './MenuItem'

const ADMIN_MENU_ITEMS: MenuItemType[] = [
  {
    icon: <DashboardIcon />,
    path: PRIVATE_ROUTES.home,
    title: 'Dashboard',
  },
  {
    icon: <BookIcon />,
    path: ADMIN_ROUTES.courses,
    title: 'My courses',
  },
  {
    icon: <NoteIcon />,
    path: ADMIN_ROUTES.grading,
    title: 'Grading',
    id: 'grading',
  },
  {
    icon: <NoteIcon />,
    path: ADMIN_ROUTES.exams,
    title: 'Exams',
  },
  {
    icon: <ChartIcon />,
    path: PRIVATE_ROUTES.statistic,
    title: 'Statistic',
  },
  {
    icon: <MessageIcon />,
    path: PRIVATE_ROUTES.chat,
    title: 'Chats',
  },
  {
    icon: <UsersIcon />,
    path: PRIVATE_ROUTES.manageUsers,
    title: 'Users',
  },
]

const AdminMenu = () => {
  return (
    <div className="flex flex-col my-4 gap-2">
      {ADMIN_MENU_ITEMS.map((item) => (
        <MenuItem key={item.path} item={item} />
      ))}
    </div>
  )
}

export default AdminMenu
