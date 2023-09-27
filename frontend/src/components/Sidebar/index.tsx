import React from 'react'

import Menu from './Menu'

const Sidebar = () => {
  return (
    <div className="w-sidebarWidth px-[32px]">
      <Menu />

      <div className="h-[2px] bg-neutral"></div>
    </div>
  )
}

export default Sidebar
