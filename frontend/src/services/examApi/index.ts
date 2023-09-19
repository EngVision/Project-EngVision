import axiosClient from '../axiosClient'

import type { ExamParams } from './types'

const PREFIX = 'multiplechoices/'

const examApi = {
  fetchExam: async () => {
    try {
      const res = await axiosClient.get(`${PREFIX}`)
      return res
    } catch (error) {
      console.error('Error fetch exam:', error)
      throw error
    }
  },
}

export default examApi
