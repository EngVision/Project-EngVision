import axiosClient from '../axiosClient'
import { CEFRLevel } from '../../utils/constants'
import { IUserLevel } from './type'

const PREFIX = 'user-level'

const userLevelApi = {
  createUserLevel: async (data: { level: CEFRLevel }): Promise<IUserLevel> => {
    const res = await axiosClient.post(`${PREFIX}`, data)
    return res?.data?.data
  },

  getUserLevel: async (): Promise<IUserLevel | null> => {
    const res = await axiosClient.get(`${PREFIX}`)
    return res?.data?.data
  },
}

export default userLevelApi
