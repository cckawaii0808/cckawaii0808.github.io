<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import api from '@/api'
import type { Portfolio } from '@/types'

const portfolios = ref<Portfolio[]>([])
const loading = ref(true)
const showModal = ref(false)
const editingId = ref<string | null>(null)

const form = ref({
  title: '',
  description: '',
  imageUrl: '',
  projectUrl: '',
  githubUrl: '',
  technologies: '',
  featured: false,
  order: 0,
})

async function fetchPortfolios() {
  loading.value = true
  try {
    const { data } = await api.get('/portfolios')
    if (data.success) {
      portfolios.value = data.data || []
    }
  } catch (error) {
    console.error('Failed to fetch portfolios:', error)
  } finally {
    loading.value = false
  }
}

function openCreateModal() {
  editingId.value = null
  form.value = {
    title: '',
    description: '',
    imageUrl: '',
    projectUrl: '',
    githubUrl: '',
    technologies: '',
    featured: false,
    order: 0,
  }
  showModal.value = true
}

function openEditModal(portfolio: Portfolio) {
  editingId.value = portfolio.id
  form.value = {
    title: portfolio.title,
    description: portfolio.description,
    imageUrl: portfolio.imageUrl || '',
    projectUrl: portfolio.projectUrl || '',
    githubUrl: portfolio.githubUrl || '',
    technologies: portfolio.technologies.join(', '),
    featured: portfolio.featured,
    order: portfolio.order,
  }
  showModal.value = true
}

async function handleSubmit() {
  const data = {
    ...form.value,
    technologies: form.value.technologies.split(',').map(t => t.trim()).filter(Boolean),
  }

  try {
    if (editingId.value) {
      await api.put(`/portfolios/${editingId.value}`, data)
    } else {
      await api.post('/portfolios', data)
    }
    showModal.value = false
    fetchPortfolios()
  } catch (error) {
    console.error('Failed to save portfolio:', error)
    alert('儲存失敗')
  }
}

async function handleDelete(id: string) {
  if (!confirm('確定要刪除這個作品嗎？')) return

  try {
    await api.delete(`/portfolios/${id}`)
    fetchPortfolios()
  } catch (error) {
    console.error('Failed to delete portfolio:', error)
    alert('刪除失敗')
  }
}

onMounted(fetchPortfolios)
</script>

<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">作品集管理</h1>
      <button
        @click="openCreateModal"
        class="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Icon icon="mdi:plus" class="w-5 h-5 mr-2" />
        新增作品
      </button>
    </div>

    <!-- 載入中 -->
    <div v-if="loading" class="flex justify-center py-12">
      <Icon icon="mdi:loading" class="w-8 h-8 text-blue-600 animate-spin" />
    </div>

    <!-- 作品列表 -->
    <div v-else-if="portfolios.length > 0" class="space-y-4">
      <div
        v-for="portfolio in portfolios"
        :key="portfolio.id"
        class="bg-white rounded-xl shadow-sm p-4 sm:p-6"
      >
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- 縮圖 -->
          <div class="w-full sm:w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <img
              v-if="portfolio.imageUrl"
              :src="portfolio.imageUrl"
              :alt="portfolio.title"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <Icon icon="mdi:image" class="w-8 h-8 text-gray-300" />
            </div>
          </div>

          <!-- 內容 -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">
                  {{ portfolio.title }}
                  <span
                    v-if="portfolio.featured"
                    class="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full"
                  >
                    精選
                  </span>
                </h3>
                <p class="text-gray-600 text-sm mt-1 line-clamp-2">
                  {{ portfolio.description }}
                </p>
              </div>
            </div>

            <!-- 技術標籤 -->
            <div class="flex flex-wrap gap-1.5 mt-3">
              <span
                v-for="tech in portfolio.technologies.slice(0, 5)"
                :key="tech"
                class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {{ tech }}
              </span>
            </div>

            <!-- 操作按鈕 -->
            <div class="flex gap-2 mt-4">
              <button
                @click="openEditModal(portfolio)"
                class="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Icon icon="mdi:pencil" class="w-4 h-4 inline mr-1" />
                編輯
              </button>
              <button
                @click="handleDelete(portfolio.id)"
                class="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Icon icon="mdi:delete" class="w-4 h-4 inline mr-1" />
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空狀態 -->
    <div v-else class="text-center py-12">
      <Icon icon="mdi:folder-open-outline" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <p class="text-gray-500">還沒有作品，點擊上方按鈕新增</p>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          @click.self="showModal = false"
        >
          <div class="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl">
            <div class="sticky top-0 bg-white px-6 py-4 border-b">
              <h2 class="text-xl font-semibold text-gray-900">
                {{ editingId ? '編輯作品' : '新增作品' }}
              </h2>
            </div>

            <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">標題 *</label>
                <input
                  v-model="form.title"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">描述 *</label>
                <textarea
                  v-model="form.description"
                  required
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">圖片 URL</label>
                <input
                  v-model="form.imageUrl"
                  type="url"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">專案連結</label>
                <input
                  v-model="form.projectUrl"
                  type="url"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">GitHub 連結</label>
                <input
                  v-model="form.githubUrl"
                  type="url"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">技術 (逗號分隔)</label>
                <input
                  v-model="form.technologies"
                  placeholder="Vue, TypeScript, Tailwind"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div class="flex items-center gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">排序</label>
                  <input
                    v-model.number="form.order"
                    type="number"
                    class="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <label class="flex items-center mt-6">
                  <input
                    v-model="form.featured"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">精選作品</span>
                </label>
              </div>

              <div class="flex gap-3 pt-4">
                <button
                  type="button"
                  @click="showModal = false"
                  class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  儲存
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
