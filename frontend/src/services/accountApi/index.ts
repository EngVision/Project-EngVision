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
    return res.data
  },
  validateUrlResetPassword: async (data: ResetPasswordCode) => {
    const res: ResponseData = await axiosClient.post(
      `${PREFIX}validate-reset-password-code`,
      data,
    )
    return res.data
  },
  resetForgotPassword: async (data: ResetForgottenPassword) => {
    const res: ResponseData = await axiosClient.post(
      `${PREFIX}reset-password`,
      data,
    )
    return res.data
  },

  update: async (data: ProfileParams) => {
    const res: ResponseData = await axiosClient.patch(`${PREFIX}profile`, data)
    return res.data
  },

  updateWhenSignUp: async (data: any) => {
    const res: ResponseData = await axiosClient.post(PREFIX, data)
    return res.data
  },

  changePassword: async (data: ChangePassword) => {
    const res: ResponseData = await axiosClient.put(`${PREFIX}password`, data)
    return res.data
  },

  getAccount: async (data?: GetAccountParams) => {
    const res: ResponseData = await axiosClient.get(
      `${PREFIX}${getQueryParamsUrl(data)}`,
    )
    return res.data
  },

  approveAccount: async (id: string) => {
    const res: ResponseData = await axiosClient.post(`${PREFIX}${id}/approve`)
    return res.data
  },

  blockAccount: async (id: string, data: ReasonBlock) => {
    const res: ResponseData = await axiosClient.post(
      `${PREFIX}${id}/block`,
      data,
    )
    return res.data
  },

  unblockAccount: async (id: string) => {
    const res: ResponseData = await axiosClient.post(`${PREFIX}${id}/unblock`)
    return res.data
  },

  updateGetStarted: async (isShow: boolean) => {
    const res: ResponseData = await axiosClient.post(`${PREFIX}get-started`, {
      isShow,
    })
    return res.data
  },

  setHideGuideTour: async () => {
    const res: ResponseData = await axiosClient.post(
      `${PREFIX}tour-guide-onboarding`,
    )
    return res.data
  },
}

export default accountApi
