import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(password: string) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.post('/auth/login', { password })
      if (data.success && data.data?.token) {
        token.value = data.data.token
        localStorage.setItem('token', data.data.token)
        api.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`
        return true
      }
      return false
    } catch (e: any) {
      error.value = e.response?.data?.error || '登入失敗'
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    token.value = null
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
  }

  // 初始化時設定 token
  if (token.value) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  }

  return {
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
  }
})
