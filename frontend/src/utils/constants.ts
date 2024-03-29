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
  home: '/home',
  statistic: '/statistic',
  chat: '/chat',
  settings: '/settings',
  helpCenter: '/help-center',
  updateProfile: '/update-profile',
  manageUsers: '/manage-users',

  // Exercise
  exercise: '/exercise/:id',
  createExercise: '/manage-exercise',
  editExercise: '/manage-exercise/:id',

  // lesson
  makeSentence: '/lesson/make-sentence',
  multipleChoice: '/lesson/multiple-choice',
}

export const STUDENT_ROUTES = {
  //Get started
  getStarted: '/get-started',
  doEntranceExam: '/get-started/exercise/:id',
  entranceExam: '/get-started/:level',

  // Menu
  myHub: '/my-hub',
  exercisesAndExams: '/exercises-exams',
  discover: '/discover',
  achievement: '/achievement',
  appearance: '/appearance',

  courses: '/discover',
  courseDetails: '/discover/:courseId',
}

export const STUDENT_ROUTES_MOBILE = {
  // Menu
  myHub: '/m/my-hub',
  discover: '/m/discover',
  achievement: '/m/achievement',
  courses: '/m/discover',
  courseDetails: '/m/discover/:courseId',
}

export const TEACHER_ROUTES = {
  // Menu
  courses: '/courses',
  courseDetail: '/courses/:courseId',
  createCourse: '/courses/new',

  assignmentExam: '/assignment-exam',
  grading: '/grading',
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

  exams: '/exams',
  grading: '/grading',
  examDetail: '/exams/:examId',
  createExam: '/exams/new',
  partDetail: './parts',
  createPart: './parts',
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
  MakeSentence = 'MakeSentence',
  Unscramble = 'Unscramble',
  Speaking = 'Speaking',
  Match = 'Match',
  DragAndDrop = 'DragAndDrop',
  WordSearch = 'WordSearch',
}

export const MobileAvailableExerciseTypes = [
  ExerciseType.MultipleChoice,
  ExerciseType.FillBlank,
  ExerciseType.ConstructedResponse,
  ExerciseType.MakeSentence,
  ExerciseType.Speaking,
]

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
  Any = 'Any',
}

export const LEVELS = [
  { level: CEFRLevel.A1, color: 'bg-alternative' },
  { level: CEFRLevel.A2, color: 'bg-alternative' },
  { level: CEFRLevel.B1, color: 'bg-primary' },
  { level: CEFRLevel.B2, color: 'bg-primary' },
  { level: CEFRLevel.C1, color: 'bg-secondary' },
  { level: CEFRLevel.C2, color: 'bg-secondary' },
  { level: CEFRLevel.Any, color: 'bg-blue-400' },
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
export const UPLOAD_FILE_URL = import.meta.env.VITE_SERVER_FILES_URL
export const GOOGLE_LOGIN = `${BASE_URL}auth/google/login`
export const FACEBOOK_LOGIN = `${BASE_URL}auth/facebook/login`
export const FACEBOOK_PAGE_ID = 116589884880948
export const FACEBOOK_APP_ID = 575211114649130

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

export enum NextDue {
  none = 'None',
  tomorrow = 'Tomorrow',
  today = 'Today',
  in1week = 'In 1 week',
  in2weeks = 'In 2 weeks',
  in1month = 'In 1 month',
}

export enum AccountStatus {
  Active = 'Active',
  Pending = 'Pending',
  Blocked = 'Blocked',
}

export enum SortByEnum {
  createdAt = 'createdAt',
  price = 'price',
}

export enum ExerciseCardType {
  Text = 'text',
  Image = 'image',
}

export enum MaterialTypes {
  Image = 'Image',
  Pdf = 'Pdf',
  Audio = 'Audio',
  Link = 'Link',
  None = 'None',
}

export enum ExerciseMatchType {
  Text = 'Text',
  Image = 'Image',
}

export const STUDENT_GET_STARTED_VIDEO_URL =
  'https://www.youtube.com/embed/ZIccuK7kSZw?si=i92mMWjOyEH1qjly'
export const TEACHER_GET_STARTED_VIDEO_URL =
  'https://www.youtube.com/embed/BrmLUSJsKQU?si=m4YgMTgyMLGWdm7V'
export const FACEBOOK_SOCIAL_URL = 'https://www.facebook.com/engvision.dev'
export const YOUTUBE_SOCIAL_URL = 'https://www.youtube.com/@engvisionofficial'

export const LINE_COLOR = [
  '#f87171',
  '#a3e635',
  '#22d3ee',
  '#818cf8',
  '#e879f9',
  '#34d399',
  '#c084fc',
  '#db2777',
  '#ca8a04',
  '#78716c',
]
