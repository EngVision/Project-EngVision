// import {
//   RegisterChatParams,
//   LoginChatParams,
//   GetRoomData,
//   GetDirectMessageData,
// } from './types'

// const PREFIX = 'http://localhost:5001/api/v1/'

// const chatApi = {
//   fetchWithJsonBody: async (url: string, method: string, body: object) => {
//     try {
//       console.log('url', url)
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//       })
//       console.log('response', response.json())
//       return response.json()
//     } catch (error) {
//       console.error('Error during HTTP request:', error)
//       throw error
//     }
//   },

//   registerUser: async (data: RegisterChatParams) => {
//     try {
//       const res = await chatApi.fetchWithJsonBody(
//         `${PREFIX}users.register`,
//         'POST',
//         data,
//       )
//       console.log('res', res)
//       return res.data
//     } catch (error) {
//       console.error('Error during user registration:', error)
//       throw error
//     }
//   },

//   loginUser: async (data: LoginChatParams) => {
//     try {
//       console.log('data', data)
//       const res = await chatApi.fetchWithJsonBody(
//         `${PREFIX}login`,
//         'POST',
//         data,
//       )
//       console.log('res', res)
//       console.log('Request Headers:', res.headers)
//       return res.data
//     } catch (error) {
//       console.error('Error during user login:', error)
//       throw error
//     }
//   },

//   getRoom: async (data: GetRoomData) => {
//     try {
//       const res = await chatApi.fetchWithJsonBody(`${PREFIX}rooms.get`, 'GET', {
//         headers: {
//           'X-User-Id': data.headers['X-User-Id'],
//           'X-Auth-Token': data.headers['X-Auth-Token'],
//         },
//       })

//       if (!res.ok) {
//         throw new Error(`Request failed with status ${res.status}`)
//       }

//       return res.json()
//     } catch (error) {
//       console.error('Error getting room data:', error)
//       throw error
//     }
//   },

//   getDirectMessage: async (data: GetDirectMessageData) => {
//     try {
//       const res = await chatApi.fetchWithJsonBody(
//         `${PREFIX}im.messages?username=${data.params.username}`,
//         'GET',
//         {
//           headers: {
//             'X-User-Id': data.headers['X-User-Id'],
//             'X-Auth-Token': data.headers['X-Auth-Token'],
//           },
//         },
//       )

//       if (!res.ok) {
//         throw new Error(`Request failed with status ${res.status}`)
//       }

//       return res.json()
//     } catch (error) {
//       console.error('Error getting direct message data:', error)
//       throw error
//     }
//   },

//   checkEmailExists: async (data: RegisterChatParams) => {
//     try {
//       const res = await chatApi.fetchWithJsonBody(
//         `${PREFIX}users.register`,
//         'POST',
//         data,
//       )
//       return res.success === false && res.error === 'Email is already in use'
//     } catch (error) {
//       console.error('Error checking if email exists:', error)
//       return false
//     }
//   },
// }

// export default chatApi

import axiosChatClient from '../axiosChatClient'
import { ResponseData } from '../types'

const PREFIX = 'login'

export const chatApi = {
  login: async (data: any): Promise<ResponseData> => {
    const res = await axiosChatClient.post(PREFIX, data)
    return res.data
  },
}
