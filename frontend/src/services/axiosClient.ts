import axios from 'axios'
import { cleanObject } from '../utils/common'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  withCredentials: true,
})

const setupAxiosInterceptor = () => {
  axiosClient.interceptors.request.use((config) => {
    config.data = cleanObject(config.data)

    return config
  })

  const interceptor = axiosClient.interceptors.response.use(
    (response) => response.data,
    async (error) => {
      const refreshToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('refresh_token='))
        ?.split('=')[1]

      if (error.response?.status !== 401 || !refreshToken) {
        return Promise.reject(error.response)
      }

      axiosClient.interceptors.response.eject(interceptor)

      try {
        await axiosClient.get('/auth/refresh')
        error.response.config.transformResponse = (response: any) => {
          const res = JSON.parse(response)
          return res.data
        }
        return axios(error.response.config)
      } catch (refreshError) {
        console.error(refreshError)
        return Promise.reject(refreshError)
      } finally {
        setupAxiosInterceptor()
      }
    },
  )
}

setupAxiosInterceptor()

export default axiosClient
