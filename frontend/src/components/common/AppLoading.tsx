import React from 'react'
import { LoadingIcon } from '../Icons'

interface AppLoadingProps {
  className?: string
}

const AppLoading = ({ className = '' }: AppLoadingProps) => {
  return (
    <div className={`flex justify-between items-center h-full ${className}`}>
      <LoadingIcon />
    </div>
  )
}

export default AppLoading
