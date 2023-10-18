import React from 'react'

import type { IconProps } from './types'

const LogoImage = ({ width = 24, height = 24, className = '' }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_841_18479)">
        <path
          d="M14.5 12.3H1C0.4 12.3 0 12.7 0 13.3V19.5C0 20.1 0.4 20.5 1 20.5H17.3C18.4 20.5 19.3 21.2 19.7 22.2C20 23.2 21 23.9 22.1 23.9H28C28.4 23.9 28.8 23.6 28.9 23.2L31 17C31.2 16.4 30.7 15.7 30.1 15.7H19.2C18.1 15.7 17.2 15 16.8 14C16.5 12.9 15.6 12.3 14.5 12.3Z"
          fill="#2769E7"
        />
        <path
          d="M18.7 23.8H1C0.4 23.8 0 24.2 0 24.8V29C0 30.7 1.3 32 3 32H21.5C22.6 32 23.5 32.7 23.9 33.7L24.5 35.4L26.9 28.5C27.1 27.9 26.6 27.2 26 27.2H23.5C22.4 27.2 21.5 26.5 21.1 25.5C20.7 24.5 19.8 23.8 18.7 23.8Z"
          fill="#2769E7"
        />
        <path
          d="M12.7 2.39995C12.4 1.39995 11.4 0.699951 10.3 0.699951H3C1.3 0.699951 0 1.99995 0 3.69995V7.89995C0 8.49995 0.4 8.89995 1 8.89995H13.1C14.2 8.89995 15.1 9.59995 15.5 10.6C15.8 11.6 16.8 12.3 17.9 12.3H30.1C31.8 12.3 33.3 11.2 33.9 9.59995L35.8 4.09995H15C14 4.09995 13 3.39995 12.7 2.39995Z"
          fill="#2769E7"
        />
      </g>
      <defs>
        <clipPath id="clip0_841_18479">
          <rect width="36" height="36" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default LogoImage
