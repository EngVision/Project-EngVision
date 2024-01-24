import axiosClient from '../axiosChatClient'
import sha256 from 'crypto-js/sha256'

import type { ResponseData } from '../types'

const PREFIX = 'api/v1/'

const chatApi = {
  register: async (
    username: string,
    name: string,
    pass: string,
    email: string,
  ): Promise<ResponseData> => {
    try {
      const res: ResponseData = await axiosClient.post(
        `${PREFIX}users.register`,
        {
          username,
          name,
          pass,
          email,
        },
      )
      return res.data
    } catch (error) {
      console.error('Error post file details:', error)
      throw error
    }
  },

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

  getRoom: async (userId: string, authToken: string): Promise<ResponseData> => {
    try {
      const res: ResponseData = await axiosClient.get(`${PREFIX}rooms.get`, {
        headers: {
          'X-User-Id': userId,
          'X-Auth-Token': authToken,
        },
      })
      return res.data
    } catch (error) {
      console.error('Error post file details:', error)
      throw error
    }
  },

  getDirectMessage: async (
    userId: string,
    authToken: string,
    username: string,
  ): Promise<ResponseData> => {
    try {
      const res: ResponseData = await axiosClient.get(
        `${PREFIX}im.messages?username=${username}`,
        {
          headers: {
            'X-User-Id': userId,
            'X-Auth-Token': authToken,
          },
        },
      )
      return res.data
    } catch (error) {
      console.error('Error post file details:', error)
      throw error
    }
  },
}

export default chatApi
