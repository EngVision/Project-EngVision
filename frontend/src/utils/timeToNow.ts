import { differenceInMilliseconds } from 'date-fns'

export default function timeToNow(date: Date): string {
  const now = new Date()
  const millisecondsSinceDate = differenceInMilliseconds(now, date)

  const secondsSinceDate = millisecondsSinceDate / 1000
  const minutesSinceDate = secondsSinceDate / 60
  const hoursSinceDate = minutesSinceDate / 60
  const daysSinceDate = hoursSinceDate / 24
  const monthsSinceDate = daysSinceDate / 30

  if (monthsSinceDate >= 1) {
    return `${date.toLocaleDateString()}`
  } else if (daysSinceDate >= 1) {
    return `${Math.round(daysSinceDate)} days ago`
  } else if (hoursSinceDate >= 1) {
    return `${Math.round(hoursSinceDate)} hours ago`
  } else if (minutesSinceDate >= 1) {
    return `${Math.round(minutesSinceDate)} minutes ago`
  } else {
    return `${Math.round(secondsSinceDate)} seconds ago`
  }
}
