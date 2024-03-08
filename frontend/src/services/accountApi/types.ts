import { BasePaginate } from '../types'

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
  showGetStarted?: boolean
  bankName?: string
  bankNumber?: string
}

export interface ChangePassword {
  oldPassword?: string
  password?: string
}

export interface GetAccountParams extends BasePaginate {
  role?: string
  status?: string
}

export interface ReasonBlock {
  reason: string
}

export interface UserAccount {
  id: string
  name?: string
  firstName: string
  lastName?: string
  email?: string
  avatar?: string
  certificates?: string[]
  about?: string
  gender?: string
  phone?: string
  country?: string
  role?: string
  isApproved?: boolean
  isBlocked?: boolean
  isSSO?: boolean
  status?: string
}
