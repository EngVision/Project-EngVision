import { useAppSelector } from '../../../hooks/redux'
import { PRIVATE_ROUTES, TEACHER_ROUTES } from '../../../utils/constants'
import { BookIcon, DashboardIcon, MessageIcon, NoteIcon } from '../../Icons'

import { MenuItemType } from '../types'
import MenuItem from './MenuItem'

const TeacherMenu = () => {
  const isNewMessage = useAppSelector((state) => state.app.isNewMessage)

  const TEACHER_MENU_ITEMS: MenuItemType[] = [
    {
      icon: <DashboardIcon />,
      path: PRIVATE_ROUTES.home,
      title: 'Dashboard',
      id: 'dashboard',
    },
    {
      icon: <BookIcon />,
      path: TEACHER_ROUTES.courses,
      title: 'My courses',
      id: 'my-courses',
    },
    {
      icon: <NoteIcon />,
      path: TEACHER_ROUTES.grading,
      title: 'Grading',
      id: 'grading',
    },
    // {
    //   icon: <NoteIcon />,
    //   path: TEACHER_ROUTES.assignmentExam,
    //   title: 'Assignments & Exams',
    // },
    // {
    //   icon: <ChartIcon />,
    //   path: PRIVATE_ROUTES.statistic,
    //   title: 'Statistic',
    // },
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
      {TEACHER_MENU_ITEMS.map((item) => (
        <MenuItem key={item.path} item={item} />
      ))}
    </div>
  )
}

export default TeacherMenu
