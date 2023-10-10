import { ROLES, PRIVATE_ROUTES } from '../../../utils/constants'
import { MessageQuestionIcon, SettingsIcon } from '../../Icons'

import { useAppSelector } from '../../../hooks/redux'
import { MenuItemType } from '../types'
import AdminMenu from './AdminMenu'
import MenuItem from './MenuItem'
import StudentMenu from './StudentMenu'
import TeacherMenu from './TeacherMenu'

const SUB_MENU_ITEMS: MenuItemType[] = [
  {
    icon: <SettingsIcon />,
    path: PRIVATE_ROUTES.settings,
    title: 'Settings',
  },
  {
    icon: <MessageQuestionIcon />,
    path: PRIVATE_ROUTES.helpCenter,
    title: 'Help Center',
  },
]

const Menu = () => {
  const role = useAppSelector((state) => state.app.role)

  const renderMenu = () => {
    switch (role) {
      case ROLES.student.value: {
        return <StudentMenu />
      }
      case ROLES.teacher.value: {
        return <TeacherMenu />
      }
      case ROLES.admin.value: {
        return <AdminMenu />
      }
      default: {
        return <StudentMenu />
      }
    }
  }

  return (
    <div className="flex-1 flex flex-col justify-between">
      {renderMenu()}

      <div className="flex flex-col my-4 gap-2">
        {SUB_MENU_ITEMS.map((item) => (
          <MenuItem key={item.path} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Menu
