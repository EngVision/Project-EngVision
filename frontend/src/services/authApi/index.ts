import axiosClient from '../axiosClient'
import type { ResponseData } from '../types'

import type { IUser, SignInParams, SignUpParams } from './types'

const PREFIX = 'auth/'

const authApi = {
  fetchAuthUser: async (): Promise<IUser> => {
    const res: ResponseData = await axiosClient.get(`${PREFIX}me`)
    return res.data.data
  },
  signIn: async (data: SignInParams) => {
    const res: ResponseData = await axiosClient.post(`${PREFIX}login`, data)
    return res.data
  },
  signInWithGoogle: async () => {
    const res: ResponseData = await axiosClient.get(`${PREFIX}google/login`)
    return res.data
  },
  signUp: async (data: SignUpParams) => {
    const res: ResponseData = await axiosClient.post(`${PREFIX}register`, data)
    return res.data
  },
  logout: async () => {
    const res: ResponseData = await axiosClient.post(`${PREFIX}logout`)
    return res.data
  },
}

export default authApi
