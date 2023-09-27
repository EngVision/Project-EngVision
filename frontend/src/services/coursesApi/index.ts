import axiosClient from '../axiosClient'

import type { CourseParams } from './types'

const PREFIX = 'courses/'

const coursesApi = {
  getCourseDetails: async (coursesId: string) => {
    try {
      const res = await axiosClient.get(`${PREFIX}${coursesId}`)
      return res.data
    } catch (error) {
      console.error('Error get course details:', error)
      throw error
    }
  },
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
}

export default coursesApi
