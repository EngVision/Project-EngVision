import axiosClient from '../axiosClient'
import { ResponseData } from '../types'

const PREFIX = 'courses/lessons/'

export const lessonApi = {
  getLesson: async (id: string) => {
    const res: ResponseData = await axiosClient.get(`${PREFIX}${id}`)
    return res
  },
}
