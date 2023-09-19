import React from 'react'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

import type { LayoutProps } from './types'

const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-[100vh]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="px-[32px] flex-1 bg-bgNeutral">{children}</div>
      </div>
    </div>
  )
}

export default DefaultLayout
