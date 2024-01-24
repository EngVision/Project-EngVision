import axiosClient from '../axiosChatClient'
import sha256 from 'crypto-js/sha256'

import type { ResponseData } from '../types'

const PREFIX = 'api/v1/'

const chatApi = {
  login: async (username: string, password: string): Promise<ResponseData> => {
    try {
      const res: ResponseData = await axiosClient.post(`${PREFIX}login`, {
        username,
        password: {
          digest: sha256(password).toString(),
          algorithm: 'sha-256',
        },
      })
      return res.data
    } catch (error) {
      console.error('Error post file details:', error)
      throw error
    }
  },
}

export default chatApi
