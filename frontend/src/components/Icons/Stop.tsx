import React from 'react'

import type { IconProps } from './types'

const Stop = ({ width = 24, height = 24, className = '' }: IconProps) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m6 3.25c-1.51878 0-2.75 1.23122-2.75 2.75v12c0 1.5188 1.23122 2.75 2.75 2.75h12c1.5188 0 2.75-1.2312 2.75-2.75v-12c0-1.51878-1.2312-2.75-2.75-2.75z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Stop
