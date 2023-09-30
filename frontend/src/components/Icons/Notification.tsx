import React from 'react'

import type { IconProps } from './types'

const Notification = ({
  width = 24,
  height = 24,
  className = '',
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1418_6939)">
        <path
          d="M24.0206 14.9102C20.7106 14.9102 18.0206 17.6002 18.0206 20.9102V23.8002C18.0206 24.4102 17.7606 25.3402 17.4506 25.8602L16.3006 27.7702C15.5906 28.9502 16.0806 30.2602 17.3806 30.7002C21.6906 32.1402 26.3406 32.1402 30.6506 30.7002C31.8606 30.3002 32.3906 28.8702 31.7306 27.7702L30.5806 25.8602C30.2806 25.3402 30.0206 24.4102 30.0206 23.8002V20.9102C30.0206 17.6102 27.3206 14.9102 24.0206 14.9102Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M25.8699 15.1999C25.5599 15.1099 25.2399 15.0399 24.9099 14.9999C23.9499 14.8799 23.0299 14.9499 22.1699 15.1999C22.4599 14.4599 23.1799 13.9399 24.0199 13.9399C24.8599 13.9399 25.5799 14.4599 25.8699 15.1999Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M27.0195 31.0601C27.0195 32.7101 25.6695 34.0601 24.0195 34.0601C23.1995 34.0601 22.4395 33.7201 21.8995 33.1801C21.3595 32.6401 21.0195 31.8801 21.0195 31.0601"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
      </g>
      <rect x="24" y="12" width="10" height="10" rx="5" fill="#F3EFE2" />
      <rect
        x="24"
        y="12"
        width="10"
        height="10"
        rx="5"
        stroke="#F3EFE2"
        strokeWidth="1.5"
      />
      <rect x="25" y="13" width="8" height="8" rx="4" fill="#F3EFE2" />
      <rect
        x="25"
        y="13"
        width="8"
        height="8"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <defs>
        <clipPath id="clip0_1418_6939">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(12 12)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Notification
