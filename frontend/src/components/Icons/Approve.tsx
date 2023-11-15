import React from 'react'

import type { IconProps } from './types'

const Approve = ({ width = 24, height = 24, className = '' }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0337 15.8751L13.3004 17.1417L15.8337 14.6084"
        stroke="#242633"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.133 9.05817C10.0497 9.04984 9.94971 9.04984 9.85805 9.05817C7.87471 8.9915 6.29971 7.3665 6.29971 5.3665C6.29138 3.32484 7.94971 1.6665 9.99138 1.6665C12.033 1.6665 13.6914 3.32484 13.6914 5.3665C13.6914 7.3665 12.108 8.9915 10.133 9.05817Z"
        stroke="#242633"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.9917 18.1746C8.47503 18.1746 6.9667 17.7912 5.8167 17.0246C3.80003 15.6746 3.80003 13.4746 5.8167 12.1329C8.10837 10.5996 11.8667 10.5996 14.1584 12.1329"
        stroke="#242633"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Approve
