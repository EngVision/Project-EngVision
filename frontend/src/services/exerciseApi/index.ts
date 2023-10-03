import { CEFRLevel, ExerciseTag, ExerciseType } from '../../utils/constants'
import axiosClient from '../axiosClient'

import type { SubmitAnswerResponse, ExerciseResponse } from './types'

const PREFIX = 'exercises'

interface ExercisePayload {
  type: ExerciseType
  title: string
  description?: string
  deadline?: Date
  tags?: ExerciseTag[]
  level?: CEFRLevel
  content: any[]
}

const exerciseApi = {
  createExercise: async (data: ExercisePayload): Promise<ExerciseResponse> => {
    const res = await axiosClient.post(`${PREFIX}`, data)

    return res.data
  },

  getExercise: async (id: string): Promise<ExerciseResponse> => {
    const res = await axiosClient.get(`${PREFIX}/${id}`)

    return res.data
  },

  submitAnswer: async (
    exerciseId: string,
    questionId: string,
    data: any,
  ): Promise<SubmitAnswerResponse> => {
    const res = await axiosClient.post(
      `${PREFIX}/${exerciseId}/submit-answer/${questionId}`,
      data,
    )

    return res.data
  },
}

export default exerciseApi
