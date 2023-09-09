import { faBell } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar } from 'antd'
import React from 'react'

import LogoutButton from './LogoutButton'
import Search from './Search'

const Header = () => {
  return (
    <div className="flex items-center py-5 px-[32px] shadow-headerShadow">
      <h2 className="text-primary font-bold text-4xl w-[300px]">EngVision</h2>

      <div className="flex-1 flex justify-between">
        <Search />

        <div className="flex items-center gap-8">
          <FontAwesomeIcon icon={faBell} size="xl" />
          <Avatar size="default">Kiet</Avatar>
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}

export default Header
