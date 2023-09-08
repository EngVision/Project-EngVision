import axiosClient from '../axiosClient';

import type { Email, ResetForgottenPassword, ResetPasswordCode } from './types';

const PREFIX = 'account/';

const accountApi = {
  sendMailForgotPassword: async (data: Email) => {
    const res = await axiosClient.post(`${PREFIX}forgot-password`, data);
    return res;
  },
  validateUrlResetPassword: async (data: ResetPasswordCode) => {
    const res = await axiosClient.post(`${PREFIX}validate-reset-password-url`, data);
    return res;
  },
  resetForgotPassword: async (data: ResetForgottenPassword) => {
    const res = await axiosClient.post(`${PREFIX}reset-forgotten-password`, data);
    return res;
  },
}

export default accountApi