import { CourseDetails } from '../services/coursesApi/types'

export const getFileUrl = (id: string) =>
  `${import.meta.env.VITE_SERVER_FILES_URL}${id}`

export const getFormattedPrice = (price: number) => `$${price.toFixed(2)}`

export function removeKeys<T>(input: T, keysToRemove: (keyof T)[]): Partial<T> {
  return Object.keys(input as object).reduce((result, key) => {
    if (!keysToRemove.includes(key as keyof T)) {
      result[key as keyof T] = input[key as keyof T]
    }
    return result
  }, {} as Partial<T>)
}

export function sortCoursesByTitle(
  courses: CourseDetails[],
  option: 'asc' | 'desc' | '',
): CourseDetails[] {
  const sortedCourses = [...courses]

  sortedCourses.sort((a, b) => {
    const nameA = a.title.toLowerCase()
    const nameB = b.title.toLowerCase()

    if (option === 'asc') {
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    } else if (option === 'desc') {
      if (nameA > nameB) {
        return -1
      }
      if (nameA < nameB) {
        return 1
      }
      return 0
    } else {
      return 0
    }
  })
  return sortedCourses
}
