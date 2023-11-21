import React from 'react'

import type { IconProps } from './types'

const HelpMenu = ({ width = 24, height = 24, className = '' }: IconProps) => {
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
        d="M7.5 9V7.5H8C8.82843 7.5 9.5 6.82843 9.5 6V5.9C9.5 5.1268 8.8732 4.5 8.1 4.5H7.5C6.67157 4.5 6 5.17157 6 6M7 10.5H8M7.5 14.5C3.63401 14.5 0.5 11.366 0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5C11.366 0.5 14.5 3.63401 14.5 7.5C14.5 11.366 11.366 14.5 7.5 14.5Z"
        stroke="currentColor"
      />
    </svg>
  )
}

export default HelpMenu
