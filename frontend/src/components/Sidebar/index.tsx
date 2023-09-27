import React from 'react'

import Menu from './Menu'
import Account from './Account'

const Sidebar = () => {
  return (
    <div className="w-sidebarWidth px-[32px]">
      <Menu />

      <div className="bg-neutral absolute bottom-0">
        <Account />
      </div>
    </div>
  )
}

export default Sidebar
