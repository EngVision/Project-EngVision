import axiosClient from '../axiosClient'
import { CheckPaidResponse, Payment } from './type'

const PREFIX = 'payments'

const paymentsApi = {
  create: async (courseId: string): Promise<Payment> => {
    const res = await axiosClient.post(`${PREFIX}`, { courseId })
    return res?.data?.data
  },

  checkPaid: async (courseId: string): Promise<CheckPaidResponse> => {
    const res = await axiosClient.post(`${PREFIX}/check-paid`, { courseId })
    return res?.data?.data
  },
}

export default paymentsApi
