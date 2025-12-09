<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import api from '@/api'
import type { Skill } from '@/types'

const skills = ref<Skill[]>([])
const loading = ref(true)
const showModal = ref(false)
const editingId = ref<string | null>(null)

const form = ref({
  name: '',
  category: '',
  level: 50,
  order: 0,
})

const categories = ['前端', '後端', '資料庫', '工具', '其他']

async function fetchSkills() {
  loading.value = true
  try {
    const { data } = await api.get('/skills')
    if (data.success) {
      skills.value = data.data || []
    }
  } catch (error) {
    console.error('Failed to fetch skills:', error)
  } finally {
    loading.value = false
  }
}

function openCreateModal() {
  editingId.value = null
  form.value = {
    name: '',
    category: '前端',
    level: 50,
    order: 0,
  }
  showModal.value = true
}

function openEditModal(skill: Skill) {
  editingId.value = skill.id
  form.value = {
    name: skill.name,
    category: skill.category,
    level: skill.level,
    order: skill.order,
  }
  showModal.value = true
}

async function handleSubmit() {
  try {
    if (editingId.value) {
      await api.put(`/skills/${editingId.value}`, form.value)
    } else {
      await api.post('/skills', form.value)
    }
    showModal.value = false
    fetchSkills()
  } catch (error) {
    console.error('Failed to save skill:', error)
    alert('儲存失敗')
  }
}

async function handleDelete(id: string) {
  if (!confirm('確定要刪除這個技能嗎？')) return

  try {
    await api.delete(`/skills/${id}`)
    fetchSkills()
  } catch (error) {
    console.error('Failed to delete skill:', error)
    alert('刪除失敗')
  }
}

// 依類別分組
function groupByCategory(skills: Skill[]) {
  return skills.reduce((groups, skill) => {
    const category = skill.category || '其他'
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(skill)
    return groups
  }, {} as Record<string, Skill[]>)
}

onMounted(fetchSkills)
</script>

<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">技能管理</h1>
      <button
        @click="openCreateModal"
        class="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Icon icon="mdi:plus" class="w-5 h-5 mr-2" />
        新增技能
      </button>
    </div>

    <!-- 載入中 -->
    <div v-if="loading" class="flex justify-center py-12">
      <Icon icon="mdi:loading" class="w-8 h-8 text-blue-600 animate-spin" />
    </div>

    <!-- 技能列表 -->
    <div v-else-if="skills.length > 0" class="space-y-6">
      <div
        v-for="(categorySkills, category) in groupByCategory(skills)"
        :key="category"
        class="bg-white rounded-xl shadow-sm p-4 sm:p-6"
      >
        <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ category }}</h3>
        <div class="space-y-3">
          <div
            v-for="skill in categorySkills"
            :key="skill.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div class="flex-1 min-w-0 mr-4">
              <p class="font-medium text-gray-900">{{ skill.name }}</p>
              <div class="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  class="h-full bg-blue-500 rounded-full"
                  :style="{ width: `${skill.level}%` }"
                ></div>
              </div>
            </div>
            <div class="flex gap-2">
              <button
                @click="openEditModal(skill)"
                class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Icon icon="mdi:pencil" class="w-4 h-4" />
              </button>
              <button
                @click="handleDelete(skill.id)"
                class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Icon icon="mdi:delete" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空狀態 -->
    <div v-else class="text-center py-12">
      <Icon icon="mdi:star-outline" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <p class="text-gray-500">還沒有技能，點擊上方按鈕新增</p>
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
          <div class="w-full max-w-md bg-white rounded-xl shadow-xl">
            <div class="px-6 py-4 border-b">
              <h2 class="text-xl font-semibold text-gray-900">
                {{ editingId ? '編輯技能' : '新增技能' }}
              </h2>
            </div>

            <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">名稱 *</label>
                <input
                  v-model="form.name"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">分類 *</label>
                <select
                  v-model="form.category"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option v-for="cat in categories" :key="cat" :value="cat">
                    {{ cat }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  熟練度: {{ form.level }}%
                </label>
                <input
                  v-model.number="form.level"
                  type="range"
                  min="0"
                  max="100"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">排序</label>
                <input
                  v-model.number="form.order"
                  type="number"
                  class="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
