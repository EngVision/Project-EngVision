import type { IconProps } from './types'

const MinusCircle = ({
  width = 16,
  height = 16,
  className = '',
}: IconProps) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16.0025 11.9999L7.99805 11.9999" stroke="white" />
  </svg>
)

export default MinusCircle
