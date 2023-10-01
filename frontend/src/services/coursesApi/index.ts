import axiosClient from '../axiosClient'
import type { ResponseData } from '../types'

const PREFIX = 'courses/'

const coursesApi = {
  getCourseDetails: async (coursesId: string) => {
    try {
      const res: ResponseData = await axiosClient.get(`${PREFIX}${coursesId}`)
      return res
    } catch (error) {
      console.error('Error get course details:', error)
      throw error
    }
  },
  getCourses: async () => {
    try {
      const res: ResponseData = await axiosClient.get(`${PREFIX}`)
      return res
    } catch (error) {
      console.error('Error get courses:', error)
      throw error
    }
  },
}

export default coursesApi
