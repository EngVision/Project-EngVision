import React from 'react'

import Menu from './Menu'

const Sidebar = () => {
  return (
    <div className="w-sidebarWidth px-[32px] flex flex-col">
      <h2 className="text-primary font-bold text-4xl w-full py-[32px]">
        EngVision
      </h2>

      <Menu />
    </div>
  )
}

export default Sidebar
