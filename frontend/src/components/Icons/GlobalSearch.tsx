import React from 'react'

import type { IconProps } from './types'

const GlobalSearch = ({
  width = 24,
  height = 24,
  className = '',
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      stroke="currentColor"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 12.7C22 7.17995 17.52 2.69995 12 2.69995C6.48 2.69995 2 7.17995 2 12.7C2 18.22 6.48 22.7 12 22.7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.0001 3.69995H9.0001C7.0501 9.53995 7.0501 15.86 9.0001 21.7H8.0001"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 3.69995C15.97 6.61995 16.46 9.65995 16.46 12.7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 16.7V15.7C5.92 16.67 8.96 17.16 12 17.16"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 9.69993C8.84 7.74993 15.16 7.74993 21 9.69993"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.2 22.1C19.9673 22.1 21.4 20.6673 21.4 18.9C21.4 17.1327 19.9673 15.7 18.2 15.7C16.4327 15.7 15 17.1327 15 18.9C15 20.6673 16.4327 22.1 18.2 22.1Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 22.7L21 21.7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default GlobalSearch
