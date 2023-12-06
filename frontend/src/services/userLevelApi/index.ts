import axiosClient from '../axiosClient'

const PREFIX = 'user-level/'

export const lessonApi = {
  getUserLevel: async () => {
    const res = await axiosClient.get(`${PREFIX}`)
    return res.data
  },
}
