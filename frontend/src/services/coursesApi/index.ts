import axiosClient from '../axiosClient'

import type { CourseParams } from './types'

const PREFIX = 'courses/'

const coursesApi = {
  getCourses: async () => {
    try {
      const res = await axiosClient.get(`${PREFIX}`)
      const data: CourseParams[] = res.data
      return data
    } catch (error) {
      console.error('Error get courses:', error)
      throw error
    }
  },
  getCourseDetails: async (coursesId: string) => {
    const res = await axiosClient.get(`${PREFIX}${coursesId}`)
    return res
  },
}

export default coursesApi
