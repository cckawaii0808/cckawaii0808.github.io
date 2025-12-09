<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { storeToRefs } from 'pinia'

const profileStore = useProfileStore()
const { profile, loading } = storeToRefs(profileStore)

onMounted(() => {
  profileStore.fetchProfile()
})
</script>

<template>
  <!-- Hero Section - 手機優先設計 -->
  <section class="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 sm:py-16 lg:py-20">
    <div class="text-center max-w-3xl mx-auto">
      <!-- 頭像 -->
      <div class="mb-6 sm:mb-8">
        <div class="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
          <div class="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <img
              v-if="profile?.avatarUrl"
              :src="profile.avatarUrl"
              :alt="profile.name"
              class="w-full h-full object-cover"
            />
            <Icon v-else icon="mdi:account" class="w-16 h-16 sm:w-20 sm:h-20 text-gray-400" />
          </div>
        </div>
      </div>

      <!-- 名稱與標題 -->
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
        {{ profile?.name || '歡迎來到我的作品集' }}
      </h1>
      <p class="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8">
        {{ profile?.title || '全端開發者' }}
      </p>

      <!-- 簡介 -->
      <p class="text-base sm:text-lg text-gray-500 mb-8 sm:mb-10 leading-relaxed px-4">
        {{ profile?.bio || '熱愛技術，專注於創造優質的使用者體驗' }}
      </p>

      <!-- CTA 按鈕 -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center px-4">
        <router-link
          to="/portfolio"
          class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Icon icon="mdi:folder-open" class="mr-2 h-5 w-5" />
          查看作品集
        </router-link>
        <router-link
          to="/about"
          class="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
        >
          <Icon icon="mdi:account-circle" class="mr-2 h-5 w-5" />
          關於我
        </router-link>
      </div>
    </div>
  </section>

  <!-- 特色區塊 -->
  <section class="py-12 sm:py-16 lg:py-20 bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10 sm:mb-12">
        我的專長
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <!-- 前端開發 -->
        <div class="p-6 bg-gray-50 rounded-xl text-center">
          <div class="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <Icon icon="mdi:application-brackets" class="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
          </div>
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2">前端開發</h3>
          <p class="text-gray-600 text-sm sm:text-base">
            Vue.js、React、TypeScript
          </p>
        </div>

        <!-- 後端開發 -->
        <div class="p-6 bg-gray-50 rounded-xl text-center">
          <div class="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <Icon icon="mdi:server" class="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
          </div>
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2">後端開發</h3>
          <p class="text-gray-600 text-sm sm:text-base">
            Node.js、Express、PostgreSQL
          </p>
        </div>

        <!-- UI/UX 設計 -->
        <div class="p-6 bg-gray-50 rounded-xl text-center sm:col-span-2 lg:col-span-1">
          <div class="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
            <Icon icon="mdi:palette" class="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />
          </div>
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2">UI/UX 設計</h3>
          <p class="text-gray-600 text-sm sm:text-base">
            響應式設計、使用者體驗
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
