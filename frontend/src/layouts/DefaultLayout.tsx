import React from 'react'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

import type { LayoutProps } from './types'

const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row bg-[#F3EFE2] h-[100vh]">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <div className="px-8  bg-bgNeutral">
          <Header />
        </div>
        <div className="px-8 flex-1  overflow-y-scroll bg-bgNeutral">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
