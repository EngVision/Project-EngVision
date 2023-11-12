import axiosClient from '../axiosClient'
import { SubmitAnswerResponse } from '../exerciseApi/types'
import { ExamSubmissionResponse, ExamSubmitAnswer } from './type'

const PREFIX = 'http://localhost:5000/api/exam-submissions'

export const examSubmissionApi = {
  submitAnswer: async (
    examId: string,
    data: ExamSubmitAnswer,
  ): Promise<SubmitAnswerResponse> => {
    const res = await axiosClient.post(
      `${PREFIX}/${examId}/submit-answer/`,
      data,
    )
    return res.data.data
  },

  getExamSubmissionByExamId: async (
    examId: string,
  ): Promise<ExamSubmissionResponse> => {
    const res = await axiosClient.get(`${PREFIX}/exams/${examId}`)
    return res.data.data
  },
}
