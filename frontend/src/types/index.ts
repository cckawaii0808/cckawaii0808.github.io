// 作品集項目
export interface Portfolio {
  id: string
  title: string
  description: string
  imageUrl?: string
  projectUrl?: string
  githubUrl?: string
  technologies: string[]
  featured: boolean
  order: number
  createdAt: string
  updatedAt: string
}

// 個人資料
export interface Profile {
  id: string
  name: string
  title: string
  bio: string
  email?: string
  avatarUrl?: string
  githubUrl?: string
  linkedinUrl?: string
}

// 技能
export interface Skill {
  id: string
  name: string
  category: string
  level: number
  order: number
}

// API 回應
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
