import axios from 'axios'
import { cleanObject } from '../utils/common'

const axiosChatClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_CHAT_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': 'http://localhost:3000/',
  },
  withCredentials: true,
})

const setupAxiosInterceptor = () => {
  axiosChatClient.interceptors.request.use((config) => {
    if (!(config.data instanceof FormData)) {
      config.data = cleanObject(config.data)
    }

    return config
  })

  const interceptor = axiosChatClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status !== 401) {
        return Promise.reject(error.response)
      }

      axiosChatClient.interceptors.response.eject(interceptor)
    },
  )
}

setupAxiosInterceptor()

export default axiosChatClient
