import type { IconProps } from './types'

const EmojiSad = ({ width = 24, height = 24, className = '' }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 22.5H15C20 22.5 22 20.5 22 15.5V9.5C22 4.5 20 2.5 15 2.5H9C4 2.5 2 4.5 2 9.5V15.5C2 20.5 4 22.5 9 22.5Z"
        stroke="#2769E7"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7 9.25C8 8.25 9.63 8.25 10.64 9.25"
        stroke="#2769E7"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.3594 9.25C14.3594 8.25 15.9894 8.25 16.9994 9.25"
        stroke="#2769E7"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.4 18.2H15.6C16.1 18.2 16.5 17.8 16.5 17.3C16.5 14.81 14.49 12.8 12 12.8C9.51 12.8 7.5 14.81 7.5 17.3C7.5 17.8 7.9 18.2 8.4 18.2Z"
        stroke="#2769E7"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default EmojiSad
