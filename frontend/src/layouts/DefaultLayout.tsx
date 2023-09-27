import React from 'react'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

import type { LayoutProps } from './types'

const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row h-[100vh]">
      <Sidebar />
      <div className="flex flex-1">
        <div className="px-8 flex-1 flex-col bg-bgNeutral">
          <Header />
          {children}
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
