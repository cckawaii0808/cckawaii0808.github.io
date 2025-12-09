<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import api from '@/api'

const stats = ref({
  portfolioCount: 0,
  skillCount: 0,
})
const loading = ref(true)

onMounted(async () => {
  try {
    const [portfoliosRes, skillsRes] = await Promise.all([
      api.get('/portfolios'),
      api.get('/skills'),
    ])
    stats.value.portfolioCount = portfoliosRes.data.data?.length || 0
    stats.value.skillCount = skillsRes.data.data?.length || 0
  } catch (error) {
    console.error('Failed to fetch stats:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
      儀表板
    </h1>

    <!-- 統計卡片 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <!-- 作品數量 -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon icon="mdi:folder-multiple" class="w-6 h-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-500">作品數量</p>
            <p class="text-2xl font-bold text-gray-900">
              <span v-if="loading" class="text-gray-400">-</span>
              <span v-else>{{ stats.portfolioCount }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- 技能數量 -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Icon icon="mdi:star" class="w-6 h-6 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-500">技能數量</p>
            <p class="text-2xl font-bold text-gray-900">
              <span v-if="loading" class="text-gray-400">-</span>
              <span v-else>{{ stats.skillCount }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- 快速連結 -->
      <div class="bg-white rounded-xl shadow-sm p-6 sm:col-span-2 lg:col-span-1">
        <h3 class="text-sm font-medium text-gray-500 mb-4">快速操作</h3>
        <div class="space-y-3">
          <router-link
            to="/admin/portfolios"
            class="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Icon icon="mdi:plus-circle" class="w-5 h-5 mr-2" />
            新增作品
          </router-link>
          <router-link
            to="/admin/skills"
            class="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Icon icon="mdi:plus-circle" class="w-5 h-5 mr-2" />
            新增技能
          </router-link>
          <router-link
            to="/admin/profile"
            class="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Icon icon="mdi:pencil" class="w-5 h-5 mr-2" />
            編輯個人資料
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
