import React from 'react'

import type { IconProps } from './types'

const Settings = ({ width = 24, height = 24, className = '' }: IconProps) => {
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
        d="M12 15.7C13.6569 15.7 15 14.3568 15 12.7C15 11.0431 13.6569 9.69995 12 9.69995C10.3431 9.69995 9 11.0431 9 12.7C9 14.3568 10.3431 15.7 12 15.7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 13.5799V11.8199C2 10.7799 2.85 9.91995 3.9 9.91995C5.71 9.91995 6.45 8.63995 5.54 7.06995C5.02 6.16995 5.33 4.99995 6.24 4.47995L7.97 3.48995C8.76 3.01995 9.78 3.29995 10.25 4.08995L10.36 4.27995C11.26 5.84995 12.74 5.84995 13.65 4.27995L13.76 4.08995C14.23 3.29995 15.25 3.01995 16.04 3.48995L17.77 4.47995C18.68 4.99995 18.99 6.16995 18.47 7.06995C17.56 8.63995 18.3 9.91995 20.11 9.91995C21.15 9.91995 22.01 10.7699 22.01 11.8199V13.5799C22.01 14.6199 21.16 15.4799 20.11 15.4799C18.3 15.4799 17.56 16.7599 18.47 18.3299C18.99 19.2399 18.68 20.3999 17.77 20.9199L16.04 21.9099C15.25 22.3799 14.23 22.0999 13.76 21.3099L13.65 21.1199C12.75 19.5499 11.27 19.5499 10.36 21.1199L10.25 21.3099C9.78 22.0999 8.76 22.3799 7.97 21.9099L6.24 20.9199C5.33 20.3999 5.02 19.2299 5.54 18.3299C6.45 16.7599 5.71 15.4799 3.9 15.4799C2.85 15.4799 2 14.6199 2 13.5799Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Settings
