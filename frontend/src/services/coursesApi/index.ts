import axiosClient from '../axiosClient'

const PREFIX = 'courses/'

const coursesApi = {
  getCourseDetails: async (coursesId: string) => {
    const res = await axiosClient.get(`${PREFIX}${coursesId}`)
    return res
  },
}

export default coursesApi
