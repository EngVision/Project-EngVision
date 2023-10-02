import axiosClient from '../axiosClient'
import type { ResponseData, ReviewParams } from '../types'

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
  postReview: async (courseId: string, data: ReviewParams) => {
    try {
      const res = await axiosClient.post(`${PREFIX}${courseId}/review`, data)
      return res
    } catch (error) {
      console.error('Error post review:', error)
      throw error
    }
  },
}

export default coursesApi
