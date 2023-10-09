import axios from 'axios'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  withCredentials: true,
})

const setupAxiosInterceptor = () => {
  axiosClient.interceptors.response.use(
    (response) => response.data,
    async (error) => {
      const refreshToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('refresh_token='))
        ?.split('=')[1]

      console.log(error)

      if (error.response?.status !== 401 || !refreshToken) {
        return Promise.reject(error.response)
      }

      try {
        await axiosClient.get('/auth/refresh')
        error.response.config.transformResponse = (response: any) => {
          const res = JSON.parse(response)
          return res.data
        }
        return axios(error.response.config)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    },
  )
}

setupAxiosInterceptor()

export default axiosClient
