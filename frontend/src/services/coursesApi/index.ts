import { getQueryParamsUrl } from '../../utils/common'
import axiosClient from '../axiosClient'
import type { ResponseData } from '../types'
import {
  CourseDetails,
  CourseExercisesDue,
  type GetCourseProps,
  type ReviewParams,
} from './types'

const PREFIX = 'courses/'

const coursesApi = {
  getCourseDetails: async (coursesId: string): Promise<CourseDetails> => {
    const res = await axiosClient.get(`${PREFIX}${coursesId}`)
    return res.data
  },

  getCourses: async (
    query: GetCourseProps,
  ): Promise<ResponseData<CourseDetails[]>> =>
    axiosClient.get(`${PREFIX}${getQueryParamsUrl(query)}`),

  create: async (
    data: Omit<CourseDetails, 'id'>,
  ): Promise<ResponseData<CourseDetails>> => axiosClient.post(PREFIX, data),

  update: async (
    id: string,
    data: CourseDetails,
  ): Promise<ResponseData<CourseDetails>> =>
    axiosClient.patch(`${PREFIX}${id}`, data),

  publish: async (id: string): Promise<ResponseData<unknown>> =>
    axiosClient.post(`${PREFIX}${id}/publish`),

  delete: async (id: string): Promise<ResponseData<unknown>> =>
    axiosClient.delete(`${PREFIX}${id}`),

  postReview: async (
    courseId: string,
    data: ReviewParams,
  ): Promise<ResponseData<unknown>> =>
    axiosClient.post(`${PREFIX}${courseId}/review`, data),

  postAttend: async (courseId: string): Promise<ResponseData<unknown>> =>
    axiosClient.post(`${PREFIX}${courseId}/attend`),

  addExercise: async (
    lessonId: string,
    exerciseId: string,
  ): Promise<ResponseData<CourseDetails>> =>
    axiosClient.post(`${PREFIX}lessons/${lessonId}/exercises`, {
      exerciseId,
    }),

  removeExercise: async (
    lessonId: string,
    exerciseId: string,
  ): Promise<ResponseData<unknown>> =>
    axiosClient.delete(`${PREFIX}lessons/${lessonId}/exercises/${exerciseId}`),

  getCoursesExercisesDue: async (): Promise<
    ResponseData<CourseExercisesDue[]>
  > => await axiosClient.get(`${PREFIX}exercises-due`),
}

export default coursesApi
