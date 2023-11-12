import { RcFile } from 'antd/es/upload'
import axiosClient from '../axiosClient'
import type { ResponseData } from '../types'

const PREFIX = 'files/'

const fileApi = {
  create: async (
    file: string | RcFile | Blob,
    onProgress?: ((event: any) => void) | undefined,
  ): Promise<ResponseData> => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res: ResponseData = await axiosClient.post(PREFIX, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (event) => {
          onProgress?.({ percent: (event.loaded / (event.total ?? 1)) * 100 })
        },
      })
      return res.data
    } catch (error) {
      console.error('Error post file details:', error)
      throw error
    }
  },
  update: async (
    id: string,
    file: string | RcFile | Blob,
    onProgress?: ((event: any) => void) | undefined,
  ): Promise<ResponseData> => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res: ResponseData = await axiosClient.put(
        `${PREFIX}${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (event) => {
            onProgress?.({ percent: (event.loaded / (event.total ?? 1)) * 100 })
          },
        },
      )
      return res.data
    } catch (error) {
      console.error('Error post file details:', error)
      throw error
    }
  },
  delete: async (id: string): Promise<ResponseData> => {
    try {
      const res: ResponseData = await axiosClient.delete(`${PREFIX}${id}`)
      return res.data
    } catch (error) {
      console.error('Error post file details:', error)
      throw error
    }
  },
}

export default fileApi
