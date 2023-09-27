import { faBell } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar } from 'antd'
import React from 'react'

import Search from './Search'

const Header = () => {
  return (
    <div className="flex items-center py-9">
      <div className="flex-1 flex justify-between">
        <Search />

        <div className="flex items-center gap-8">
          <FontAwesomeIcon icon={faBell} size="xl" />
          <Avatar size="default">Kiet</Avatar>
        </div>
      </div>
    </div>
  )
}

export default Header
