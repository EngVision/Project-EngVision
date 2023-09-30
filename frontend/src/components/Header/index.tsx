import { Avatar } from 'antd'
import React from 'react'

import { NotificationIcon } from '../Icons'

import Search from './Search'

const Header = () => {
  return (
    <div className="flex items-center py-9">
      <div className="flex-1 flex justify-between">
        <Search />

        <div className="flex items-center gap-4">
          <NotificationIcon width={40} height={40} />
          <Avatar size="default">Kiet</Avatar>
        </div>
      </div>
    </div>
  )
}

export default Header
