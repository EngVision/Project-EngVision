import { File } from '../coursesApi/types'
import { ExerciseSchema } from '../exerciseApi/types'

export interface LessonType {
  id: string
  title: string
  exercises: ExerciseSchema[]
  materials: File[]
}

export interface AddLessonRequest {
  courseId: string
  sectionId: string
  lessons: {
    title: string
    exercises: string[]
    materials: string[]
  }[]
}

export interface CourseLessonResponse {
  id: string
  title: string
  sections: {
    id: string
    title: string
    lessons: {
      id: string
      title: string
      exercises: string[]
      materials: string[]
    }[]
  }[]
}
