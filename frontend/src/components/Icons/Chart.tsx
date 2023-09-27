import React from 'react'

import type { IconProps } from './types'

const Chart = ({ width = 24, height = 24, className = '' }: IconProps) => {
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
        d="M2 22.7H22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 4.69995V22.7H14.25V4.69995C14.25 3.59995 13.8 2.69995 12.45 2.69995H11.55C10.2 2.69995 9.75 3.59995 9.75 4.69995Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 10.7V22.7H7V10.7C7 9.59995 6.6 8.69995 5.4 8.69995H4.6C3.4 8.69995 3 9.59995 3 10.7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 15.7V22.7H21V15.7C21 14.6 20.6 13.7 19.4 13.7H18.6C17.4 13.7 17 14.6 17 15.7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Chart
