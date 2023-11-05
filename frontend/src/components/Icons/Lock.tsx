import React from 'react'

import type { IconProps } from './types'

const Lock = ({ width = 24, height = 24, className = '' }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 9.5H17.5M7.5 9.5C6.11929 9.5 5 10.6193 5 12V19.5C5 20.8807 6.11929 22 7.5 22H17.5C18.8807 22 20 20.8807 20 19.5V12C20 10.6193 18.8807 9.5 17.5 9.5M7.5 9.5V7C7.5 4.23858 9.73858 2 12.5 2C15.2614 2 17.5 4.23858 17.5 7V9.5"
        stroke="#242633"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export default Lock
