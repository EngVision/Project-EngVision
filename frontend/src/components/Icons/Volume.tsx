import React from 'react'

import type { IconProps } from './types'

const Volume = ({ width = 24, height = 24, className = '' }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="sound_medium">
        <g>
          <g>
            <path
              fill="currentColor"
              d="m18.36 19.36c-.257 0-.514-.099-.709-.295-.39-.392-.388-1.025.004-1.415 1.512-1.502 2.345-3.508 2.345-5.65s-.833-4.148-2.345-5.65c-.392-.39-.394-1.022-.004-1.415.389-.392 1.021-.394 1.414-.004 1.893 1.881 2.935 4.391 2.935 7.069s-1.042 5.188-2.935 7.069c-.195.194-.45.291-.705.291z"
            />
          </g>
          <g>
            <path
              fill="currentColor"
              d="m15.53 16.53c-.258 0-.516-.099-.711-.297-.389-.393-.385-1.026.008-1.414.745-.737 1.173-1.765 1.173-2.819s-.428-2.082-1.173-2.819c-.393-.388-.396-1.021-.008-1.414.388-.392 1.021-.396 1.414-.008 1.123 1.11 1.767 2.656 1.767 4.241s-.644 3.131-1.767 4.241c-.195.193-.449.289-.703.289z"
            />
          </g>
          <g>
            <path
              fill="currentColor"
              d="m12 22c-.26 0-.516-.102-.707-.293l-4.707-4.707h-2.586c-1.103 0-2-.897-2-2v-6c0-1.103.897-2 2-2h2.586l4.707-4.707c.286-.287.716-.372 1.09-.217s.617.52.617.924v18c0 .404-.243.769-.617.924-.124.051-.254.076-.383.076z"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default Volume