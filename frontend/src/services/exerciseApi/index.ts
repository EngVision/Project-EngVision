import axiosClient from '../axiosClient'

import type { SubmitAnswerResponse, ExerciseResponse } from './types'

const PREFIX = 'exercises'

const exerciseApi = {
  getExercise: async (id: string): Promise<ExerciseResponse> => {
    const res = await axiosClient.get(`${PREFIX}/${id}`)

    return res.data.data
  },

  submitAnswer: async (
    exerciseId: string,
    questionId: string,
    data: any,
  ): Promise<SubmitAnswerResponse> => {
    const res = await axiosClient.post(
      `${PREFIX}/${exerciseId}/check-answer/${questionId}`,
      data,
    )

    return res.data.data
  },
}

export default exerciseApi
