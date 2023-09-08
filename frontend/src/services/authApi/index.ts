import axiosClient from '../axiosClient'

import type { SignInParams, SignUpParams } from './types'

const PREFIX = 'auth/'

const authApi = {
  signIn: async (data: SignInParams) => {
    const res = await axiosClient.post(`${PREFIX}login`, data)
    return res
  },
  signUp: async (data: SignUpParams) => {
    const res = await axiosClient.post(`${PREFIX}register`, data)
    return res
  },
}

export default authApi
