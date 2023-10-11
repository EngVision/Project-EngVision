import React from 'react'

import type { IconProps } from './types'

const MoreVertical = ({
  width = 24,
  height = 24,
  className = '',
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 3.5C7.22386 3.5 7 3.27614 7 3C7 2.72386 7.22386 2.5 7.5 2.5C7.77614 2.5 8 2.72386 8 3C8 3.27614 7.77614 3.5 7.5 3.5Z"
        fill="#1677FF"
      />
      <path
        d="M7.5 8.5C7.22386 8.5 7 8.27614 7 8C7 7.72386 7.22386 7.5 7.5 7.5C7.77614 7.5 8 7.72386 8 8C8 8.27614 7.77614 8.5 7.5 8.5Z"
        fill="#1677FF"
      />
      <path
        d="M7.5 13.5C7.22386 13.5 7 13.2761 7 13C7 12.7239 7.22386 12.5 7.5 12.5C7.77614 12.5 8 12.7239 8 13C8 13.2761 7.77614 13.5 7.5 13.5Z"
        fill="#1677FF"
      />
      <path
        d="M7.5 3.5C7.22386 3.5 7 3.27614 7 3C7 2.72386 7.22386 2.5 7.5 2.5C7.77614 2.5 8 2.72386 8 3C8 3.27614 7.77614 3.5 7.5 3.5Z"
        stroke="#1677FF"
        strokeWidth="2"
      />
      <path
        d="M7.5 8.5C7.22386 8.5 7 8.27614 7 8C7 7.72386 7.22386 7.5 7.5 7.5C7.77614 7.5 8 7.72386 8 8C8 8.27614 7.77614 8.5 7.5 8.5Z"
        stroke="#1677FF"
        strokeWidth="2"
      />
      <path
        d="M7.5 13.5C7.22386 13.5 7 13.2761 7 13C7 12.7239 7.22386 12.5 7.5 12.5C7.77614 12.5 8 12.7239 8 13C8 13.2761 7.77614 13.5 7.5 13.5Z"
        stroke="#1677FF"
        strokeWidth="2"
      />
    </svg>
  )
}

export default MoreVertical
