import axiosClient from '../axiosClient'
import { ResponseData } from '../types'

import type { GradePayload, SubmissionResponse } from './types'
import { getQueryParamsUrl } from '../../utils/common'
import { GetSubmissionProps } from '../coursesApi/types'
const PREFIX = 'submissions'

const submissionApi = {
  getSubmissionList: async (
    query: GetSubmissionProps | null,
  ): Promise<ResponseData<SubmissionResponse[]>> => {
    const res = await axiosClient.get(`${PREFIX}${getQueryParamsUrl(query)}`)
    return res.data
  },

  getSubmissionByExercise: async (id: string): Promise<SubmissionResponse> => {
    const res = await axiosClient.get(`${PREFIX}/exercise/${id}`)
    return res.data.data
  },

  getSubmissionById: async (id: string): Promise<SubmissionResponse> => {
    const res = await axiosClient.get(`${PREFIX}/${id}`)
    return res.data.data
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
    return res.data.data
  },
}

export default submissionApi
