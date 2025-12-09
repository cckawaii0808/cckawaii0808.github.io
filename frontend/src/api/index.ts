import axios from 'axios'
import type { Portfolio, Profile, Skill, ApiResponse } from '@/types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
})

// 作品集 API
export const portfolioApi = {
  getAll: () => api.get<ApiResponse<Portfolio[]>>('/portfolios'),
  getById: (id: string) => api.get<ApiResponse<Portfolio>>(`/portfolios/${id}`),
  getFeatured: () => api.get<ApiResponse<Portfolio[]>>('/portfolios/featured'),
}

// 個人資料 API
export const profileApi = {
  get: () => api.get<ApiResponse<Profile>>('/profile'),
}

// 技能 API
export const skillApi = {
  getAll: () => api.get<ApiResponse<Skill[]>>('/skills'),
}

export default api
