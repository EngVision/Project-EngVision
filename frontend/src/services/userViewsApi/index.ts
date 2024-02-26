import axiosClient from '../axiosClient'
import { UserView } from './type'

const PREFIX = 'user-views'

const userViewsApi = {
  view: async (targetId: string): Promise<UserView> => {
    const res = await axiosClient.post(`${PREFIX}`, { targetId })
    return res?.data?.data
  },

  getUserViews: async (): Promise<UserView[]> => {
    const res = await axiosClient.get(`${PREFIX}`)
    return res?.data?.data
  },
}

export default userViewsApi
