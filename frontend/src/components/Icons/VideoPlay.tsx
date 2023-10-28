import React from 'react'

import type { IconProps } from './types'

const VideoPlay = ({ width = 24, height = 24, className = '' }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      stroke="currentColor"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.75 9.375V5.625C13.75 2.5 12.5 1.25 9.375 1.25H5.625C2.5 1.25 1.25 2.5 1.25 5.625V9.375C1.25 12.5 2.5 13.75 5.625 13.75H9.375C12.5 13.75 13.75 12.5 13.75 9.375Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.57501 4.44385H13.425"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.32501 1.31885V4.35635"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.67499 1.31885V4.0751"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.09375 9.03108V8.28108C6.09375 7.31858 6.775 6.92483 7.60625 7.40608L8.25625 7.78108L8.90625 8.15608C9.7375 8.63733 9.7375 9.42483 8.90625 9.90608L8.25625 10.2811L7.60625 10.6561C6.775 11.1373 6.09375 10.7436 6.09375 9.78108V9.03108V9.03108Z"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default VideoPlay
