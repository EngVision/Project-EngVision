import { getQueryParamsUrl } from '../../utils/common'
import axiosClient from '../axiosClient'
import type { ResponseData } from '../types'
import { CourseDetails, type GetCourseProps, type ReviewParams } from './types'

const PREFIX = 'courses/'

const coursesApi = {
  getCourseDetails: async (coursesId: string): Promise<CourseDetails> => {
    const res = await axiosClient.get(`${PREFIX}${coursesId}`)
    return res.data.data
  },

  getCourses: async (
    query: GetCourseProps,
  ): Promise<ResponseData<CourseDetails[]>> => {
    const res = await axiosClient.get(`${PREFIX}${getQueryParamsUrl(query)}`)
    return res.data
  },

  getCoursesExercises: async (): Promise<ResponseData<CourseDetails[]>> => {
    const res = await axiosClient.get(`${PREFIX}exercises`)
    return res.data
  },

  getSuggestedCourses: async (): Promise<ResponseData<CourseDetails[]>> => {
    const res = await axiosClient.get(`${PREFIX}suggested-courses`)
    return res.data
  },

  create: async (
    data: Omit<CourseDetails, 'id'>,
  ): Promise<ResponseData<CourseDetails>> => {
    const res = await axiosClient.post(PREFIX, data)
    return res.data
  },

  update: async (
    id: string,
    data: CourseDetails,
  ): Promise<ResponseData<CourseDetails>> => {
    const res = await axiosClient.patch(`${PREFIX}${id}`, data)
    return res.data
  },

  publish: async (id: string): Promise<ResponseData<unknown>> => {
    const res = await axiosClient.post(`${PREFIX}${id}/publish`)
    return res.data
  },

  delete: async (id: string): Promise<ResponseData<unknown>> => {
    const res = await axiosClient.delete(`${PREFIX}${id}`)
    return res.data
  },

  postReview: async (
    courseId: string,
    data: ReviewParams,
  ): Promise<ResponseData<unknown>> => {
    const res = await axiosClient.post(`${PREFIX}${courseId}/review`, data)
    return res.data
  },

  postAttend: async (courseId: string): Promise<ResponseData<unknown>> => {
    const res = await axiosClient.post(`${PREFIX}${courseId}/attend`)
    return res.data
  },

  addExercise: async (
    lessonId: string,
    exerciseId: string,
  ): Promise<ResponseData<CourseDetails>> => {
    const res = await axiosClient.post(
      `${PREFIX}lessons/${lessonId}/exercises`,
      { exerciseId },
    )
    return res.data
  },

  removeExercise: async (
    lessonId: string,
    exerciseId: string,
  ): Promise<ResponseData<unknown>> => {
    const res = await axiosClient.delete(
      `${PREFIX}lessons/${lessonId}/exercises/${exerciseId}`,
    )
    return res.data
  },
}

export default coursesApi
