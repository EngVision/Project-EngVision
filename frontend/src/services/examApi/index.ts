import axiosClient from '../axiosClient'
import { ResponseData } from '../types'

const PREFIX = 'exams/'

export const examApi = {
  getExam: async () => {
    const res: ResponseData = await axiosClient.get(`${PREFIX}`)
    return res
  },
}
