import React from 'react'

import type { IconProps } from './types'

const BookSquare = ({ width = 50, height = 50, className = '' }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 37 41"
      fill="none"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.0002 37.1668H25.0002C33.3335 37.1668 36.6668 33.8335 36.6668 25.5002V15.5002C36.6668 7.16683 33.3335 3.8335 25.0002 3.8335H15.0002C6.66683 3.8335 3.3335 7.16683 3.3335 15.5002V25.5002C3.3335 33.8335 6.66683 37.1668 15.0002 37.1668Z"
        fill="#2769E7"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M30.6319 25.9499V13.1332C30.6319 11.8499 29.5986 10.9166 28.3319 11.0166H28.2653C26.0319 11.1999 22.6486 12.3499 20.7486 13.5333L20.5653 13.6499C20.2653 13.8333 19.7485 13.8333 19.4319 13.6499L19.1652 13.4833C17.2819 12.2999 13.8986 11.1832 11.6652 10.9999C10.3986 10.8999 9.36523 11.8499 9.36523 13.1166V25.9499C9.36523 26.9666 10.1985 27.9333 11.2152 28.0499L11.5152 28.0999C13.8152 28.3999 17.382 29.5832 19.4153 30.6999L19.4652 30.7166C19.7486 30.8833 20.2152 30.8833 20.4819 30.7166C22.5152 29.5833 26.0986 28.4166 28.4152 28.0999L28.7653 28.0499C29.7986 27.9333 30.6319 26.9832 30.6319 25.9499Z"
        fill="#2769E7"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M20 14.0005V29.9338V14.0005Z" fill="#2769E7" />
      <path
        d="M20 14.0005V29.9338"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default BookSquare
