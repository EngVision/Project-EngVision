import { getQueryParamsUrl } from '../../utils/common'
import axiosClient from '../axiosClient'
import type { ResponseData } from '../types'

import type {
  Email,
  ResetForgottenPassword,
  ResetPasswordCode,
  ProfileParams,
  ChangePassword,
  GetAccountParams,
  ReasonBlock,
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

  getAccount: async (data?: GetAccountParams) => {
    const res: ResponseData = await axiosClient.get(
      `${PREFIX}${getQueryParamsUrl(data)}`,
    )
    return res
  },

  approveAccount: async (id: string) => {
    const res: ResponseData = await axiosClient.post(`${PREFIX}${id}/approve`)
    return res
  },

  blockAccount: async (id: string, data: ReasonBlock) => {
    const res: ResponseData = await axiosClient.post(
      `${PREFIX}${id}/block`,
      data,
    )
    return res
  },

  unblockAccount: async (id: string) => {
    const res: ResponseData = await axiosClient.post(`${PREFIX}${id}/unblock`)
    return res
  },
}

export default accountApi
