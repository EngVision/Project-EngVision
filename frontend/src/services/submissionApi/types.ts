import type { ExerciseType } from '../../utils/constants'
import type { SubmitAnswerResponse } from '../exerciseApi/types'

export interface SubmissionResponse {
  id: string
  course: {
    id: string
    title: string
  }
  section: {
    id: string
    title: string
  }
  lesson: {
    id: string
    title: string
  }
  exercise: {
    id: string
    title: string
  }
  user: {
    id: string
    firstName: string
    lastName: string
    avatar: string
  }
  detail: SubmitAnswerResponse[]
  exerciseType: ExerciseType
  totalCorrect: number
  totalQuestion: number
  totalDone: number
  progress: number
  grade: number
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface GradePayload {
  grade?: number
  explanation?: string
}
