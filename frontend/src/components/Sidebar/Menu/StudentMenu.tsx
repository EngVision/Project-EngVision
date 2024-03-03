import { PRIVATE_ROUTES, STUDENT_ROUTES } from '../../../utils/constants'
import {
  BookIcon,
  DashboardIcon,
  GlobalSearchIcon,
  MessageIcon,
} from '../../Icons'
import Cup from '../../Icons/Cup'

import { MenuItemType } from '../types'
import MenuItem from './MenuItem'
import { useAppSelector } from '../../../hooks/redux'

const StudentMenu = () => {
  const isNewMessage = useAppSelector((state) => state.app.isNewMessage)
  const STUDENT_MENU_ITEMS: MenuItemType[] = [
    {
      icon: <DashboardIcon />,
      path: PRIVATE_ROUTES.home,
      title: 'Dashboard',
      id: 'dashboard',
    },
    {
      icon: <BookIcon />,
      path: STUDENT_ROUTES.myHub,
      title: 'My Hub',
      id: 'my-hub',
    },
    {
      icon: <GlobalSearchIcon />,
      path: STUDENT_ROUTES.discover,
      title: 'Discover',
      id: 'discover',
    },
    {
      icon: <Cup />,
      path: STUDENT_ROUTES.achievement,
      title: 'Achievements',
      id: 'achievement',
    },
    {
      icon: (
        <div style={{ position: 'relative' }}>
          <MessageIcon />
          {isNewMessage && (
            <div
              style={{
                position: 'absolute',
                top: '0',
                right: '-3px',
                width: '8px',
                height: '8px',
                backgroundColor: 'red',
                borderRadius: '50%',
              }}
            ></div>
          )}
        </div>
      ),
      path: PRIVATE_ROUTES.chat,
      title: 'Chats',
    },
  ]
  return (
    <div className="flex flex-col my-4 gap-2">
      {STUDENT_MENU_ITEMS.map((item) => (
        <MenuItem key={item.path} item={item} />
      ))}
    </div>
  )
}

export default StudentMenu
