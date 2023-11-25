import React, { useEffect, useState } from 'react'

import Menu from './Menu'
import { LogoIcon, LogoImageIcon } from '../Icons'
import { Link } from 'react-router-dom'
import { PRIVATE_ROUTES } from '../../utils/constants'
import { Button } from 'antd'
import ArrowRight from '../Icons/ArrowRight'
import ArrowLeft from '../Icons/ArrowLeft'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { setSidebarCollapsed } from '../../redux/app/slice'

const Sidebar = () => {
  const isCollapsed = useAppSelector((state) => state.app.isSidebarCollapsed)
  const dispatch = useAppDispatch()
  const [isHovered, setIsHovered] = useState(false)
  const handlerMouseEnter = () => {
    setIsHovered(true)
  }
  const handlerMouseLeave = () => {
    setIsHovered(false)
  }
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) dispatch(setSidebarCollapsed(true))
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <div
      onMouseEnter={handlerMouseEnter}
      onMouseLeave={handlerMouseLeave}
      className="relative w-fit p-8 flex flex-col h-[100vh] gap-2 !bg-surface shadow-xl"
    >
      {isHovered && (
        <Button
          className="absolute top-10 right-0 translate-x-1/2 border-solid border-1 border-primary flex justify-center items-center scale-75 hover:scale-100"
          onClick={() => dispatch(setSidebarCollapsed(!isCollapsed))}
          shape="circle"
          icon={
            isCollapsed ? (
              <ArrowRight width={18} className="text-primary" />
            ) : (
              <ArrowLeft width={18} className="text-primary" />
            )
          }
        ></Button>
      )}

      <Link className="flex justify-center" to={PRIVATE_ROUTES.home}>
        {isCollapsed ? (
          <LogoImageIcon width={40} height={40} />
        ) : (
          <LogoIcon height={40} />
        )}
      </Link>

      <Menu />
    </div>
  )
}

export default Sidebar
