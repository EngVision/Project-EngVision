import React from 'react'
import { NavLink } from 'react-router-dom'
import { MenuItemType } from '../types'

type Props = {
  item: MenuItemType
}

const MenuItem = ({ item }: Props) => {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex gap-4 text-base font-semibold p-4 rounded-[12px] hover:bg-bgNeutral 
        ${isActive ? '!bg-primary text-white' : ''}`
      }
    >
      <div className="flex items-center w-[24px]">{item.icon}</div>
      {item.title}
    </NavLink>
  )
}

export default MenuItem