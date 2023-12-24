import axiosClient from '../axiosClient'

import type { ICheckListApi } from './types'
const checkListApi = {
  getCheckListItems: async (): Promise<ICheckListApi> => {
    const url = `/checklist`
    const res = await axiosClient.get(url)
    return res.data
  },
}

export default checkListApi
