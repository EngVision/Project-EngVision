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

export interface ExercisePayload {
  type: ExerciseType
  title: string
  description?: string
  deadline?: Date
  tags?: ExerciseTag[]
  level?: CEFRLevel
  content: QuestionPayload[]
}

export interface Question {
  id: string
  question: any
  tags: ExerciseTag[]
  level: CEFRLevel
}

export interface ExerciseResponse {
  title: string
  description: string
  tags: ExerciseTag[]
  level: CEFRLevel
  type: ExerciseType
  content: Question[]
}

export interface SubmitAnswerResponse {
  question: string
  isCorrect: boolean
  answer: any
  correctAnswer: any
  explanation: string
}
