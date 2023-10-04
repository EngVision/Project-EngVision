import axiosClient from '../axiosClient'
import type { ResponseData } from '../types'
import type { ReviewParams } from './types'

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
  getCourses: async (status: string) => {
    try {
      const res: ResponseData = await axiosClient.get(
        `${PREFIX}?status=${status}`,
      )
      return res
    } catch (error) {
      console.error('Error get courses:', error)
      throw error
    }
  },
  postReview: async (courseId: string, data: ReviewParams) => {
    try {
      const res = await axiosClient.post(`${PREFIX}${courseId}/review`, data)
      console.log('res:', data)
      return res
    } catch (error) {
      console.error('Error post review:', error)
      throw error
    }
  },
  postAttend: async (courseId: string) => {
    try {
      const res = await axiosClient.post(`${PREFIX}${courseId}/attend`)
      return res
    } catch (error) {
      console.error('Error post attend:', error)
      throw error
    }
  },
}

export default coursesApi
