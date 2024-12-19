import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL as string

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiClient
