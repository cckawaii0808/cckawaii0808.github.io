import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Portfolio } from '@/types'
import { portfolioApi } from '@/api'

export const usePortfolioStore = defineStore('portfolio', () => {
  const portfolios = ref<Portfolio[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPortfolios() {
    loading.value = true
    error.value = null
    try {
      const { data } = await portfolioApi.getAll()
      if (data.success && data.data) {
        portfolios.value = data.data
      }
    } catch (e) {
      error.value = '無法載入作品集'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return {
    portfolios,
    loading,
    error,
    fetchPortfolios,
  }
})
