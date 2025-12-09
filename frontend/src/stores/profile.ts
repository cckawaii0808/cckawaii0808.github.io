import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Profile } from '@/types'
import { profileApi } from '@/api'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<Profile | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProfile() {
    loading.value = true
    error.value = null
    try {
      const { data } = await profileApi.get()
      if (data.success && data.data) {
        profile.value = data.data
      }
    } catch (e) {
      error.value = '無法載入個人資料'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return {
    profile,
    loading,
    error,
    fetchProfile,
  }
})
