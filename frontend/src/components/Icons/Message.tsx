import React from 'react'

import type { IconProps } from './types'

const Message = ({ width = 24, height = 24, className = '' }: IconProps) => {
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
        d="M17.98 11.4902V15.4902C17.98 15.7502 17.97 16.0002 17.94 16.2402C17.71 18.9402 16.12 20.2802 13.19 20.2802H12.79C12.54 20.2802 12.3 20.4002 12.15 20.6002L10.95 22.2002C10.42 22.9102 9.56 22.9102 9.03 22.2002L7.82999 20.6002C7.69999 20.4302 7.41 20.2802 7.19 20.2802H6.79001C3.60001 20.2802 2 19.4902 2 15.4902V11.4902C2 8.5602 3.35001 6.9702 6.04001 6.7402C6.28001 6.7102 6.53001 6.7002 6.79001 6.7002H13.19C16.38 6.7002 17.98 8.3002 17.98 11.4902Z"
        stroke="#3A3A3A"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.98 7.4902V11.4902C21.98 14.4302 20.63 16.0102 17.94 16.2402C17.97 16.0002 17.98 15.7502 17.98 15.4902V11.4902C17.98 8.3002 16.38 6.7002 13.19 6.7002H6.79004C6.53004 6.7002 6.28004 6.7102 6.04004 6.7402C6.27004 4.0502 7.86004 2.7002 10.79 2.7002H17.19C20.38 2.7002 21.98 4.3002 21.98 7.4902Z"
        stroke="#3A3A3A"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.4955 13.9502H13.5045"
        stroke="#3A3A3A"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.9955 13.9502H10.0045"
        stroke="#3A3A3A"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.4955 13.9502H6.5045"
        stroke="#3A3A3A"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default Message
