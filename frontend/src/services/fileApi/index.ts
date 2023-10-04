import axiosClient from '../axiosClient'
import type { ResponseData } from '../types'

const PREFIX = 'files/'

const fileApi = {
  postFile: async (file: any) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await axiosClient.post(`${PREFIX}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return res
    } catch (error) {
      console.error('Error post file details:', error)
      throw error
    }
  },
  uploadImage: async (data: any) => {
    const res: ResponseData = await axiosClient.post(PREFIX, data)
    return res
  },
}

export default fileApi
