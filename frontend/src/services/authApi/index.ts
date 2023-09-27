import axiosClient from '../axiosClient'

import type { SignInParams, SignUpParams } from './types'

const PREFIX = 'auth/'

const authApi = {
  fetchAuthUser: async () => {
    const res = await axiosClient.get(`${PREFIX}me`)
    return res
  },
  signIn: async (data: SignInParams) => {
    const res = await axiosClient.post(`${PREFIX}login`, data)
    return res
  },
  signInWithGoogle: async () => {
    const res = await axiosClient.get(`${PREFIX}google/login`)
    return res
  },
  signUp: async (data: SignUpParams) => {
    const res = await axiosClient.post(`${PREFIX}register`, data)
    return res
  },
  logout: async () => {
    const res = await axiosClient.post(`${PREFIX}logout`)
    return res
  },
}

export default authApi
