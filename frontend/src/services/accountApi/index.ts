import axiosClient from '../axiosClient';

import type {
  Email,
  ResetForgottenPassword,
  ResetPasswordCode,
  ProfileParams,
} from './types'

const PREFIX = 'account/';

const accountApi = {
  sendMailForgotPassword: async (data: Email) => {
    const res = await axiosClient.post(`${PREFIX}forgot-password`, data);
    return res;
  },
  validateUrlResetPassword: async (data: ResetPasswordCode) => {
    const res = await axiosClient.post(
      `${PREFIX}validate-reset-password-url`,
      data,
    )
    return res;
  },
  resetForgotPassword: async (data: ResetForgottenPassword) => {
    const res = await axiosClient.post(
      `${PREFIX}reset-forgotten-password`,
      data,
    )
    return res;
  },

  update: async (data: ProfileParams) => {
    try {
      const res = await axiosClient.patch(`${PREFIX}profile`, data)
      return res
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  },
}

export default accountApi
