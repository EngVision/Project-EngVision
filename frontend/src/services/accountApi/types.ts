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
  firstName?: string
  lastName?: string
  email?: string
  avatar?: string
  certificates?: string
  about?: string
  gender?: string
  phone?: string
  country?: string
  role?: string
  oldPassword?: string
  password?: string
  retypePassword?: string
}

export interface ChangePassword {
  oldPassword?: string
  password?: string
}
