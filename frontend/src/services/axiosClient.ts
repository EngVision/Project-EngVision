import axios from 'axios'
import { setUser } from '../redux/app/slice'
import { store } from '../store'
import { cleanObject } from '../utils/common'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  withCredentials: true,
})

let refreshingFunction: any = null

const setupAxiosInterceptor = () => {
  axiosClient.interceptors.request.use((config) => {
    if (!(config.data instanceof FormData)) {
      config.data = cleanObject(config.data)
    }

    return config
  })

  const interceptor = axiosClient.interceptors.response.use(
    (response) => response.data,
    async (error) => {
      if (error.response?.status !== 401) {
        return Promise.reject(error.response)
      }

      axiosClient.interceptors.response.eject(interceptor)

      try {
        if (!refreshingFunction) {
          refreshingFunction = axiosClient.get('/auth/refresh')
        }

        error.response.config.transformResponse = (response: any) => {
          const res = JSON.parse(response)
          return res.data
        }

        return axios(error.response.config)
      } catch (refreshError) {
        console.error(refreshError)
        store.dispatch(setUser(null))
        return Promise.reject(refreshError)
      } finally {
        // eslint-disable-next-line require-atomic-updates
        refreshingFunction = null
        setupAxiosInterceptor()
      }
    },
  )
}

setupAxiosInterceptor()

export default axiosClient
