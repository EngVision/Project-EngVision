import axiosClient from '../axiosClient'

import type { ExerciseSchema, SubmitAnswerResponse } from './types'

const PREFIX = 'exercises'

const exerciseApi = {
  createExercise: async (data: ExerciseSchema): Promise<ExerciseSchema> => {
    const res = await axiosClient.post(PREFIX, data)
    return res.data.data
  },

  updateExercise: async (
    id: string,
    data: ExerciseSchema,
  ): Promise<ExerciseSchema> => {
    const res = await axiosClient.patch(`${PREFIX}/${id}`, data)
    return res.data.data
  },

  getExercise: async (id: string): Promise<ExerciseSchema> => {
    const res = await axiosClient.get(`${PREFIX}/${id}`)
    return res.data.data
  },

  getAllExercise: async (): Promise<ExerciseSchema[]> => {
    const res = await axiosClient.get(PREFIX)
    return res.data.data
  },

  deleteExercise: async (id: string): Promise<ExerciseSchema> => {
    const res = await axiosClient.delete(`${PREFIX}/${id}`)
    return res.data.data
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
    return res.data.data
  },
}

export default exerciseApi
