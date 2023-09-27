export interface Email {
  email: string
}

export interface ResetPasswordCode {
  resetPasswordCode: string
}

export interface ResetForgottenPassword {
  resetPasswordCode: string
  newPassword: string
}

export interface ProfileParams {
  firstName: string
  lastName: string
  email: string
  //avatar:
  about: string
  gender: string
  phone: string
  country: boolean
  //role
}
