import React, { useState } from 'react'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import useDarkMode from '../hooks/useDarkMode'
import type { LayoutProps } from './types'

interface Props {
  children: JSX.Element
}

const Background = ({ children }: Props) => {
  return (
    <div className="bg-[#F3EFE2] dark:text-white dark:bg-slate-400 transition-all">
      {children}
    </div>
  )
}

const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Background>
      <div className="flex flex-row h-[100vh]">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <div className="px-8">
            <Header />
          </div>
          <div className="px-8 pb-8 flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </Background>
  )
}

export default DefaultLayout
