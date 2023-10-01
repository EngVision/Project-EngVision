import axiosClient from '../axiosClient'

import type { AssignmentResponse } from './types'

const PREFIX = 'assignments'

const assignmentApi = {
  getAssignment: async (exerciseId: string): Promise<AssignmentResponse> => {
    const res = await axiosClient.get(`${PREFIX}/${exerciseId}`)

    return res.data.data
  },
}

export default assignmentApi
