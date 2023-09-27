export interface SignInParams {
  email: string
  password: string
}

export interface SignUpParams {
  firstName: string
  lastName: string
  email?: string
  gender?: string
  avatar?: string
  password?: string
  confirmPassword: string
  phoneNumber: string
  role: string
  certificate?: string
  school?: string
  accepted: boolean
}
