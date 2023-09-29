export const ROUTES = {
  UpdateProfile: '/update-profile',
  courses: '/courses',
  courseDetails: '/courses/:courseId',
  coursesTeacher: '/teacher/courses',
  docList: '/doclist',
  home: '/',
  settings: '/settings',
  helpCenter: '/help-center',
  signIn: '/sign-in',
  signUp: '/sign-up',
  sendMailResetPassword: '/forgot-password',
  resetForgotPassword: '/reset-password/:resetPasswordCode',
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
