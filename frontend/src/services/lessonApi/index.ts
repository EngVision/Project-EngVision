import axiosClient from '../axiosClient'
import { AddLessonRequest, CourseLessonResponse, LessonType } from './type'

const PREFIX = 'courses/lessons/'

const COURSE_LESSON_PREFIX = 'lessons/'

export const lessonApi = {
  getLesson: async (id: string): Promise<LessonType> => {
    const res = await axiosClient.get(`${PREFIX}${id}`)
    return res.data.data
  },

  getAllLesson: async (): Promise<CourseLessonResponse[]> => {
    const res = await axiosClient.get(`${COURSE_LESSON_PREFIX}`)
    return res.data.data
  },

  addLesson: async (data: AddLessonRequest): Promise<CourseLessonResponse> => {
    const res = await axiosClient.post(`${COURSE_LESSON_PREFIX}`, data)
    return res.data.data
  },

  importLesson: async (
    courseId: string,
    sectionId: string,
    lesson: any,
  ): Promise<any> => {
    const res = await axiosClient.post(
      `${COURSE_LESSON_PREFIX}import/${courseId}/${sectionId}`,
      lesson,
    )

    return res.data.data
  },
}
