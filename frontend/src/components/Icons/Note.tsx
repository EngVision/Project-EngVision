import React from 'react'

import type { IconProps } from './types'

const Note = ({ width = 24, height = 24, className = '' }: IconProps) => {
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
        d="M21.6601 11.14L20.6801 15.32C19.8401 18.93 18.1801 20.39 15.0601 20.09C14.5601 20.05 14.0201 19.96 13.4401 19.82L11.7601 19.42C7.59006 18.43 6.30006 16.37 7.28006 12.19L8.26006 7.99996C8.46006 7.14996 8.70006 6.40996 9.00006 5.79996C10.1701 3.37996 12.1601 2.72996 15.5001 3.51996L17.1701 3.90996C21.3601 4.88996 22.6401 6.95996 21.6601 11.14Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.06 20.09C14.44 20.51 13.66 20.86 12.71 21.17L11.13 21.69C7.15998 22.97 5.06997 21.9 3.77997 17.93L2.49997 13.98C1.21997 10.01 2.27997 7.91005 6.24997 6.63005L7.82997 6.11005C8.23997 5.98005 8.62997 5.87005 8.99997 5.80005C8.69997 6.41005 8.45997 7.15005 8.25997 8.00005L7.27997 12.19C6.29997 16.37 7.58998 18.43 11.76 19.42L13.44 19.82C14.02 19.96 14.56 20.05 15.06 20.09Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.64 9.22998L17.49 10.46"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.66 13.0999L14.56 13.8399"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Note
