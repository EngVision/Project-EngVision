import React from 'react'
import { NavLink } from 'react-router-dom'
import { MenuItemType } from '../types'
import { useAppSelector } from '../../../hooks/redux'
type Props = {
  item: MenuItemType
}

const MenuItem = ({ item }: Props) => {
  const isCollapsed = useAppSelector((state) => state.app.isSidebarCollapsed)
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex gap-4 text-base font-semibold p-4 rounded-[12px] hover:bg-bgNeutral w-fit lg:w-full 
        ${isActive ? '!bg-primary text-white' : ''}`
      }
    >
      <div className="flex items-center w-[24px]">{item.icon}</div>
      {isCollapsed ? '' : <span>{item.title}</span>}
    </NavLink>
  )
}

export default MenuItem
