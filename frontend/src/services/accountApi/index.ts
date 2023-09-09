import axiosClient from '../axiosClient'

import type { ProfileParams } from './types'

const PREFIX = 'account/'

const accountApi = {
  update: async (data: ProfileParams) => {
    try {
      const res = await axiosClient.patch(`${PREFIX}profile`, data)
      return res
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  },
}

export default accountApi
