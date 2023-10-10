import axiosClient from '../axiosClient'
import type { ResponseData } from '../types'

import type {
  Email,
  ResetForgottenPassword,
  ResetPasswordCode,
  ProfileParams,
  ChangePassword,
} from './types'

const PREFIX = 'account/'

const accountApi = {
  sendMailForgotPassword: async (data: Email) => {
    const res: ResponseData = await axiosClient.post(
      `${PREFIX}forgot-password`,
      data,
    )
    return res
  },
  validateUrlResetPassword: async (data: ResetPasswordCode) => {
    const res: ResponseData = await axiosClient.post(
      `${PREFIX}validate-reset-password-code`,
      data,
    )
    return res
  },
  resetForgotPassword: async (data: ResetForgottenPassword) => {
    const res: ResponseData = await axiosClient.post(
      `${PREFIX}reset-password`,
      data,
    )
    return res
  },

  update: async (data: ProfileParams) => {
    try {
      const res: ResponseData = await axiosClient.patch(
        `${PREFIX}profile`,
        data,
      )
      return res
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  },

  updateWhenSignUp: async (data: any) => {
    const res: ResponseData = await axiosClient.post(PREFIX, data)
    return res
  },

  changePassword: async (data: ChangePassword) => {
    const res: ResponseData = await axiosClient.put(`${PREFIX}password`, data)
    return res
  },
}

export default accountApi
