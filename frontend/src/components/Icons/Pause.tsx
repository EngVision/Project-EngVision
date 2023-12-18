import React from 'react'

import type { IconProps } from './types'

const Pause = ({ width = 24, height = 24, className = '' }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="a98320b4-c804-49e8-bb64-e76768f68178" data-name="Layer 30">
        <path
          fill="currentColor"
          d="m13 5v22a3 3 0 0 1 -3 3h-1a3 3 0 0 1 -3-3v-22a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3zm10-3h-1a3 3 0 0 0 -3 3v22a3 3 0 0 0 3 3h1a3 3 0 0 0 3-3v-22a3 3 0 0 0 -3-3z"
        />
      </g>
    </svg>
  )
}

export default Pause
