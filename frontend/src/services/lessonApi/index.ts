import axiosClient from '../axiosClient'
import { LessonType } from './type'

const PREFIX = 'courses/lessons/'

export const lessonApi = {
  getLesson: async (id: string): Promise<LessonType> => {
    const res = await axiosClient.get(`${PREFIX}${id}`)
    return res.data
  },
}
