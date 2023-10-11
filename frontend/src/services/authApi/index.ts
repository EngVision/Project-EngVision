import axiosClient from '../axiosClient'
import type { ResponseData } from '../types'

import type { SignInParams, SignUpParams } from './types'

const PREFIX = 'auth/'

const authApi = {
  fetchAuthUser: async () => {
    if (!localStorage.getItem('locales')) localStorage.setItem('locales', 'en')
    if (!localStorage.getItem('darkMode'))
      localStorage.setItem('darkMode', false.toString())
    const res: ResponseData = await axiosClient.get(`${PREFIX}me`)
    return res
  },
  signIn: async (data: SignInParams) => {
    const res: ResponseData = await axiosClient.post(`${PREFIX}login`, data)
    return res
  },
  signInWithGoogle: async () => {
    const res: ResponseData = await axiosClient.get(`${PREFIX}google/login`)
    return res
  },
  signUp: async (data: SignUpParams) => {
    const res: ResponseData = await axiosClient.post(`${PREFIX}register`, data)
    return res
  },
  logout: async () => {
    const res: ResponseData = await axiosClient.post(`${PREFIX}logout`)
    return res
  },
}

export default authApi
