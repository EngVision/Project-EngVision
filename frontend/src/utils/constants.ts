export const ROUTES = {
  UpdateProfile: '/update-profile',
  courses: '/courses',
  courseDetails: '/courses/:courseId',
  coursesTeacher: '/teacher/courses',
  docList: '/doclist',
  exercise: '/exercise/:id',
  home: '/',
  resetForgotPassword: '/reset-password/:resetPasswordCode',
  sendMailResetPassword: '/forgot-password',
  settings: '/settings',
  helpCenter: '/help-center',
  signIn: '/sign-in',
  signUp: '/sign-up',
  signUpTeacher: '/sign-up/teacher',
  ssoSuccess: '/sso-success',
  statistic: '/statistic',
  createProfile: '/create-profile',
  search: '/search',
  myHub: '/my-hub',
  exam: '/exam',
  discover: '/discover',
  chat: '/chat',

  // lesson
  makeSentence: '/lesson/make-sentence',
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
