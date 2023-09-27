export interface CourseParams {
  title: string
  teacher: string
  about: string
  introVideo: string
  thumbnail: string
  price: number
  level: string
  avgStar: number
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
  sections: string[]
  posts: string[]
  reviews: Review[]
  avgStar: number
}
export interface ReviewParams {
  star: number
  comment: string
}
