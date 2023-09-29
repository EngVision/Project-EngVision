import React from 'react'

import type { IconProps } from './types'

const Dashboard = ({ width = 24, height = 24, className = '' }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 9.21995V4.67995C22 3.26995 21.36 2.69995 19.77 2.69995H15.73C14.14 2.69995 13.5 3.26995 13.5 4.67995V9.20995C13.5 10.63 14.14 11.19 15.73 11.19H19.77C21.36 11.2 22 10.63 22 9.21995Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 20.47V16.43C22 14.84 21.36 14.2 19.77 14.2H15.73C14.14 14.2 13.5 14.84 13.5 16.43V20.47C13.5 22.06 14.14 22.7 15.73 22.7H19.77C21.36 22.7 22 22.06 22 20.47Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 9.21995V4.67995C10.5 3.26995 9.86 2.69995 8.27 2.69995H4.23C2.64 2.69995 2 3.26995 2 4.67995V9.20995C2 10.63 2.64 11.19 4.23 11.19H8.27C9.86 11.2 10.5 10.63 10.5 9.21995Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 20.47V16.43C10.5 14.84 9.86 14.2 8.27 14.2H4.23C2.64 14.2 2 14.84 2 16.43V20.47C2 22.06 2.64 22.7 4.23 22.7H8.27C9.86 22.7 10.5 22.06 10.5 20.47Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Dashboard
