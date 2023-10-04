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
}
export interface Lesson {
  id: string
  title: string
  exercises: string[]
}
export interface Section {
  id: string
  title: string
  lessons: Lesson[]
}
export interface CourseDetails {
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
  sections: Section[]
  posts: string[]
  reviews: Review[]
  avgStar: number
  updatedAt: string
  isAttended: boolean
}
export interface ReviewParams {
  star: number
  comment: string
}
