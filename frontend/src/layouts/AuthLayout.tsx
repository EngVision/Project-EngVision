import React from 'react'

import type { LayoutProps } from './types'

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-slate-300">
      {children}
    </div>
  )
}

export default AuthLayout
