import React from 'react'

import Menu from './Menu'
import { LogoIcon } from '../Icons'

const Sidebar = () => {
  return (
    <div className=" w-sidebarWidth p-8 flex flex-col h-[100vh] gap-2 bg-[#FFFCF7] dark:bg-slate-300">
      <LogoIcon />

      <Menu />
    </div>
  )
}

export default Sidebar
