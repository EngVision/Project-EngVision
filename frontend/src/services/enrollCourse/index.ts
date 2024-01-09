import axiosClient from '../axiosClient'

const PREFIX = 'enroll-course'

const enrollCourseApi = {
  enroll: async (courseId: string) => {
    const res = await axiosClient.post(`${PREFIX}`, { courseId })
    return res?.data?.data
  },
}

export default enrollCourseApi
