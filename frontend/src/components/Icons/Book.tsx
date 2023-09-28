import React from 'react'

import type { IconProps } from './types'

const Book = ({ width = 24, height = 24, className = '' }: IconProps) => {
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
        d="M22 17.44V5.36996C22 4.16996 21.02 3.27996 19.83 3.37996H19.77C17.67 3.55996 14.48 4.62996 12.7 5.74996L12.53 5.85996C12.24 6.03996 11.76 6.03996 11.47 5.85996L11.22 5.70996C9.44 4.59996 6.26 3.53996 4.16 3.36996C2.97 3.26996 2 4.16996 2 5.35996V17.44C2 18.4 2.78 19.3 3.74 19.42L4.03 19.46C6.2 19.75 9.55 20.85 11.47 21.9L11.51 21.92C11.78 22.07 12.21 22.07 12.47 21.92C14.39 20.86 17.75 19.75 19.93 19.46L20.26 19.42C21.22 19.3 22 18.4 22 17.44Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6.18994V21.1899"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.75 9.18994H5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12.1899H5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Book
