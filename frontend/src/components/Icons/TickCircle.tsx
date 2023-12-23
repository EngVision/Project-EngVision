import React from 'react'

import type { IconProps } from './types'

const TickCircle = ({ width = 24, height = 24, className = '' }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 22 22"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="20" height="20" rx="10" fill="currentColor" />
      <path
        d="M6.33335 11L10.3334 14.3333L15.6667 7.66663M11 20.3333C5.84536 20.3333 1.66669 16.1546 1.66669 11C1.66669 5.8453 5.84536 1.66663 11 1.66663C16.1547 1.66663 20.3334 5.8453 20.3334 11C20.3334 16.1546 16.1547 20.3333 11 20.3333Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default TickCircle
