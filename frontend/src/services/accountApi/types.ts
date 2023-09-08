export interface Email {
  email: string,
}

export interface ResetPasswordCode {
  resetPasswordCode: string,
}

export interface ResetForgottenPassword {
  resetPasswordCode: string,
  newPassword: string,
}