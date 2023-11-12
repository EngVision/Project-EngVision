import axiosClient from '../axiosClient'
import { ResponseData } from '../types'
import { ExamDetail, ExamParams, Entrance } from './type'

const PREFIX = 'exams'

export const examApi = {
  getExam: async () => {
    const res: ResponseData = await axiosClient.get(PREFIX)
    return res.data
  },

  getExamById: async (id: string): Promise<ExamDetail> => {
    const res = await axiosClient.get(`${PREFIX}/${id}`)
    return res.data.data
  },

  getEntranceExam: async (level: string): Promise<Entrance> => {
    const res = await axiosClient.get(`${PREFIX}/entrance-exam?level=${level}`)
    return res.data.data
  },

  createExam: async (data: ExamParams): Promise<ExamParams> => {
    const res = await axiosClient.post(PREFIX, data)
    return res.data.data
  },

  postPartForExam: async (
    id: string,
    data: string[],
  ): Promise<ResponseData<ExamParams>> => {
    const res = await axiosClient.post(`${PREFIX}/${id}`, data)
    return res.data.data
  },

  updateExam: async (
    id: string,
    data: ExamParams,
  ): Promise<ResponseData<ExamParams>> => {
    const res = await axiosClient.patch(`${PREFIX}/${id}`, data)
    return res.data.data
  },

  deletePartForExam: async (
    id: string,
    partId: string,
  ): Promise<ResponseData<ExamParams>> => {
    const res = await axiosClient.delete(`${PREFIX}/${id}/parts/${partId}`)
    return res.data.data
  },

  deleteExam: async (id: string): Promise<ResponseData<unknown>> => {
    const res = await axiosClient.delete(`${PREFIX}/${id}`)
    return res.data
  },
}
