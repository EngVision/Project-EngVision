export interface SignInParams {
  email: string
  password: string
}

export interface SignUpParams {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  role: string
  accepted: boolean
}
