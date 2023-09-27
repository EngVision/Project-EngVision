import React from 'react'

import Menu from './Menu'
import Account from './Account'

const Sidebar = () => {
  return (
    <div className="w-sidebarWidth px-[32px]">
      <h2 className="text-primary font-bold text-4xl w-[300px] py-[32px]">
        EngVision
      </h2>
      <Menu />

      <div className="bg-neutral absolute bottom-0">
        <Account />
      </div>
    </div>
  )
}

export default Sidebar
