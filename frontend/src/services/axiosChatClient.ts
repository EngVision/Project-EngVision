import axios from 'axios'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_CHAT_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosClient
