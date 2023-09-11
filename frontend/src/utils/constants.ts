import facebookIcon from '../assets/images/facebook.png'
import googleIcon from '../assets/images/google.png'

export const ROUTES = {
  UpdateProfile: '/update-profile',
  courses: '/courses',
  docList: '/doclist',
  home: '/',
  settings: '/settings',
  signIn: '/sign-in',
  signUp: '/sign-up',
  statistics: '/statistics',
}

export const SIGN_IN_VENDORS = [
  {
    icon: googleIcon,
    name: 'Google',
  },
  {
    icon: facebookIcon,
    name: 'Facebook',
  },
]

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
