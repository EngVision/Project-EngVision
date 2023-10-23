import axiosClient from '../axiosClient'

import type { SubmissionResponse } from './types'

const PREFIX = 'submissions'

const submissionApi = {
  getSubmissionList: async (): Promise<SubmissionResponse[]> => {
    const res = await axiosClient.get(`${PREFIX}`)
    return res.data
  },
  getSubmission: async (exerciseId: string): Promise<SubmissionResponse> => {
    const res = await axiosClient.get(`${PREFIX}/${exerciseId}`)

    return res.data
  },
}

export default submissionApi
