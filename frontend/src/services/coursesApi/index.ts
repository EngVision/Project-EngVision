import axiosClient from '../axiosClient'
import type { ResponseData } from '../types'
import type { GetCourseProps, ReviewParams } from './types'

const PREFIX = 'courses/'

const coursesApi = {
  // Course
  getCourseDetails: async (coursesId: string) => {
    try {
      const res: ResponseData = await axiosClient.get(`${PREFIX}${coursesId}`)
      return res
    } catch (error) {
      console.error('Error get course details:', error)
      throw error
    }
  },
  getCourses: async ({ status }: GetCourseProps) => {
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
  create: async (data: any) => {
    try {
      const res: ResponseData = await axiosClient.post(PREFIX, data)
      return res
    } catch (error) {
      console.error('Error create course:', error)
      throw error
    }
  },
  update: async (id: string, data: any) => {
    try {
      const res: ResponseData = await axiosClient.patch(`${PREFIX}${id}`, data)
      return res
    } catch (error) {
      console.error('Error update course:', error)
      throw error
    }
  },
  publish: async (id: string) => {
    try {
      const res: ResponseData = await axiosClient.post(`${PREFIX}${id}/publish`)
      return res
    } catch (error) {
      console.error('Error publish course:', error)
      throw error
    }
  },
  delete: async (id: string) => {
    try {
      const res: ResponseData = await axiosClient.delete(`${PREFIX}${id}`)
      return res
    } catch (error) {
      console.error('Error delete course:', error)
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
  addExercise: async (lessonId: string, exerciseId: string) => {
    try {
      const res = await axiosClient.post(
        `${PREFIX}lessons/${lessonId}/exercises`,
        {
          exerciseId,
        },
      )
      return res
    } catch (error) {
      console.error('Error post attend:', error)
      throw error
    }
  },
  removeExercise: async (lessonId: string, exerciseId: string) => {
    try {
      const res = await axiosClient.delete(
        `${PREFIX}lessons/${lessonId}/exercises${exerciseId}`,
      )
      return res
    } catch (error) {
      console.error('Error post attend:', error)
      throw error
    }
  },
  getCoursesExercisesDue: async () => {
    try {
      const res = await axiosClient.get(`${PREFIX}exercises-due`)
      return res
    } catch (error) {
      console.error('Error get courses:', error)
      throw error
    }
  },
}

export default coursesApi
