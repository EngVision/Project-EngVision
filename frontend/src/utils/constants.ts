export const PUBLIC_ROUTES = {
  // Auth
  signIn: '/sign-in',
  signUp: '/sign-up',
  signUpTeacher: '/sign-up/teacher',
  ssoSuccess: '/sso-success',
  createProfile: '/create-profile',
  resetForgotPassword: '/reset-password/:resetPasswordCode',
  sendMailResetPassword: '/forgot-password',
}

export const PRIVATE_ROUTES = {
  // Menu
  home: '/',
  statistic: '/statistic',
  chat: '/chat',
  manageUsers: '/manage-users',
  settings: '/settings',
  helpCenter: '/help-center',

  updateProfile: '/update-profile',

  // Exercise
  exercise: '/exercise/:id',
  createExercise: '/manage-exercise',
  editExercise: '/manage-exercise/:id',

  // lesson
  makeSentence: '/lesson/make-sentence',
  multipleChoice: '/lesson/multiple-choice',
}

export const STUDENT_ROUTES = {
  // Menu
  myHub: '/my-hub',
  exercisesAndExams: '/exercises-exams',
  discover: '/discover',

  appearance: '/appearance',

  courses: '/discover',
  courseDetails: '/discover/:courseId',
}

export const TEACHER_ROUTES = {
  // Menu
  courses: '/courses',
  courseDetail: '/courses/:courseId',
  createCourse: '/courses/new',

  assignmentExam: '/assignment-exam',

  lessonDetail: '/courses/:courseId/lessons/:lessonId',
  createExercise: '/courses/:courseId/lessons/:lessonId/exercises',
  editExercise: '/courses/:courseId/lessons/:lessonId/exercises/:exerciseId',
}

export const ADMIN_ROUTES = {
  // Menu
  courses: '/courses',
  courseDetail: '/courses/:courseId',
  createCourse: '/courses/new',
  manageUsers: '/manage-users',

  assignmentExam: '/assignment-exam',
}

export const ROLES = {
  admin: {
    label: 'Admin',
    value: 'Admin',
  },
  student: {
    label: 'Student',
    value: 'Student',
  },
  teacher: {
    label: 'Teacher',
    value: 'Teacher',
  },
}

export enum ExerciseType {
  MultipleChoice = 'MultipleChoice',
  FillBlank = 'FillBlank',
  ConstructedResponse = 'ConstructedResponse',
}

export enum ExerciseTag {
  Grammar = 'Grammar',
  Vocabulary = 'Vocabulary',
  ListeningComprehension = 'ListeningComprehension',

  Pronunciation = 'Pronunciation',
  Fluency = 'Fluency',

  Skimming = 'Skimming',
  Scanning = 'Scanning',
  ReadingComprehension = 'ReadingComprehension',

  Organization = 'Organization',
  Coherence = 'Coherence',
  Conciseness = 'Conciseness',
}

export enum CEFRLevel {
  C2 = 'C2',
  C1 = 'C1',
  B2 = 'B2',
  B1 = 'B1',
  A2 = 'A2',
  A1 = 'A1',
}

export const LEVELS = [
  { level: CEFRLevel.A1, color: 'bg-alternative' },
  { level: CEFRLevel.A2, color: 'bg-alternative' },
  { level: CEFRLevel.B1, color: 'bg-primary' },
  { level: CEFRLevel.B2, color: 'bg-primary' },
  { level: CEFRLevel.C1, color: 'bg-secondary' },
  { level: CEFRLevel.C2, color: 'bg-secondary' },
]

export const GENDERS = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
]

export const SEARCH_OPTIONS = {
  homework: 'Homeworks',
  course: 'Courses',
}

export const BASE_URL = import.meta.env.VITE_BASE_URL
export const UPLOAD_FILE_URL = `${BASE_URL}/files`
export const GOOGLE_LOGIN = `${BASE_URL}auth/google/login`
export const FACEBOOK_LOGIN = `${BASE_URL}auth/facebook/login`

export enum COURSE_STATUS {
  draft = 'Draft',
  published = 'Published',
  all = 'All',
  attended = 'Attended',
}

export const TEACHER_COURSE_TABS = {
  overview: 'Overview',
  course: 'Courses',
  statistic: 'Statistic',
}

export enum Role {
  Student = 'Student',
  Teacher = 'Teacher',
  Admin = 'Admin',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}
