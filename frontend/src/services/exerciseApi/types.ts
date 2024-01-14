import type {
  CEFRLevel,
  ExerciseMatchType,
  ExerciseTag,
  ExerciseType,
} from '../../utils/constants'
import { Dayjs } from 'dayjs'

export interface QuestionPayload {
  id?: string
  tags: ExerciseTag[]
  level: CEFRLevel
  question: any
  correctAnswer?: any
}

export interface ExerciseSchema {
  type: ExerciseType
  title: string
  description?: string
  deadline?: Dayjs
  tags?: ExerciseTag[]
  level?: CEFRLevel
  content: QuestionPayload[]
  id?: string
  needGrade?: boolean
  contentQuestion?: {
    text: string
    image: string
    audio: string
  }
}

export interface SubmitAnswerResponse {
  question: string
  isCorrect: boolean
  answer: any
  correctAnswer: any
  explanation: string
  grade: number
  teacherCorrection?: string
}

export interface MatchPairSchema {
  type: ExerciseMatchType
  content: string
}

export interface DragAndDropAnswer {
  image: string
  text: string
}
