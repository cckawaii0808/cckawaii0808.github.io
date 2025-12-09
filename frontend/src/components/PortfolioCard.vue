<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { Portfolio } from '@/types'

defineProps<{
  portfolio: Portfolio
}>()
</script>

<template>
  <article class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <!-- 圖片區域 -->
    <div class="aspect-video bg-gray-100 relative overflow-hidden">
      <img
        v-if="portfolio.imageUrl"
        :src="portfolio.imageUrl"
        :alt="portfolio.title"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <Icon icon="mdi:image" class="w-12 h-12 text-gray-300" />
      </div>
      <!-- 精選標籤 -->
      <span
        v-if="portfolio.featured"
        class="absolute top-3 right-3 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-medium rounded-full"
      >
        精選
      </span>
    </div>

    <!-- 內容區域 -->
    <div class="p-4 sm:p-5">
      <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
        {{ portfolio.title }}
      </h3>
      <p class="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">
        {{ portfolio.description }}
      </p>

      <!-- 技術標籤 -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tech in portfolio.technologies.slice(0, 4)"
          :key="tech"
          class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
        >
          {{ tech }}
        </span>
        <span
          v-if="portfolio.technologies.length > 4"
          class="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full"
        >
          +{{ portfolio.technologies.length - 4 }}
        </span>
      </div>

      <!-- 連結按鈕 -->
      <div class="flex gap-3">
        <a
          v-if="portfolio.projectUrl"
          :href="portfolio.projectUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Icon icon="mdi:open-in-new" class="mr-1.5 h-4 w-4" />
          查看專案
        </a>
        <a
          v-if="portfolio.githubUrl"
          :href="portfolio.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Icon icon="mdi:github" class="h-4 w-4" />
        </a>
      </div>
    </div>
  </article>
</template>
