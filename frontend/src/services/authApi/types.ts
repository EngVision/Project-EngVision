import { AccountStatus, Gender, Role } from '../../utils/constants'

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
  certificates?: string
  school?: string
  accepted: boolean
}

export interface IUser {
  about: string | null
  avatar: string
  country: string
  email: string
  firstLogin: boolean
  firstName: string
  gender: Gender
  id: string
  lastName: string
  phone: string | null
  role: Role
  createdAt: Date
  updatedAt: Date
  status: AccountStatus
}
