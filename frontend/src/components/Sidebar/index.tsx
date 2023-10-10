import React from 'react'

import Menu from './Menu'
import { LogoIcon } from '../Icons'

const Sidebar = () => {
  return (
    <div className="w-sidebarWidth bg-[#FFFCF7] p-8 flex flex-col h-[100vh] gap-2">
      <LogoIcon />

      <Menu />
    </div>
  )
}

export default Sidebar
