export const ROUTES = {
  // Menu
  home: '/',
  myHub: '/my-hub',
  exam: '/exam',
  discover: '/discover',
  statistic: '/statistic',
  chat: '/chat',
  settings: '/settings',
  helpCenter: '/help-center',

  // Auth
  signIn: '/sign-in',
  signUp: '/sign-up',
  sendMailResetPassword: '/forgot-password',
  resetForgotPassword: '/reset-password/:resetPasswordCode',
  signUpTeacher: '/sign-up/teacher',
  ssoSuccess: '/sso-success',
  createProfile: '/create-profile',
  updateProfile: '/update-profile',

  search: '/search',

  // lesson
  makeSentence: '/lesson/make-sentence',

  courses: '/courses',
  courseDetails: '/courses/:courseId',
  coursesTeacher: '/teacher/courses',
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
