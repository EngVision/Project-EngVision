import axios from 'axios'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  withCredentials: true,
})

const createAxiosResponseInterceptor = () => {
  const interceptor = axiosClient.interceptors.response.use(
    (response) => response.data,
    async (error) => {
      const refreshToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('refresh_token='))
        ?.split('=')[1]

      if (error.response?.status !== 401 || !refreshToken) {
        return Promise.reject(error)
      }

      axiosClient.interceptors.response.eject(interceptor)

      try {
        await axiosClient.get('/auth/refresh')
        return axios(error.response.config)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      } finally {
        createAxiosResponseInterceptor()
      }
    },
  )
}

createAxiosResponseInterceptor()

export default axiosClient
