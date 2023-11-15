import { ExerciseSchema } from '../exerciseApi/types'

export interface LessonType {
  id: string
  title: string
  exercises: ExerciseSchema[]
}
