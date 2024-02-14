import { BasePaginate } from './../types'
import type { ExerciseType } from '../../utils/constants'
import type { SubmitAnswerResponse } from '../exerciseApi/types'

export interface SubmissionResponse {
  id: string
  course: {
    id: string
    title: string
    thumbnail: string
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
    tags: string[]
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
  status: 'graded' | 'pending'
  createdAt: Date
  updatedAt: Date
}

export interface GradePayload {
  grade?: number
  explanation?: string
  teacherCorrection?: string
}

export interface GetSubmissionProps extends BasePaginate {
  course?: string
}
