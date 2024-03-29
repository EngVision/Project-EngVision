import React from 'react'

import type { IconProps } from './types'

const NoNotification = ({
  width = 24,
  height = 24,
  className = '',
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="currentColor"
        stroke="none"
      >
        <path
          d="M2450 4909 c-524 -33 -1009 -354 -1255 -831 -60 -117 -115 -270 -139
-391 -28 -137 -36 -302 -36 -805 0 -348 -3 -500 -11 -515 -7 -12 -87 -98 -179
-192 -150 -153 -171 -179 -208 -255 -95 -193 -78 -446 41 -613 42 -59 105
-119 152 -145 11 -6 27 -16 35 -21 12 -8 -28 -54 -207 -233 -187 -188 -222
-229 -228 -260 -20 -109 73 -203 182 -184 34 7 229 198 2061 2029 1198 1197
2030 2035 2038 2054 43 100 -31 213 -139 213 -21 0 -48 -5 -60 -11 -12 -6
-154 -142 -315 -303 -278 -276 -294 -290 -308 -271 -167 233 -298 370 -457
476 -221 148 -486 242 -717 255 -47 3 -98 6 -115 7 -16 2 -77 0 -135 -4z m250
-309 c382 -47 716 -267 917 -603 l43 -72 -1274 -1274 -1275 -1275 -53 13
c-118 26 -178 102 -186 232 -8 139 -3 149 194 350 94 97 183 196 197 220 63
108 61 78 68 744 5 527 8 620 23 685 59 254 162 445 336 621 269 272 641 404
1010 359z"
        />
        <path
          d="M3937 3122 l-147 -147 0 -301 c0 -434 -2 -429 261 -699 200 -205 205
-215 197 -354 -7 -124 -59 -195 -165 -227 -38 -12 -213 -14 -967 -14 l-921 0
-150 -150 -150 -150 1105 0 c1202 0 1147 -2 1265 58 168 84 275 251 290 452
10 129 -7 228 -57 330 -37 76 -58 102 -208 255 -92 94 -172 180 -179 192 -8
15 -11 153 -11 462 0 243 -3 441 -8 441 -4 0 -74 -66 -155 -148z"
        />
        <path
          d="M1896 760 c-39 -12 -66 -38 -87 -85 -24 -51 -24 -79 1 -129 71 -146
276 -300 475 -356 157 -45 375 -46 540 -4 141 37 324 147 406 246 95 114 113
169 81 242 -22 49 -64 82 -118 92 -51 10 -115 -25 -162 -87 -73 -98 -135 -143
-259 -186 -70 -24 -92 -27 -213 -27 -121 0 -143 3 -213 27 -128 44 -178 82
-285 215 -43 54 -99 72 -166 52z"
        />
      </g>
    </svg>
  )
}

export default NoNotification
