import React from 'react'

import Account from './Account'
import Menu from './Menu'

const Sidebar = () => {
  return (
    <div className="w-sidebarWidth px-[32px]">
      <Menu />

      <div className="h-[2px] bg-neutral"></div>

      <Account />
    </div>
  )
}

export default Sidebar
