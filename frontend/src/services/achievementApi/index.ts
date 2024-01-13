import axiosClient from '../axiosClient'
import { Achievement } from './types'

const PREFIX = 'achievements/'

export const achievementApi = {
  get: async (): Promise<Achievement> => {
    const res = await axiosClient.get(`${PREFIX}`)
    return res.data.data
  },
}
