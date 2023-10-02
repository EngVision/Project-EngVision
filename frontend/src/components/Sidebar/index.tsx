import React from 'react'

import Menu from './Menu'

const Sidebar = () => {
  return (
    <div className="w-sidebarWidth bg-[#FFFCF7] px-[32px] flex flex-col h-[100vh]">
      <h2 className="text-primary font-bold text-4xl w-full py-[32px]">
        EngVision
      </h2>

      <Menu />
    </div>
  )
}

export default Sidebar
