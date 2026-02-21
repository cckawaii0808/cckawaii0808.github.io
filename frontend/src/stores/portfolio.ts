import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../lib/supabase'
import type { Profile, WorkExperience, Skill, Project, Education, Certification, BioSection } from '../types'
import { 
  DEFAULT_PROFILE, DEFAULT_WORK_EXPERIENCES, DEFAULT_SKILLS, 
  DEFAULT_PROJECTS, DEFAULT_EDUCATION, DEFAULT_CERTIFICATIONS, DEFAULT_BIO_SECTIONS 
} from '../data/defaults'

export const usePortfolioStore = defineStore('portfolio', () => {
  const isEditMode = ref(false)
  const loading = ref(false)

  // Data Refs
  const profile = ref<Profile>({ ...DEFAULT_PROFILE })
  const workExperiences = ref<WorkExperience[]>([])
  const skills = ref<Skill[]>([])
  const projects = ref<Project[]>([])
  const education = ref<Education[]>([])
  const certifications = ref<Certification[]>([])
  const bioSections = ref<BioSection[]>([])

  // Auth State
  const user = ref<any>(null)

  // --- Actions ---

  async function checkAuth() {
    const { data } = await supabase.auth.getUser()
    user.value = data.user
    // If user is logged in, enable edit mode by default? Or leave it to manual toggle? 
    // Let's enable edit mode capability if user exists.
    if (user.value) {
        isEditMode.value = true
    }
  }

  async function fetchAll() {
    loading.value = true
    try {
      // 1. Profile
      const { data: pData } = await supabase.from('profiles').select('*').single()
      if (pData) profile.value = pData
      else profile.value = { ...DEFAULT_PROFILE }

      // 2. Work
      const { data: wData } = await supabase.from('work_experiences').select('*').order('display_order', { ascending: true })
      workExperiences.value = (wData && wData.length > 0) ? wData : JSON.parse(JSON.stringify(DEFAULT_WORK_EXPERIENCES))

      // 3. Skills
      const { data: sData } = await supabase.from('skills').select('*').order('display_order', { ascending: true })
      skills.value = (sData && sData.length > 0) ? sData : JSON.parse(JSON.stringify(DEFAULT_SKILLS))

      // 4. Projects
      const { data: prData } = await supabase.from('projects').select('*').order('display_order', { ascending: true })
      projects.value = (prData && prData.length > 0) ? prData : JSON.parse(JSON.stringify(DEFAULT_PROJECTS))

      // 5. Education
      const { data: eData } = await supabase.from('education').select('*').order('display_order', { ascending: true })
      education.value = (eData && eData.length > 0) ? eData : JSON.parse(JSON.stringify(DEFAULT_EDUCATION))

      // 6. Certifications
      const { data: cData } = await supabase.from('certifications').select('*').order('display_order', { ascending: true })
      certifications.value = (cData && cData.length > 0) ? cData : JSON.parse(JSON.stringify(DEFAULT_CERTIFICATIONS))

      // 7. Bio
      const { data: bData } = await supabase.from('bio_sections').select('*').order('display_order', { ascending: true })
      bioSections.value = (bData && bData.length > 0) ? bData : JSON.parse(JSON.stringify(DEFAULT_BIO_SECTIONS))

    } catch (error) {
      console.error('Fetch Error, using defaults', error)
      // Fallback is already handled by initial values or individual checks
    } finally {
      loading.value = false
    }
  }

  // --- CRUD Actions (Generic for simplicity or specific) ---
  
  async function saveProfile(newProfile: Profile) {
    try {
      const { error } = await supabase.from('profiles').upsert(newProfile)
      if (error) throw error
      profile.value = newProfile
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  async function saveProject(project: Project) {
      try {
          const { error } = await supabase.from('projects').upsert(project)
          if (error) throw error
          await fetchAll() // Refresh to get order/updates
          return true
      } catch (e) {
          console.error(e)
          return false
      }
  }
  
  async function deleteProject(id: string) {
      try {
          const { error } = await supabase.from('projects').delete().eq('id', id)
          if (error) throw error
          await fetchAll()
          return true
      } catch (e) {
          console.error(e)
          return false
      }
  }

  /**
   * 上傳檔案到 Supabase Storage
   * @param bucket 存儲桶名稱 (例如 'avatars')
   * @param file 檔案物件
   */
  async function uploadFile(bucket: string, file: File) {
    try {
      // 檢查是否為 Mock Client (代表未設定 Supabase)
      if (!import.meta.env.VITE_SUPABASE_URL) {
          // 如果沒設定 Supabase，我們使用 FileReader 轉成 Base64 回傳，方便本地測試
          return new Promise<string>((resolve) => {
              const reader = new FileReader()
              reader.onloadend = () => resolve(reader.result as string)
              reader.readAsDataURL(file)
          })
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${fileName}`

      const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (error) throw error

      // 取得公開 URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      return publicUrl
    } catch (e) {
      console.error('Upload Error:', e)
      return null
    }
  }

    // Similar for Work, Skills... I'll implement as needed or use generic 'saveItem' patterns in components

  return {
    isEditMode,
    loading,
    user,
    profile,
    workExperiences,
    skills,
    projects,
    education,
    certifications,
    bioSections,
    checkAuth,
    fetchAll,
    saveProfile,
    saveProject,
    deleteProject,
    uploadFile
  }
})
