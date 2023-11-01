import axiosClient from '../axiosClient'
import { ResponseData } from '../types'

import type { GradePayload, SubmissionResponse } from './types'

const PREFIX = 'submissions'

const submissionApi = {
  getSubmissionList: async (): Promise<ResponseData<SubmissionResponse[]>> =>
    axiosClient.get(`${PREFIX}`),

  // idSubmission for teacher, id exercise for student get
  getSubmission: async (id: string): Promise<SubmissionResponse> => {
    const res = await axiosClient.get(`${PREFIX}/${id}`)

    return res.data
  },

  gradeSubmission: async (
    submissionId: string,
    questionId: string,
    data: GradePayload,
  ): Promise<SubmissionResponse> => {
    const res = await axiosClient.post(
      `${PREFIX}/${submissionId}/grade/${questionId}`,
      data,
    )

    return res.data
  },
}

export default submissionApi
