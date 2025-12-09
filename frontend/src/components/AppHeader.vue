<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const isMenuOpen = ref(false)

const navLinks = [
  { name: '首頁', path: '/' },
  { name: '作品集', path: '/portfolio' },
  { name: '關於我', path: '/about' },
]

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
    <nav class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="text-xl font-bold text-gray-900" @click="closeMenu">
          Portfolio
        </router-link>

        <!-- 桌面版導航 -->
        <div class="hidden md:flex md:items-center md:space-x-8">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-gray-600 hover:text-gray-900 transition-colors"
          >
            {{ link.name }}
          </router-link>
        </div>

        <!-- 手機版漢堡選單按鈕 -->
        <button
          type="button"
          class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          @click="toggleMenu"
          :aria-expanded="isMenuOpen"
        >
          <span class="sr-only">開啟選單</span>
          <Icon
            :icon="isMenuOpen ? 'mdi:close' : 'mdi:menu'"
            class="h-6 w-6"
          />
        </button>
      </div>

      <!-- 手機版導航選單 -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-show="isMenuOpen" class="md:hidden py-4 border-t border-gray-100">
          <div class="flex flex-col space-y-4">
            <router-link
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              class="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              @click="closeMenu"
            >
              {{ link.name }}
            </router-link>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>
