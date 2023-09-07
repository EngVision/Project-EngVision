import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:5001/api/',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  withCredentials: true,
})

export default axiosClient
