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
  exam: '/exam',
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
}

export const ADMIN_ROUTES = {
  // Menu
  courses: '/courses',
  courseDetail: '/courses/:courseId',
  createCourse: '/courses/new',

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

export const Level = [
  { level: CEFRLevel.A1, color: 'bg-green-300' },
  { level: CEFRLevel.A2, color: 'bg-green-500' },
  { level: CEFRLevel.B1, color: 'bg-blue-300' },
  { level: CEFRLevel.B2, color: 'bg-blue-500' },
  { level: CEFRLevel.C1, color: 'bg-red-300' },
  { level: CEFRLevel.C2, color: 'bg-red-500' },
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

export const UPLOAD_FILE_URL = `${import.meta.env.VITE_BASE_URL}/files`

export const COURSE_STATUS = {
  draft: 'Draft',
  published: 'Published',
  all: 'All',
  attended: 'Attended',
}

export const TEACHER_COURSE_TABS = {
  overview: 'Overview',
  course: 'Courses',
  statistic: 'Statistic',
}
