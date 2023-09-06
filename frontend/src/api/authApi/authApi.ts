import axiosClient from '../axiosClient'

import type { SignInParams } from './types'

const PREFIX = 'auth/'

const authApi = {
  signUp: async (data: SignInParams) => {
    const res = await axiosClient.post(`${PREFIX}login`, data)
    return res
  },
}

export default authApi
