import React from 'react'

import type { IconProps } from './types'

const Plus = ({ width = 24, height = 24, className = '' }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.46838 1.37573H6.53088C6.44755 1.37573 6.40588 1.4174 6.40588 1.50073V6.40698H1.75C1.66667 6.40698 1.625 6.44865 1.625 6.53198V7.46948C1.625 7.55282 1.66667 7.59448 1.75 7.59448H6.40588V12.5007C6.40588 12.5841 6.44755 12.6257 6.53088 12.6257H7.46838C7.55172 12.6257 7.59338 12.5841 7.59338 12.5007V7.59448H12.25C12.3333 7.59448 12.375 7.55282 12.375 7.46948V6.53198C12.375 6.44865 12.3333 6.40698 12.25 6.40698H7.59338V1.50073C7.59338 1.4174 7.55172 1.37573 7.46838 1.37573Z"
        fill="black"
        fill-opacity="0.85"
      />
    </svg>
  )
}

export default Plus
