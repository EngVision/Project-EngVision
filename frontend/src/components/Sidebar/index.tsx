import React from 'react'

import Menu from './Menu'
import { LogoIcon, LogoImageIcon } from '../Icons'
import { Link } from 'react-router-dom'
import { PRIVATE_ROUTES } from '../../utils/constants'

const Sidebar = () => {
  return (
    <div className="w-fit lg:w-sidebarWidth p-8 flex flex-col h-[100vh] gap-2">
      <Link to={PRIVATE_ROUTES.home}>
        <LogoImageIcon
          className="block lg:hidden ml-[6px]"
          width={40}
          height={40}
        />
        <LogoIcon className="hidden lg:block" />
      </Link>

      <Menu />
    </div>
  )
}

export default Sidebar
