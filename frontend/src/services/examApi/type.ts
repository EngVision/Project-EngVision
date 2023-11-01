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
