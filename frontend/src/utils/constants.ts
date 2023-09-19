export const ROUTES = {
  UpdateProfile: '/update-profile',
  courses: '/courses',
  docList: '/doclist',
  home: '/',
  settings: '/settings',
  signIn: '/sign-in',
  signUp: '/sign-up',
  sendMailResetPassword: '/forgot-password',
  resetForgotPassword: '/reset-password/:resetPasswordCode',
  ssoSuccess: '/sso-success',
  statistics: '/statistics',
  exam: '/exam',
  examEdit: '/exam-edit',
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
