import React from 'react'

import type { IconProps } from './types'

const Loading = ({ width = 80, height = 80, className = '' }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        margin: 'auto',
        display: 'block',
        shapeRendering: 'auto',
      }}
      width={width}
      height={height}
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle cx="84" cy="50" r="10" fill="#e15b64">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="0.42372881355932207s"
          calcMode="spline"
          keyTimes="0;1"
          values="10;0"
          keySplines="0 0.5 0.5 1"
          begin="0s"
        ></animate>
        <animate
          attributeName="fill"
          repeatCount="indefinite"
          dur="1.6949152542372883s"
          calcMode="discrete"
          keyTimes="0;0.25;0.5;0.75;1"
          values="#e15b64;#abbd81;#f8b26a;#f47e60;#e15b64"
          begin="0s"
        ></animate>
      </circle>
      <circle cx="16" cy="50" r="10" fill="#e15b64">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.6949152542372883s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        ></animate>
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1.6949152542372883s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        ></animate>
      </circle>
      <circle cx="50" cy="50" r="10" fill="#f47e60">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.6949152542372883s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.42372881355932207s"
        ></animate>
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1.6949152542372883s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.42372881355932207s"
        ></animate>
      </circle>
      <circle cx="84" cy="50" r="10" fill="#f8b26a">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.6949152542372883s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.8474576271186441s"
        ></animate>
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1.6949152542372883s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.8474576271186441s"
        ></animate>
      </circle>
      <circle cx="16" cy="50" r="10" fill="#abbd81">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.6949152542372883s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1.2711864406779663s"
        ></animate>
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1.6949152542372883s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1.2711864406779663s"
        ></animate>
      </circle>
    </svg>
  )
}

export default Loading
