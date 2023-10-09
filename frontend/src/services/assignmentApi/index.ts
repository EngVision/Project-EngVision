import axiosClient from '../axiosClient'

import type { AssignmentResponse } from './types'

const PREFIX = 'assignments'

const assignmentApi = {
  getAssignments: async (): Promise<AssignmentResponse[]> => {
    const res = await axiosClient.get(`${PREFIX}`)
    return res.data
  },
  getAssignment: async (exerciseId: string): Promise<AssignmentResponse> => {
    const res = await axiosClient.get(`${PREFIX}/${exerciseId}`)

    return res.data
  },
}

export default assignmentApi
