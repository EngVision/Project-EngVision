import React from 'react'

import type { IconProps } from './types'

const PlayCircle = ({ width = 24, height = 24, className = '' }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.4812 13.75C10.933 13.75 13.7312 10.9518 13.7312 7.5C13.7312 4.04822 10.933 1.25 7.4812 1.25C4.02942 1.25 1.2312 4.04822 1.2312 7.5C1.2312 10.9518 4.02942 13.75 7.4812 13.75Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 5V8H10"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default PlayCircle
