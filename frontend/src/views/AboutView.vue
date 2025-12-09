<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useProfileStore } from '@/stores/profile'
import { skillApi } from '@/api'
import type { Skill } from '@/types'

const profileStore = useProfileStore()
const { profile, loading: profileLoading } = storeToRefs(profileStore)

const skills = ref<Skill[]>([])
const skillsLoading = ref(false)

// 依類別分組技能
function groupSkillsByCategory(skills: Skill[]) {
  return skills.reduce((groups, skill) => {
    const category = skill.category || '其他'
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(skill)
    return groups
  }, {} as Record<string, Skill[]>)
}

onMounted(async () => {
  profileStore.fetchProfile()

  skillsLoading.value = true
  try {
    const { data } = await skillApi.getAll()
    if (data.success && data.data) {
      skills.value = data.data
    }
  } catch (e) {
    console.error('Failed to fetch skills:', e)
  } finally {
    skillsLoading.value = false
  }
})
</script>

<template>
  <div class="py-8 sm:py-12 lg:py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 個人資料區塊 -->
      <section class="mb-12 sm:mb-16">
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
          <!-- 頭像 -->
          <div class="flex-shrink-0">
            <div class="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
              <div class="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img
                  v-if="profile?.avatarUrl"
                  :src="profile.avatarUrl"
                  :alt="profile.name"
                  class="w-full h-full object-cover"
                />
                <Icon v-else icon="mdi:account" class="w-16 h-16 text-gray-400" />
              </div>
            </div>
          </div>

          <!-- 資料 -->
          <div class="text-center sm:text-left flex-1">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {{ profile?.name || '關於我' }}
            </h1>
            <p class="text-lg sm:text-xl text-blue-600 mb-4">
              {{ profile?.title || '全端開發者' }}
            </p>
            <p class="text-gray-600 leading-relaxed">
              {{ profile?.bio || '熱愛技術，專注於創造優質的使用者體驗。持續學習新技術，並將其應用於實際專案中。' }}
            </p>

            <!-- 聯絡方式 -->
            <div class="flex flex-wrap justify-center sm:justify-start gap-4 mt-6">
              <a
                v-if="profile?.email"
                :href="`mailto:${profile.email}`"
                class="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Icon icon="mdi:email" class="mr-2 h-5 w-5" />
                {{ profile.email }}
              </a>
              <a
                v-if="profile?.githubUrl"
                :href="profile.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Icon icon="mdi:github" class="mr-2 h-5 w-5" />
                GitHub
              </a>
              <a
                v-if="profile?.linkedinUrl"
                :href="profile.linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-gray-600 hover:text-blue-700 transition-colors"
              >
                <Icon icon="mdi:linkedin" class="mr-2 h-5 w-5" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 技能區塊 -->
      <section>
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center sm:text-left">
          技能專長
        </h2>

        <!-- 載入中 -->
        <div v-if="skillsLoading" class="flex justify-center py-8">
          <Icon icon="mdi:loading" class="w-6 h-6 text-blue-600 animate-spin" />
        </div>

        <!-- 技能列表 -->
        <div v-else-if="skills.length > 0" class="space-y-8">
          <div
            v-for="(categorySkills, category) in groupSkillsByCategory(skills)"
            :key="category"
          >
            <h3 class="text-lg font-semibold text-gray-700 mb-4">{{ category }}</h3>
            <div class="flex flex-wrap gap-3">
              <div
                v-for="skill in categorySkills"
                :key="skill.id"
                class="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <span class="text-gray-800">{{ skill.name }}</span>
                <div class="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-blue-500 rounded-full transition-all duration-500"
                    :style="{ width: `${skill.level}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 空狀態 -->
        <div v-else class="text-center py-8 text-gray-500">
          技能資料載入中...
        </div>
      </section>
    </div>
  </div>
</template>
