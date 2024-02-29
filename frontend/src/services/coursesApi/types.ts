import {
  COURSE_STATUS,
  ExerciseType,
  MaterialTypes,
} from '../../utils/constants'

export interface CourseParams {
  id: string
  title: string
  teacher: {
    id: string
    firstName: string
    lastName: string
    email: string
    avatar: string
    gender: string
  }
  about: string
  introVideo: string
  thumbnail: string
  price: number
  level: string
  avgStar: number
  attendance: number
  totalLessons: number
}

export interface User {
  firstName: string
  lastName: string
  email: string
  avatar?: string
}

export interface Review {
  id: string
  user: User
  courseId: string
  star: number
  comment: string
  updatedAt: string
}
export interface Exercise {
  id: string
  title: string
  type: ExerciseType
  completed: boolean
}
export interface Lesson {
  id: string
  title: string
  exercises: Exercise[]
  materials: File[]
  completed: boolean
  totalExerciseCompleted: number
}

export interface Section {
  id: string
  title: string
  lessons: Lesson[]
  completed: boolean
  totalLessonCompleted: number
}

export interface File {
  id: string
  filename: string
  originalName: string
  mimetype: string
  url: string
  size: string
  userId: string
}

export interface MaterialFile {
  id: string
  file: File
  note: string
  createdAt: string
  updatedAt: string
}

export interface MaterialLink {
  id: string
  url: string
  note: string
  createdAt: string
  updatedAt: string
}

export interface Material {
  id: string
  url?: string
  file?: File
  note: string
  createdAt: string
  updatedAt: string
}

export interface Materials {
  images: Material[]
  pdfFiles: Material[]
  audios: Material[]
  videos: Material[]
}

export interface AddMaterial {
  fileId?: string
  url?: string
  note: string
  type: MaterialTypes
}

export interface UpdateMaterial extends Partial<AddMaterial> {
  id: string
}

export interface CourseDetails {
  id: string
  title: string
  teacher: {
    id: string
    firstName: string
    lastName: string
    fullName: string
    email: string
    avatar: string
    gender: string
  }
  about: string
  introVideo: string
  thumbnail: string
  price: number
  level: string
  sections: Section[]
  posts: string[]
  reviews: Review[]
  avgStar: number
  isAttended: boolean
  isReviewed: boolean
  attendance: number
  isPublished: boolean
  tags: string[]
  totalLessons: number
  submissionAmount: number
  pendingSubmissionAmount: number
  exercises?: Exercise[]
  materials: Materials
  createdAt: string
  updatedAt: string
  progress: number
}

export interface ReviewParams {
  star: number
  comment: string
}

export interface GetCourseProps {
  sortBy?: string
  order?: string
  page?: number
  limit?: number
  status: COURSE_STATUS
  levels?: string
  keyword?: string
  priceMin?: number
  priceMax?: number
}
