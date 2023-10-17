import { CourseState } from '../redux/course/slice'
import { CourseDetails } from '../services/coursesApi/types'
import _ from 'lodash'

export const getFileUrl = (id: string) =>
  `${import.meta.env.VITE_SERVER_FILES_URL}${id}`

export const getFormattedPrice = (price: number) =>
  price || price === 0 ? `$${price.toFixed(2)}` : '$0'

export function removeKeys<T>(input: T, keysToRemove: (keyof T)[]): Partial<T> {
  return Object.keys(input as object).reduce((result, key) => {
    if (!keysToRemove.includes(key as keyof T)) {
      result[key as keyof T] = input[key as keyof T]
    }
    return result
  }, {} as Partial<T>)
}

export function sortCourses(
  courses: CourseDetails[],
  option: { sortBy: string; order: 'asc' | 'desc' | '' },
): CourseDetails[] {
  const sortedCourses = [...courses]

  sortedCourses.sort((a, b) => {
    if (option.sortBy === 'time') {
      return 0
    } else if (option.sortBy === 'price') {
      if (option.order === 'asc') {
        return a.price - b.price
      } else if (option.order === 'desc') {
        return b.price - a.price
      } else {
        return 0
      }
    } else if (option.sortBy === 'title') {
      const nameA = a.title.toLowerCase()
      const nameB = b.title.toLowerCase()

      if (option.order === 'asc') {
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      } else if (option.order === 'desc') {
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
    }
    return 0
  })
  return sortedCourses
}

export function filterCourses(
  courses: CourseDetails[],
  option: CourseState['filterOptions'],
): CourseDetails[] {
  let filteredCourses = [...courses]

  if (option.searchValue) {
    filteredCourses = filteredCourses.filter((course) =>
      course.title.toLowerCase().includes(option.searchValue.toLowerCase()),
    )
  }
  if (option.selectedLevels.length > 0) {
    filteredCourses = filteredCourses.filter((course) =>
      option.selectedLevels.includes(course.level),
    )
  }

  return filteredCourses
}

export function getFormattedDate(inputDate: string): string {
  const date = new Date(inputDate)
  const day: string = String(date.getDate()).padStart(2, '0')
  const month: string = String(date.getMonth() + 1).padStart(2, '0')
  const year: number = date.getFullYear()

  return `${day}/${month}/${year}`
}
