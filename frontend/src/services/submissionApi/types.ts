import type { ExerciseType } from '../../utils/constants'
import type { SubmitAnswerResponse } from '../exerciseApi/types'

export interface SubmissionResponse {
  id: string
  exercise: string
  user: string
  detail: SubmitAnswerResponse[]
  exerciseType: ExerciseType
  totalCorrect: number
  totalQuestion: number
  totalDone: number
  progress: number
  grade: number
  createdAt: Date
  updatedAt: Date
}

export interface GradePayload {
  grade?: number
  explanation?: string
}
