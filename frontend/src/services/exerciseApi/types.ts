import type {
  CEFRLevel,
  ExerciseTag,
  ExerciseType,
} from '../../utils/constants'

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
