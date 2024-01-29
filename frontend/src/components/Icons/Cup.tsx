import React from 'react'

import type { IconProps } from './types'

const Cup = ({ width = 24, height = 24, className = '' }: IconProps) => {
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
        d="M12.1504 16.5V18.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.15039 22H17.1504V21C17.1504 19.9 16.2504 19 15.1504 19H9.15039C8.05039 19 7.15039 19.9 7.15039 21V22V22Z"
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M6.15039 22H18.1504"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16C8.13 16 5 12.87 5 9V6C5 3.79 6.79 2 9 2H15C17.21 2 19 3.79 19 6V9C19 12.87 15.87 16 12 16Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.46906 11.65C4.71906 11.41 4.05906 10.97 3.53906 10.45C2.63906 9.44998 2.03906 8.24998 2.03906 6.84998C2.03906 5.44998 3.13906 4.34998 4.53906 4.34998H5.18906C4.98906 4.80998 4.88906 5.31998 4.88906 5.84998V8.84998C4.88906 9.84998 5.09906 10.79 5.46906 11.65Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5293 11.65C19.2793 11.41 19.9393 10.97 20.4593 10.45C21.3593 9.44998 21.9593 8.24998 21.9593 6.84998C21.9593 5.44998 20.8593 4.34998 19.4593 4.34998H18.8093C19.0093 4.80998 19.1093 5.31998 19.1093 5.84998V8.84998C19.1093 9.84998 18.8993 10.79 18.5293 11.65Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Cup
