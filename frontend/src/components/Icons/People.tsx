import React from 'react'

import type { IconProps } from './types'

const People = ({ width = 24, height = 24, className = '' }: IconProps) => {
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
        d="M5.72473 6.79375C5.66223 6.7875 5.58723 6.7875 5.51848 6.79375C4.03098 6.74375 2.84973 5.525 2.84973 4.025C2.84973 2.49375 4.08723 1.25 5.62473 1.25C7.15598 1.25 8.39973 2.49375 8.39973 4.025C8.39348 5.525 7.21223 6.74375 5.72473 6.79375Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2564 2.5C11.4689 2.5 12.4439 3.48125 12.4439 4.6875C12.4439 5.86875 11.5064 6.83125 10.3377 6.875C10.2877 6.86875 10.2314 6.86875 10.1752 6.875"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.59983 9.1C1.08733 10.1125 1.08733 11.7625 2.59983 12.7687C4.31858 13.9187 7.13733 13.9187 8.85608 12.7687C10.3686 11.7562 10.3686 10.1063 8.85608 9.1C7.14358 7.95625 4.32483 7.95625 2.59983 9.1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.4625 12.5C11.9125 12.4062 12.3375 12.225 12.6875 11.9562C13.6625 11.225 13.6625 10.0187 12.6875 9.2875C12.3438 9.025 11.925 8.85 11.4813 8.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default People
