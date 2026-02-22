export interface Profile {
  id?: string
  full_name: string
  title: string
  tagline: string
  quote: string
  location: string
  about_me: string
  total_experience: string
  github_url: string
  website_url: string
  avatar_url?: string // 新增：頭像網址
  avatar_config?: {
    scale: number
    x: number
    y: number
  }

  // New "Connect with me" section
  connect_with_me?: {
    text: string
    hobbies: string[] // e.g. ["Badminton", "Investment", "Tech Reading"]
    image_url?: string
  }
}

export interface WorkExperience {
  id?: string
  company_name: string
  job_title: string
  industry: string
  location: string
  start_date: string
  end_date: string
  is_current: boolean
  description: string
  technologies: string[]
  display_order?: number
}

export interface Skill {
  id?: string
  category: string
  description: string
  tags: string[]
  proficiency?: number 
  display_order?: number
}

export interface Project {
  id?: string
  title: string
  description: string
  demo_url?: string
  github_url?: string
  technologies: string[]
  is_featured: boolean
  display_order?: number
  status?: 'Completed' | 'Maintenance' | 'Side Project' | 'Enterprise'
  difficulty?: number // 1-5
  role?: string
  solution?: string 
}

export interface Education {
  id?: string
  school_name: string
  department: string
  degree: string
  period: string
  display_order?: number
}

export interface Certification {
  id?: string
  name: string
  category: string
  image_url?: string
  display_order?: number
}

export interface BioSection {
  id?: string
  title: string
  text: string
  display_order?: number
}
