export const ROUTES = {
  UpdateProfile: '/update-profile',
  courses: '/courses',
  courseDetails: '/courses/:courseId',
  coursesTeacher: '/teacher/courses',
  docList: '/doclist',
  home: '/',
  settings: '/settings',
  signIn: '/sign-in',
  signUp: '/sign-up',
  sendMailResetPassword: '/forgot-password',
  resetForgotPassword: '/reset-password/:resetPasswordCode',
  signUpTeacher: '/sign-up/teacher',
  ssoSuccess: '/sso-success',
  statistics: '/statistics',
  createProfile: '/create-profile',
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
