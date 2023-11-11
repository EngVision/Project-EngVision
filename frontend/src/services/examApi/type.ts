import { CEFRLevel, ExerciseTag } from '../../utils/constants'
import { ExerciseSchema } from '../exerciseApi/types'

export interface ExamParams {
  id?: string
  title: string
  description: string
  course?: string
  teacher?: string
  level: CEFRLevel
  tag: ExerciseTag[]
  parts: ExerciseSchema[]
}

export interface Entrance {
  id: string
  title: string
  description: string
  course: string
  teacher: string
  level: CEFRLevel
  tag: ExerciseTag[]
  parts: string[]
  createdAt?: string
}

export interface Part {
  id: string
  title: string
  description: string
}

export interface ExamDetail extends Omit<ExamParams, 'parts'> {
  parts: Part[]
}
