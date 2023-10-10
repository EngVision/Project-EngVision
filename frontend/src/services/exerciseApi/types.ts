import type {
  CEFRLevel,
  ExerciseTag,
  ExerciseType,
} from '../../utils/constants'

export interface QuestionPayload {
  id?: string
  tags: ExerciseTag[]
  level: CEFRLevel
  question: any
  correctAnswer: any
}

export interface ExerciseSchema {
  type: ExerciseType
  title: string
  description?: string
  deadline?: Date
  tags?: ExerciseTag[]
  level?: CEFRLevel
  content: QuestionPayload[]
  id?: string
}

export interface SubmitAnswerResponse {
  question: string
  isCorrect: boolean
  answer: any
  correctAnswer: any
  explanation: string
}
