import { File } from '../coursesApi/types'
import { ExerciseSchema } from '../exerciseApi/types'

export interface LessonType {
  id: string
  title: string
  exercises: ExerciseSchema[]
  materials: File[]
}
