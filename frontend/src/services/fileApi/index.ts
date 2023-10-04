import axiosClient from '../axiosClient'

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
}

export default fileApi
