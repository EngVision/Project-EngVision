import { ROLES, PRIVATE_ROUTES } from '../../../utils/constants'
import { LogoutIcon, SettingsIcon } from '../../Icons'
import { useAppSelector } from '../../../hooks/redux'
import { MenuItemType } from '../types'
import AdminMenu from './AdminMenu'
import MenuItem from './MenuItem'
import StudentMenu from './StudentMenu'
import TeacherMenu from './TeacherMenu'
import Logout from '../../Logout'
const SUB_MENU_ITEMS: MenuItemType[] = [
  {
    icon: <SettingsIcon />,
    path: PRIVATE_ROUTES.settings,
    title: 'Account',
    id: 'account',
  },
  {
    icon: <LogoutIcon />,
    title: 'Logout',
    element: <Logout />,
  },
]

const Menu = () => {
  const user = useAppSelector((state) => state.app.user)

  const renderMenu = () => {
    switch (user?.role) {
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
        {SUB_MENU_ITEMS.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Menu
