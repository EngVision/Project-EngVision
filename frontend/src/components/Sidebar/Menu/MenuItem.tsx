import React from 'react'
import { NavLink } from 'react-router-dom'
import { MenuItemType } from '../types'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { setShowLogoutModal } from '../../../redux/app/slice'
import LogoutModal from '../../Logout/LogoutModal'
import { Tooltip } from 'antd'

type Props = {
  item: MenuItemType
}

const MenuItem = ({ item }: Props) => {
  const dispatch = useAppDispatch()
  const isCollapsed = useAppSelector((state) => state.app.isSidebarCollapsed)

  return isCollapsed ? (
    item.path ? (
      <Tooltip title={item.title} placement="right">
        <NavLink
          id={item.id}
          to={item.path}
          className={({ isActive }) =>
            `flex gap-4 text-base font-semibold p-4 rounded-[12px] hover:bg-bgNeutral w-full 
              ${isActive ? '!bg-primary text-white' : ''}`
          }
        >
          <div className="flex items-center w-[24px]">{item.icon}</div>
          {isCollapsed ? '' : <span>{item.title}</span>}
        </NavLink>
      </Tooltip>
    ) : (
      <Tooltip title={item.title} placement="right">
        <span
          className="flex gap-4 text-base font-semibold p-4 rounded-[12px] hover:bg-bgNeutral w-full cursor-pointer"
          onClick={() => dispatch(setShowLogoutModal(true))}
        >
          <div className="flex items-center w-[24px]">{item.icon}</div>
          {!isCollapsed && item.element}
          <LogoutModal />
        </span>
      </Tooltip>
    )
  ) : item.path ? (
    <NavLink
      id={item.id}
      to={item.path}
      className={({ isActive }) =>
        `flex gap-4 text-base font-semibold p-4 rounded-[12px] hover:bg-bgNeutral w-full 
              ${isActive ? '!bg-primary text-white' : ''}`
      }
    >
      <div className="flex items-center w-[24px]">{item.icon}</div>
      {isCollapsed ? '' : <span>{item.title}</span>}
    </NavLink>
  ) : (
    <span
      className="flex gap-4 text-base font-semibold p-4 rounded-[12px] hover:bg-bgNeutral w-full cursor-pointer"
      onClick={() => dispatch(setShowLogoutModal(true))}
    >
      <div className="flex items-center w-[24px]">{item.icon}</div>
      {!isCollapsed && item.element}
      <LogoutModal />
    </span>
  )
}

export default MenuItem
