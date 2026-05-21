import axios from "axios"
import { getToken } from "./auth.service"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// interceptor — adiciona o token em TODOS os requests automaticamente
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api