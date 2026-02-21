<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage, useDialog } from 'naive-ui'
import { supabase } from '../lib/supabase'
import type { Profile, WorkExperience, Project } from '../types'
import { DEFAULT_PROFILE, DEFAULT_WORK_EXPERIENCES, DEFAULT_PROJECTS } from '../data/defaults'

const router = useRouter()
const message = useMessage()
const dialog = useDialog()

const activeTab = ref('profile')
const loading = ref(false)

// ─── Profile Data ───
const profileForm = ref<Profile>({ ...DEFAULT_PROFILE })

// ─── Work Experience Data ───
const workExperiences = ref<WorkExperience[]>([])
const showWorkModal = ref(false)
const editingWork = ref<WorkExperience | null>(null)
const workForm = ref<WorkExperience>({
  company_name: '',
  job_title: '',
  industry: '',
  location: '',
  start_date: '',
  end_date: '',
  is_current: false,
  description: '',
  technologies: [],
})

// ─── Project Data ───
const projects = ref<Project[]>([])
const showProjectModal = ref(false)
const editingProject = ref<Project | null>(null)
const projectForm = ref<Project>({
  title: '',
  description: '',
  demo_url: '',
  github_url: '',
  technologies: [],
  is_featured: false,
})

const handleLogout = async () => {
  localStorage.removeItem('isAuthenticated')
  await supabase.auth.signOut()
  message.success('已登出')
  router.push('/login')
}

// ─── Fetch Data ───
const fetchData = async () => {
  loading.value = true
  try {
    // Profile
    const { data: profileData } = await supabase.from('profiles').select('*').single()
    if (profileData) profileForm.value = profileData
    else profileForm.value = { ...DEFAULT_PROFILE }

    // Work
    const { data: workData } = await supabase.from('work_experiences').select('*').order('display_order', { ascending: true })
    if (workData && workData.length > 0) workExperiences.value = workData
    else workExperiences.value = JSON.parse(JSON.stringify(DEFAULT_WORK_EXPERIENCES))

    // Projects
    const { data: projectData } = await supabase.from('projects').select('*').order('display_order', { ascending: true })
    if (projectData && projectData.length > 0) projects.value = projectData
    else projects.value = JSON.parse(JSON.stringify(DEFAULT_PROJECTS))

  } catch (error) {
    console.error(error)
    message.error('載入資料失敗 (使用預設值)')
  } finally {
    loading.value = false
  }
}

// ─── Profile Actions ───
const saveProfile = async () => {
  loading.value = true
  try {
    const { error } = await supabase.from('profiles').upsert(profileForm.value)
    if (error) throw error
    message.success('個人資料已儲存')
  } catch (error: any) {
    message.error(error.message || '儲存失敗')
  } finally {
    loading.value = false
  }
}

// ─── Work Actions ───
const openWorkModal = (work?: WorkExperience) => {
  if (work) {
    editingWork.value = work
    workForm.value = JSON.parse(JSON.stringify(work))
  } else {
    editingWork.value = null
    workForm.value = {
      company_name: '',
      job_title: '',
      industry: '',
      location: '',
      start_date: '',
      end_date: '',
      is_current: false,
      description: '',
      technologies: [],
    }
  }
  showWorkModal.value = true
}

const saveWork = async () => {
  try {
    const { error } = await supabase.from('work_experiences').upsert(workForm.value)
    if (error) throw error
    message.success(editingWork.value ? '已更新經歷' : '已新增經歷')
    showWorkModal.value = false
    fetchData()
  } catch (error: any) {
    message.error(error.message || '儲存失敗')
  }
}

const deleteWork = (id?: string) => {
  dialog.warning({
    title: '確認刪除',
    content: '確定要刪除這筆工作經歷嗎？此動作無法復原。',
    positiveText: '刪除',
    negativeText: '取消',
    onPositiveClick: async () => {
      if (!id) return
      try {
        const { error } = await supabase.from('work_experiences').delete().eq('id', id)
        if (error) throw error
        message.success('已刪除')
        fetchData()
      } catch (error: any) {
        message.error(error.message || '刪除失敗')
      }
    }
  })
}

// ─── Project Actions ───
const openProjectModal = (project?: Project) => {
  if (project) {
    editingProject.value = project
    projectForm.value = JSON.parse(JSON.stringify(project))
  } else {
    editingProject.value = null
    projectForm.value = {
      title: '',
      description: '',
      demo_url: '',
      github_url: '',
      technologies: [],
      is_featured: false,
    }
  }
  showProjectModal.value = true
}

const saveProject = async () => {
  try {
    const { error } = await supabase.from('projects').upsert(projectForm.value)
    if (error) throw error
    message.success(editingProject.value ? '已更新專案' : '已新增專案')
    showProjectModal.value = false
    fetchData()
  } catch (error: any) {
    message.error(error.message || '儲存失敗')
  }
}

const deleteProject = (id?: string) => {
  dialog.warning({
    title: '確認刪除',
    content: '確定要刪除這個專案嗎？',
    positiveText: '刪除',
    negativeText: '取消',
    onPositiveClick: async () => {
      if (!id) return
      try {
        const { error } = await supabase.from('projects').delete().eq('id', id)
        if (error) throw error
        message.success('已刪除')
        fetchData()
      } catch (error: any) {
        message.error(error.message || '刪除失敗')
      }
    }
  })
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <n-layout style="min-height: 100vh">
    <n-layout-header bordered style="padding: 12px 24px">
      <n-space justify="space-between" align="center">
        <n-h3 style="margin: 0">後台管理</n-h3>
        <n-space :size="12">
          <n-button @click="router.push('/')" secondary size="small">
            查看前台
          </n-button>
          <n-button @click="handleLogout" type="error" size="small">
            登出
          </n-button>
        </n-space>
      </n-space>
    </n-layout-header>

    <n-layout-content style="max-width: 960px; margin: 0 auto; padding: 24px">
      <n-tabs v-model:value="activeTab" type="line">
        <!-- 個人資料 -->
        <n-tab-pane name="profile" tab="個人資料">
          <n-card :bordered="false">
            <n-form :model="profileForm" label-placement="left" label-width="100">
              <n-form-item label="姓名">
                <n-input v-model:value="profileForm.full_name" />
              </n-form-item>
              <n-form-item label="職稱">
                <n-input v-model:value="profileForm.title" />
              </n-form-item>
              <n-form-item label="標語">
                <n-input v-model:value="profileForm.tagline" />
              </n-form-item>
              <n-form-item label="座右銘">
                <n-input v-model:value="profileForm.quote" type="textarea" :rows="2" />
              </n-form-item>
              <n-form-item label="所在地">
                <n-input v-model:value="profileForm.location" />
              </n-form-item>
              <n-form-item label="關於我">
                <n-input v-model:value="profileForm.about_me" type="textarea" :rows="5" />
              </n-form-item>
              <n-form-item label="GitHub">
                <n-input v-model:value="profileForm.github_url" />
              </n-form-item>
              <n-form-item label="個人網站">
                <n-input v-model:value="profileForm.website_url" />
              </n-form-item>
              <n-space justify="end">
                <n-button type="primary" :loading="loading" @click="saveProfile">
                  儲存
                </n-button>
              </n-space>
            </n-form>
          </n-card>
        </n-tab-pane>

        <!-- 工作經歷 -->
        <n-tab-pane name="work" tab="工作經歷">
          <n-card :bordered="false">
            <template #header>
              <n-text>工作經歷管理</n-text>
            </template>
            <template #header-extra>
              <n-button type="primary" size="small" @click="openWorkModal()">
                新增
              </n-button>
            </template>

            <n-empty v-if="workExperiences.length === 0" description="尚無工作經歷">
              <template #extra>
                <n-button size="small" @click="openWorkModal()">立即新增</n-button>
              </template>
            </n-empty>

            <n-list v-else>
              <n-list-item v-for="work in workExperiences" :key="work.id || work.company_name">
                <template #suffix>
                  <n-space>
                    <n-button size="tiny" @click="openWorkModal(work)">
                      編輯
                    </n-button>
                    <n-button size="tiny" type="error" @click="deleteWork(work.id)">刪除</n-button>
                  </n-space>
                </template>
                <n-thing :title="work.company_name" :description="work.job_title" />
              </n-list-item>
            </n-list>
          </n-card>
        </n-tab-pane>

        <!-- 專案作品 -->
        <n-tab-pane name="projects" tab="專案作品">
          <n-card :bordered="false">
             <template #header>
              <n-text>專案作品管理</n-text>
            </template>
            <template #header-extra>
              <n-button type="primary" size="small" @click="openProjectModal()">
                新增
              </n-button>
            </template>

            <n-grid x-gap="16" y-gap="16" cols="1 m:2 l:3" item-responsive>
              <n-grid-item v-for="project in projects" :key="project.id || project.title">
                <n-card :title="project.title" size="small">
                  <template #header-extra>
                    <n-space :size="4">
                      <n-button size="tiny" @click="openProjectModal(project)">
                        編輯
                      </n-button>
                      <n-button size="tiny" type="error" @click="deleteProject(project.id)">刪除</n-button>
                    </n-space>
                  </template>
                  <n-text depth="3" class="line-clamp-2">{{ project.description }}</n-text>
                </n-card>
              </n-grid-item>
            </n-grid>
          </n-card>
        </n-tab-pane>
        
        <n-tab-pane name="skills" tab="技能專長">
          <n-empty description="功能開發中...請直接編輯資料庫" />
        </n-tab-pane>
      </n-tabs>
    </n-layout-content>

    <!-- Work Modal -->
    <n-modal v-model:show="showWorkModal" preset="card" title="編輯工作經歷" style="width: 600px">
      <n-form :model="workForm" label-placement="left" label-width="100">
        <n-form-item label="公司名稱">
          <n-input v-model:value="workForm.company_name" />
        </n-form-item>
        <n-form-item label="職稱">
          <n-input v-model:value="workForm.job_title" />
        </n-form-item>
        <n-form-item label="地點">
          <n-input v-model:value="workForm.location" />
        </n-form-item>
        <n-form-item label="開始日期">
          <n-input v-model:value="workForm.start_date" placeholder="YYYY/MM" />
        </n-form-item>
         <n-form-item label="結束日期">
          <n-input v-model:value="workForm.end_date" placeholder="YYYY/MM (若在職中請留空)" />
        </n-form-item>
        <n-form-item label="在職中">
          <n-switch v-model:value="workForm.is_current" />
        </n-form-item>
        <n-form-item label="描述">
          <n-input v-model:value="workForm.description" type="textarea" />
        </n-form-item>
        <n-form-item label="技術標籤 (逗號分隔)">
          <n-dynamic-tags v-model:value="workForm.technologies" />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showWorkModal = false">取消</n-button>
          <n-button type="primary" @click="saveWork">儲存</n-button>
        </n-space>
      </template>
    </n-modal>

    <!-- Project Modal -->
    <n-modal v-model:show="showProjectModal" preset="card" title="編輯專案" style="width: 600px">
      <n-form :model="projectForm" label-placement="left" label-width="100">
        <n-form-item label="專案名稱">
          <n-input v-model:value="projectForm.title" />
        </n-form-item>
        <n-form-item label="描述">
          <n-input v-model:value="projectForm.description" type="textarea" />
        </n-form-item>
        <n-form-item label="Demo URL">
          <n-input v-model:value="projectForm.demo_url" />
        </n-form-item>
        <n-form-item label="技術標籤">
          <n-dynamic-tags v-model:value="projectForm.technologies" />
        </n-form-item>
        <n-form-item label="精選專案">
          <n-switch v-model:value="projectForm.is_featured" />
        </n-form-item>
      </n-form>
      <template #footer>
         <n-space justify="end">
          <n-button @click="showProjectModal = false">取消</n-button>
          <n-button type="primary" @click="saveProject">儲存</n-button>
        </n-space>
      </template>
    </n-modal>

  </n-layout>
</template>
