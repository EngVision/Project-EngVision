import axiosClient from '../axiosClient'

import type { ICheckListApi } from './types'
const PREFIX = '/checklist'

const checkListApi = {
  getCheckListItems: async (): Promise<ICheckListApi> => {
    const res = await axiosClient.get(`${PREFIX}`)
    return res.data.data
  },

  dismiss: async (): Promise<ICheckListApi> => {
    const res = await axiosClient.post(`${PREFIX}/dismiss`)
    return res.data.data
  },
}

export default checkListApi
