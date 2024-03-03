import sha256 from 'crypto-js/sha256'
import axiosClient from '../axiosChatClient'
import type { SendMessageParams } from './types'

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

  login: async (user: string, password: string): Promise<ResponseData> => {
    try {
      const res: ResponseData = await axiosClient.post(`${PREFIX}login`, {
        user: user,
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

  getIn4Room: async (
    userId: string,
    authToken: string,
    roomId: string,
  ): Promise<ResponseData> => {
    try {
      const res: ResponseData = await axiosClient.get(
        `${PREFIX}rooms.info?roomId=${roomId}`,
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

  sendMessage: async (
    userId: string,
    authToken: string,
    messageParams: SendMessageParams,
  ): Promise<ResponseData> => {
    try {
      const res = await axiosClient.post(
        `${PREFIX}method.call/sendMessage`,
        {
          message: JSON.stringify({
            msg: 'method',
            id: '0',
            method: 'sendMessage',
            params: [messageParams],
          }),
        },
        {
          headers: {
            'X-User-Id': userId,
            'X-Auth-Token': authToken,
          },
        },
      )

      // You can return the relevant data from the response if needed
      return res.data
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  },

  getName: async (
    userId: string,
    authToken: string,
    userName: string,
  ): Promise<ResponseData> => {
    try {
      const res: ResponseData = await axiosClient.get(
        `${PREFIX}users.info?username=${userName}`,
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

  getUser: async (userId: string, authToken: string): Promise<ResponseData> => {
    try {
      const res: ResponseData = await axiosClient.get(
        `${PREFIX}users.info?userId=${userId}&fields={"userRooms": 1}`,
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

  getMessage: async (userId: string, authToken: string, messageId: string) => {
    try {
      const res: ResponseData = await axiosClient.get(
        `${PREFIX}chat.getMessage?msgId=${messageId}`,
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

  createIm: async (userId: string, authToken: string, username: string) => {
    try {
      const res = await axiosClient.post(
        `${PREFIX}im.create`,
        {
          username,
        },
        {
          headers: {
            'X-User-Id': userId,
            'X-Auth-Token': authToken,
          },
        },
      )

      return res.data
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  },
}

export default chatApi
