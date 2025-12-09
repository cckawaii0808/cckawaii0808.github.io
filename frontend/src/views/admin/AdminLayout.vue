<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isSidebarOpen = ref(false)

const navItems = [
  { name: '儀表板', path: '/admin', icon: 'mdi:view-dashboard' },
  { name: '作品集', path: '/admin/portfolios', icon: 'mdi:folder-multiple' },
  { name: '個人資料', path: '/admin/profile', icon: 'mdi:account-circle' },
  { name: '技能', path: '/admin/skills', icon: 'mdi:star' },
]

const isLoginPage = computed(() => route.name === 'admin-login')

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function closeSidebar() {
  isSidebarOpen.value = false
}

function handleLogout() {
  authStore.logout()
  router.push('/admin/login')
}

// 非登入頁且未認證時導向登入頁
watch(
  () => authStore.isAuthenticated,
  (isAuth) => {
    if (!isAuth && !isLoginPage.value) {
      router.push('/admin/login')
    }
  },
  { immediate: true }
)
</script>

<template>
  <!-- 登入頁面不顯示側邊欄 -->
  <div v-if="isLoginPage" class="min-h-screen bg-gray-100">
    <router-view />
  </div>

  <!-- 後台管理介面 -->
  <div v-else class="min-h-screen bg-gray-100">
    <!-- 手機版 Header -->
    <header class="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm h-16 flex items-center px-4">
      <button
        @click="toggleSidebar"
        class="p-2 rounded-lg hover:bg-gray-100"
      >
        <Icon icon="mdi:menu" class="w-6 h-6" />
      </button>
      <span class="ml-4 font-semibold text-gray-900">後台管理</span>
    </header>

    <!-- 側邊欄遮罩 (手機版) -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isSidebarOpen"
        class="lg:hidden fixed inset-0 z-40 bg-black/50"
        @click="closeSidebar"
      ></div>
    </Transition>

    <!-- 側邊欄 -->
    <aside
      :class="[
        'fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300',
        'lg:translate-x-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Logo -->
      <div class="h-16 flex items-center px-6 border-b border-gray-800">
        <span class="text-xl font-bold">後台管理</span>
      </div>

      <!-- 導航連結 -->
      <nav class="py-4">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          :class="{ 'bg-gray-800 text-white': route.path === item.path }"
          @click="closeSidebar"
        >
          <Icon :icon="item.icon" class="w-5 h-5 mr-3" />
          {{ item.name }}
        </router-link>
      </nav>

      <!-- 底部選項 -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <router-link
          to="/"
          class="flex items-center px-2 py-2 text-gray-300 hover:text-white transition-colors"
          @click="closeSidebar"
        >
          <Icon icon="mdi:home" class="w-5 h-5 mr-3" />
          返回前台
        </router-link>
        <button
          @click="handleLogout"
          class="flex items-center w-full px-2 py-2 text-gray-300 hover:text-white transition-colors"
        >
          <Icon icon="mdi:logout" class="w-5 h-5 mr-3" />
          登出
        </button>
      </div>
    </aside>

    <!-- 主要內容區域 -->
    <main
      :class="[
        'transition-all duration-300',
        'pt-16 lg:pt-0',
        'lg:ml-64'
      ]"
    >
      <div class="p-4 sm:p-6 lg:p-8">
        <router-view />
      </div>
    </main>
  </div>
</template>
