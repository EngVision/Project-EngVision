import React from 'react'

import type { IconProps } from './types'

const Forward = ({ width = 24, height = 24, className = '' }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        <path d="m19.6916 7.34849c-.25-.33-.72-.4-1.05-.15s-.4.72-.15 1.05c1.08 1.44 1.65 3.12001 1.65 4.86001 0 4.49-3.65 8.14-8.14 8.14-4.49004 0-8.14004-3.65-8.14004-8.14 0-4.49001 3.65-8.13001 8.14004-8.13001.58 0 1.17.07 1.81.22.03.01.06 0 .1 0 .02 0 .05.02.07.02.03 0 .05-.01.08-.01.04 0 .07-.01.1-.02.05-.01.1-.03.15-.06.03-.02.07-.03.1-.05.01-.01.03-.01.04-.02.03-.02.04-.05.06-.07.04-.04.07-.07.1-.12.03-.04.04-.09.06-.13.01-.03.03-.06.04-.09 0-.02 0-.03 0-.05.01-.05.01-.1 0-.15 0-.05 0-.09-.01-.14-.01-.04-.03-.08-.05-.13s-.04-.1-.07-.14c-.01-.02-.01-.03-.02-.04l-1.98-2.47c-.26-.32-.73-.37-1.05-.12-.32.26-.37.73-.12 1.05l.82 1.02c-.08 0-.16-.01-.24-.01-5.31004 0-9.64004 4.32-9.64004 9.64001 0 5.32 4.32 9.64 9.64004 9.64 5.32 0 9.64-4.32 9.64-9.64.01-2.07-.67-4.06001-1.94-5.76001z" />
        <path d="m9.5415 16.6708c-.41 0-.75-.34-.75-.75v-3.39l-.19.22c-.28.31-.75.33-1.06.06-.31-.28-.33-.75-.06-1.06l1.5-1.67c.21-.22999.54-.30999.83-.19999s.48.38999.48.69999v5.35c0 .41-.33.74-.75.74z" />
        <path d="m14 16.6703c-1.52 0-2.75-1.23-2.75-2.75v-1.35c0-1.52 1.23-2.74999 2.75-2.74999s2.75 1.22999 2.75 2.74999v1.35c0 1.52-1.23 2.75-2.75 2.75zm0-5.34c-.69 0-1.25.56-1.25 1.25v1.35c0 .69.56 1.25 1.25 1.25s1.25-.56 1.25-1.25v-1.35c0-.69-.56-1.25-1.25-1.25z" />
      </g>
    </svg>
  )
}

export default Forward