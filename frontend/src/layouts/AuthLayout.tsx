import React from 'react'

type Props = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-slate-300">
      {children}
    </div>
  )
}

export default AuthLayout
