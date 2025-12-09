<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const password = ref('')
const showPassword = ref(false)

async function handleLogin() {
  const success = await authStore.login(password.value)
  if (success) {
    router.push('/admin')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4">
          <Icon icon="mdi:shield-account" class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900">後台管理登入</h1>
      </div>

      <!-- 登入表單 -->
      <form @submit.prevent="handleLogin" class="bg-white rounded-xl shadow-sm p-6 sm:p-8">
        <!-- 錯誤訊息 -->
        <div
          v-if="authStore.error"
          class="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm"
        >
          {{ authStore.error }}
        </div>

        <!-- 密碼輸入 -->
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            管理員密碼
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
              placeholder="請輸入密碼"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <Icon :icon="showPassword ? 'mdi:eye-off' : 'mdi:eye'" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- 登入按鈕 -->
        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="authStore.loading" class="flex items-center justify-center">
            <Icon icon="mdi:loading" class="w-5 h-5 animate-spin mr-2" />
            登入中...
          </span>
          <span v-else>登入</span>
        </button>

        <!-- 返回連結 -->
        <div class="mt-6 text-center">
          <router-link to="/" class="text-sm text-gray-500 hover:text-blue-600 transition-colors">
            返回首頁
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
