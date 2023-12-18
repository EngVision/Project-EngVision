import React from 'react'

import type { IconProps } from './types'

const Play = ({ width = 24, height = 24, className = '' }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Play">
        <path
          fill="currentColor"
          d="m37.324 20.026-22-12.412a4.685 4.685 0 0 0 -4.711.036 4.528 4.528 0 0 0 -2.28 3.938v24.824a4.528 4.528 0 0 0 2.28 3.938 4.687 4.687 0 0 0 4.711.036l22-12.412a4.543 4.543 0 0 0 0-7.948z"
        />
      </g>
    </svg>
  )
}

export default Play
