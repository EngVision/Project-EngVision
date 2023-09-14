import React from 'react'

import Header from '../compoments/Header'
import Sidebar from '../compoments/Sidebar'

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
