<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { usePortfolioStore } from '@/stores/portfolio'
import PortfolioCard from '@/components/PortfolioCard.vue'

const portfolioStore = usePortfolioStore()
const { portfolios, loading, error } = storeToRefs(portfolioStore)

onMounted(() => {
  portfolioStore.fetchPortfolios()
})
</script>

<template>
  <div class="py-8 sm:py-12 lg:py-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 頁面標題 -->
      <div class="text-center mb-8 sm:mb-12">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          作品集
        </h1>
        <p class="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          這裡展示了我的一些專案作品，每個專案都代表著我在技術上的探索與成長。
        </p>
      </div>

      <!-- 載入中狀態 -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <Icon icon="mdi:loading" class="w-8 h-8 text-blue-600 animate-spin" />
        <span class="ml-3 text-gray-600">載入中...</span>
      </div>

      <!-- 錯誤狀態 -->
      <div v-else-if="error" class="text-center py-20">
        <Icon icon="mdi:alert-circle" class="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button
          @click="portfolioStore.fetchPortfolios()"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          重試
        </button>
      </div>

      <!-- 空狀態 -->
      <div v-else-if="portfolios.length === 0" class="text-center py-20">
        <Icon icon="mdi:folder-open-outline" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500 text-lg">目前還沒有作品</p>
      </div>

      <!-- 作品集列表 - 響應式網格 -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <PortfolioCard
          v-for="portfolio in portfolios"
          :key="portfolio.id"
          :portfolio="portfolio"
        />
      </div>
    </div>
  </div>
</template>
