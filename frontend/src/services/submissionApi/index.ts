import axiosClient from '../axiosClient'
import { ResponseData } from '../types'

import type { SubmissionResponse } from './types'

const PREFIX = 'submissions'

const submissionApi = {
  getSubmissionList: async (): Promise<ResponseData<SubmissionResponse[]>> =>
    axiosClient.get(`${PREFIX}`),

  getSubmission: async (exerciseId: string): Promise<SubmissionResponse> => {
    const res = await axiosClient.get(`${PREFIX}/${exerciseId}`)

    return res.data
  },
}

export default submissionApi
