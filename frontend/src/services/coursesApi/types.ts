import { COURSE_STATUS } from '../../utils/constants'

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
  completed: boolean
}
export interface Lesson {
  id: string
  title: string
  exercises: Exercise[]
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
  createdAt: string
  updatedAt: string
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
  keyword?: string
  priceMin?: number
  priceMax?: number
}
