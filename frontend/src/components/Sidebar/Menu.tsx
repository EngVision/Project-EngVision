import React from 'react'

import { ROUTES } from '../../utils/constants'
import {
  BookIcon,
  ChartIcon,
  DashboardIcon,
  GlobalSearchIcon,
  MessageIcon,
  NoteIcon,
  MessageQuestionIcon,
  SettingsIcon,
} from '../Icons'

import MenuItem from './MenuItem'

const MENU_ITEMS = [
  {
    icon: <DashboardIcon />,
    path: ROUTES.home,
    title: 'Dashboard',
  },
  {
    icon: <BookIcon />,
    path: ROUTES.myHub,
    title: 'My hub',
  },
  {
    icon: <NoteIcon />,
    path: ROUTES.exam,
    title: 'Exams',
  },
  {
    icon: <GlobalSearchIcon />,
    path: ROUTES.discover,
    title: 'Discover',
  },
  {
    icon: <ChartIcon />,
    path: ROUTES.statistic,
    title: 'Statistic',
  },
  {
    icon: <MessageIcon />,
    path: ROUTES.chat,
    title: 'Chats',
  },
]

const SUB_MENU_ITEMS = [
  {
    icon: <SettingsIcon />,
    path: ROUTES.settings,
    title: 'Settings',
  },
  {
    icon: <MessageQuestionIcon />,
    path: ROUTES.helpCenter,
    title: 'Help Center',
  },
]

const Menu = () => {
  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="flex flex-col my-4 gap-2">
        {MENU_ITEMS.map((item) => (
          <MenuItem key={item.path} item={item} />
        ))}
      </div>

      <div className="flex flex-col my-4 gap-2">
        {SUB_MENU_ITEMS.map((item) => (
          <MenuItem key={item.path} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Menu
