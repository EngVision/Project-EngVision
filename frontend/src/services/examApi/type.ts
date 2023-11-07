import { CEFRLevel, ExerciseTag } from '../../utils/constants'

export interface ExamParams {
  id?: string
  title: string
  description: string
  course?: string
  teacher?: string
  level: CEFRLevel
  tag?: ExerciseTag[]
  parts: string[]
  createdAt?: string
}
