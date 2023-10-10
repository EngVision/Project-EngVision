import axiosClient from '../axiosClient'

import type {
  ExercisePayload,
  ExerciseResponse,
  SubmitAnswerResponse,
} from './types'

const PREFIX = 'exercises'

const exerciseApi = {
  createExercise: async (data: ExercisePayload): Promise<ExerciseResponse> => {
    const res = await axiosClient.post(`${PREFIX}`, data)

    return res.data
  },

  updateExercise: async (
    id: string,
    data: ExercisePayload,
  ): Promise<ExerciseResponse> => {
    const res = await axiosClient.patch(`${PREFIX}/${id}`, data)

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
