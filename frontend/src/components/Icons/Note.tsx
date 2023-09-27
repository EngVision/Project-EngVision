import React from 'react'

import type { IconProps } from './types'

const Note = ({ width = 24, height = 24, className = '' }: IconProps) => {
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
        d="M21.6602 11.14L20.6802 15.32C19.8402 18.93 18.1802 20.39 15.0602 20.09C14.5602 20.05 14.0202 19.96 13.4402 19.82L11.7602 19.42C7.59018 18.43 6.30018 16.37 7.28018 12.19L8.26018 7.99996C8.46018 7.14996 8.70018 6.40996 9.00018 5.79996C10.1702 3.37996 12.1602 2.72996 15.5002 3.51996L17.1702 3.90996C21.3602 4.88996 22.6402 6.95996 21.6602 11.14Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.0599 20.09C14.4399 20.51 13.6599 20.86 12.7099 21.17L11.1299 21.69C7.15985 22.97 5.06985 21.9 3.77985 17.93L2.49985 13.98C1.21985 10.01 2.27985 7.90996 6.24985 6.62996L7.82985 6.10996C8.23985 5.97996 8.62985 5.86996 8.99985 5.79996C8.69985 6.40996 8.45985 7.14996 8.25985 7.99996L7.27985 12.19C6.29985 16.37 7.58985 18.43 11.7599 19.42L13.4399 19.82C14.0199 19.96 14.5599 20.05 15.0599 20.09Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.6401 9.22995L17.4901 10.46"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.6602 13.0999L14.5602 13.8399"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default Note
