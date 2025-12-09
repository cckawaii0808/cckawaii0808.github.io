<script setup lang="ts">
import { Icon } from '@iconify/vue'

const currentYear = new Date().getFullYear()

const socialLinks = [
  { icon: 'mdi:github', url: 'https://github.com', label: 'GitHub' },
  { icon: 'mdi:linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: 'mdi:email', url: 'mailto:example@email.com', label: 'Email' },
]
</script>

<template>
  <footer class="bg-gray-900 text-white">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div class="flex flex-col items-center space-y-6">
        <!-- 社群連結 -->
        <div class="flex space-x-6">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-white transition-colors"
            :aria-label="link.label"
          >
            <Icon :icon="link.icon" class="h-6 w-6" />
          </a>
        </div>

        <!-- 版權資訊 -->
        <p class="text-gray-400 text-sm text-center">
          &copy; {{ currentYear }} Portfolio. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
