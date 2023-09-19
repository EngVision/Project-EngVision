import {
  faBookOpen,
  faChartSimple,
  faHouse,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { ROUTES } from '../../utils/constants'

import MenuItem from './MenuItem'

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faHouse} />,
    path: ROUTES.home,
    title: 'Overview',
  },
  {
    icon: <FontAwesomeIcon icon={faBookOpen} />,
    path: ROUTES.courses,
    title: 'Courses',
  },
  {
    icon: <FontAwesomeIcon icon={faChartSimple} />,
    path: ROUTES.statistics,
    title: 'Statistics',
  },
]

const Menu = () => {
  return (
    <div>
      <h4 className="text-[22px] pt-6">Menu</h4>
      <div className="flex flex-col mt-4 gap-2">
        {MENU_ITEMS.map((item) => (
          <MenuItem key={item.path} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Menu
