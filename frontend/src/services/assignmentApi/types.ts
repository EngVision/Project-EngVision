import type { ExerciseType } from '../../utils/constants'
import type { SubmitAnswerResponse } from '../exerciseApi/types'

export interface AssignmentResponse {
  id: string
  exercise: string
  user: string
  detail: SubmitAnswerResponse[]
  exerciseType: ExerciseType
  totalCorrect: number
  totalQuestion: number
  totalDone: number
  progress: number
  createdAt: Date
  updatedAt: Date
}
