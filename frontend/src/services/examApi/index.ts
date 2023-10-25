import axiosClient from '../axiosClient'
import { ResponseData } from '../types'
import { ExamParams } from './type'

const PREFIX = 'exams'

export const examApi = {
  getExam: async () => {
    const res: ResponseData = await axiosClient.get(`${PREFIX}`)
    return res
  },

  getExamById: async (id: string): Promise<ResponseData<ExamParams>> => {
    const res = await axiosClient.get(`${PREFIX}/${id}`)
    return res.data
  },

  createExam: async (data: ExamParams): Promise<ExamParams> => {
    const res = await axiosClient.post(`${PREFIX}`, data)
    return res.data
  },

  updateExam: async (
    id: string,
    data: ExamParams,
  ): Promise<ResponseData<ExamParams>> =>
    axiosClient.patch(`${PREFIX}/${id}`, data),

  deleteExam: async (id: string): Promise<ResponseData<unknown>> =>
    axiosClient.delete(`${PREFIX}/${id}`),
}
