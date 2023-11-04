import React from 'react'

import type { IconProps } from './types'

const Unlock = ({ width = 24, height = 24, className = '' }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.75 10.833V7.08301C7.75 5.01194 9.42893 3.33301 11.5 3.33301C13.5711 3.33301 15.25 5.01194 15.25 7.08301V7.70801M5.25 10.833H17.75C18.4404 10.833 19 11.3927 19 12.083V19.583C19 20.2734 18.4404 20.833 17.75 20.833H5.25C4.55964 20.833 4 20.2734 4 19.583V12.083C4 11.3927 4.55964 10.833 5.25 10.833Z"
        stroke="#242633"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export default Unlock
