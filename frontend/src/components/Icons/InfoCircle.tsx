import React from 'react'

import type { IconProps } from './types'

const InfoCircle = ({ width = 24, height = 24, className = '' }: IconProps) => {
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
        d="M7 4.5V5H8V4.5H7ZM8 4.49V3.99H7V4.49H8ZM8 11V7H7V11H8ZM8 4.5V4.49H7V4.5H8ZM6 8H7.5V7H6V8ZM6 11H9V10H6V11ZM7.5 1C11.0899 1 14 3.91015 14 7.5H15C15 3.35787 11.6421 3.57628e-07 7.5 0V1ZM1 7.5C1 3.91015 3.91015 1 7.5 1V0C3.35787 -3.57628e-07 3.57628e-07 3.35786 0 7.5H1ZM7.5 14C3.91015 14 1 11.0899 1 7.5H0C-3.57628e-07 11.6421 3.35786 15 7.5 15V14ZM7.5 15C11.6421 15 15 11.6421 15 7.5H14C14 11.0899 11.0899 14 7.5 14V15Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default InfoCircle
