import React from 'react'

export default function Duration({ className, seconds }: any) {
  if (!seconds || seconds === Infinity) {
    return <span className={className}>00:00</span>
  }
  return (
    <time dateTime={`P${Math.round(seconds)}S`} className={className}>
      {format(seconds)}
    </time>
  )
}

function format(seconds: any) {
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = pad(date.getUTCSeconds())
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`
  }
  return `${mm}:${ss}`
}

function pad(string: any) {
  return ('0' + string).slice(-2)
}
