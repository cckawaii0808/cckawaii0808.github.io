<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import api from '@/api'

const loading = ref(true)
const saving = ref(false)
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)

const form = ref({
  name: '',
  title: '',
  bio: '',
  email: '',
  avatarUrl: '',
  githubUrl: '',
  linkedinUrl: '',
})

async function fetchProfile() {
  loading.value = true
  try {
    const { data } = await api.get('/profile')
    if (data.success && data.data) {
      form.value = {
        name: data.data.name || '',
        title: data.data.title || '',
        bio: data.data.bio || '',
        email: data.data.email || '',
        avatarUrl: data.data.avatarUrl || '',
        githubUrl: data.data.githubUrl || '',
        linkedinUrl: data.data.linkedinUrl || '',
      }
    }
  } catch (error) {
    console.error('Failed to fetch profile:', error)
  } finally {
    loading.value = false
  }
}

async function handleSubmit() {
  saving.value = true
  message.value = null

  try {
    await api.put('/profile', form.value)
    message.value = { type: 'success', text: '儲存成功！' }
  } catch (error) {
    console.error('Failed to save profile:', error)
    message.value = { type: 'error', text: '儲存失敗，請稍後再試' }
  } finally {
    saving.value = false
  }
}

onMounted(fetchProfile)
</script>

<template>
  <div>
    <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
      個人資料
    </h1>

    <!-- 載入中 -->
    <div v-if="loading" class="flex justify-center py-12">
      <Icon icon="mdi:loading" class="w-8 h-8 text-blue-600 animate-spin" />
    </div>

    <!-- 表單 -->
    <div v-else class="bg-white rounded-xl shadow-sm p-6 sm:p-8 max-w-2xl">
      <!-- 訊息 -->
      <div
        v-if="message"
        :class="[
          'mb-6 p-4 rounded-lg',
          message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        ]"
      >
        {{ message.text }}
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
          <input
            v-model="form.name"
            required
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">職稱 *</label>
          <input
            v-model="form.title"
            required
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">自我介紹 *</label>
          <textarea
            v-model="form.bio"
            required
            rows="4"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">頭像 URL</label>
          <input
            v-model="form.avatarUrl"
            type="url"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
          <input
            v-model="form.githubUrl"
            type="url"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
          <input
            v-model="form.linkedinUrl"
            type="url"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          :disabled="saving"
          class="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <span v-if="saving" class="flex items-center justify-center">
            <Icon icon="mdi:loading" class="w-5 h-5 animate-spin mr-2" />
            儲存中...
          </span>
          <span v-else>儲存變更</span>
        </button>
      </form>
    </div>
  </div>
</template>
