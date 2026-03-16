import type { Profile, WorkExperience, Skill, Project, Education, Certification, BioSection } from '../types'

export const DEFAULT_PROFILE: Profile = {
  full_name: '謝承羲',
  title: '全端工程師',
  tagline: '不設限的解決問題',
  quote: '做一個對社會有用的人，才有活著的意義',
  location: '台中市',
  avatar_url: '/img/profile.png', // 預設頭像
  avatar_config: {
    scale: 1.4,
    x: 50,
    y: 20
  },
  about_me: `
我是CC，一個擅長將 **複雜技術語言轉化為業務邏輯** 的全端工程師。

MBTI 是ENFP的快樂小狗，擁有高度的同理心與溝通熱忱，不僅是寫 Code，更熱衷於 **理解使用者背後的真實需求**。

主要使用 C# .NET Core 與 Vue 3，並積極運用 **各種AI工具** 例如 Claude Code ,gemini cli ,openclaws 等，在開發流程中的應用。

我喜歡與人互動溝通，擅長學習後分享成大家能懂的語言，也喜歡探索生活中的各種可能性。
`,
  total_experience: '3年+ 全端開發經驗',
  github_url: 'https://github.com/cckawaii0808',
  website_url: 'https://cckawaii0808.github.io/',
  connect_with_me: {
    text: '除了程式與邏輯，我也熱衷於生活中的小事物。喜歡羽球、理財、AI或科技新知，歡迎隨時找我交流！',
    hobbies: ['羽球', '理財', 'AI 開發', '科技新知'],
  }
}

export const DEFAULT_WORK_EXPERIENCES: WorkExperience[] = [
  {
    company_name: '緯創軟體 (Wistron ITS)',
    job_title: '全端工程師',
    industry: '半導體製造 / 企業級系統開發',
    location: '',
    start_date: '2026/01',
    end_date: '',
    is_current: true,
    description: '負責 QM (品質管理) 與 SD (銷售) 模組的系統開發與維護。優化既有 .NET Core + Vue 3 架構，提升維護效率。',
    technologies: ['C# .NET Core', 'Vue 3', 'MS SQL'],
  },
  {
    company_name: '天思數位科技',
    job_title: '全端工程師',
    industry: '互聯網 / 政府專案',
    location: '台中市西屯區',
    start_date: '2023/08',
    end_date: '2026/01',
    is_current: false,
    description: '撰寫多個政府與企業客製化系統。從前端、後端、資料庫設計到前後端實作，獨立完成或與團隊合作。並帶領團隊成員嘗試新技術與模板',
    technologies: ['Vue.js', 'ASP.NET Core', 'Cordova', 'OpenAI API', 'Gov Projects'],
  },
]

export const DEFAULT_SKILLS: Skill[] = [
  {
    category: 'Vue.js 全端實戰',
    description: '從 Options API 到 Composition API，精通 Vue 生態系。能快速構建高互動、響應式的現代化前端介面。',
    tags: ['Vue 3', 'TypeScript', 'Pinia', 'Vite', 'Naive UI'],
    proficiency: 5,
  },
  {
    category: '.NET Core 架構設計',
    description: '熟悉 C# 物件導向設計與 RESTful API 開發。重視程式碼的可讀性與依賴注入 (DI) 模式，確保系統易於測試與擴展。',
    tags: ['C#', 'ASP.NET Core', 'EF Core', 'MS SQL', 'Web API'],
    proficiency: 5,
  },
  {
    category: '規格驅動開發 (SDD)',
    description: '善用 Claude / ChatGPT 結合 MCP 協議，打造高效的自動化開發工作流。不只是使用者，更是 AI 工具的整合者。',
    tags: ['提示詞工程', 'MCP協議', 'AI工具'],
    proficiency: 4,
  },
  {
    category: '跨領域溝通與協作',
    description: '擅長溝通並理解客戶真實的需求，不設限的解決問題，找到不同的解決方案。',
    tags: ['需求分析', '技術選擇', '團隊協作'],
    proficiency: 5,
  },
]

export const DEFAULT_PROJECTS: Project[] = [
  {
    title: '羽球活動管理系統',
    description: '針對羽球社群「報名繁瑣、計分混亂」的痛點，開發的一站式管理平台。',
    demo_url: undefined,
    github_url: 'https://github.com/cckawaii0808/badminton-system', 
    technologies: ['Vue 3', 'ASP.NET Core', 'SignalR'],
    is_featured: true,
    status: 'Side Project',
    difficulty: 4,
    role: 'Full Stack',
    solution: '整合了活動發布、即時報名、分組算法與比賽計分功能。解決了主辦方 80% 的人工統計時間，並透過 LINE Notify 提升了使用者的參與體驗。',
  },
  {
    title: 'SDD 規格開發說明網頁',
    description: '基於 VitePress 的技術文件系統，為開發團隊建立統一的知識庫。',
    demo_url: 'https://cckawaii0808.github.io/',
    technologies: ['VitePress', 'Markdown', 'Vue Components'],
    is_featured: true,
    status: 'Maintenance',
    difficulty: 3,
    role: 'Frontend-heavy',
    solution: '解決了團隊內部文件散落在 Word/PDF 難以檢索與版控的問題。透過 Markdown 與自動化部署，讓技術文件「活」起來，隨時保持最新狀態。',
  },
  {
    title: 'Vue 3 自學全攻略',
    description: '從零開始的學習筆記，系統化整理 Vue 3 核心概念。',
    demo_url: undefined,
    technologies: ['Vue 3', 'Pinia', 'TypeScript'],
    is_featured: false,
    status: 'Completed',
    difficulty: 3,
    role: 'Frontend-heavy',
    solution: '將碎片化的知識點（如 Composition API, Pinia）結構化，並附上實戰範例，幫助新手快速跨越學習門檻。',
  },
]

export const DEFAULT_EDUCATION: Education[] = [
  { school_name: '國立勤益科技大學', department: '資訊工程學系', degree: '大學畢業', period: '2017/06 - 2021/06' },
]

export const DEFAULT_CERTIFICATIONS: Certification[] = [
  { name: 'SSE Java 程式語言國際認證', category: '程式語言' },
  { name: 'SSE Python 程式語言國際認證', category: '程式語言' },
  { name: '不動產經紀營業員', category: '不動產' },
  { name: 'SSE Adobe Photoshop CC', category: '多媒體' },
  { name: 'TQC 軟體基礎常識', category: '資訊技術' },
]

export const DEFAULT_BIO_SECTIONS: BioSection[] = [
  { title: '專長', text: '分析問題,找出癥結點,整合資源,有跨領域的應對能力,不設限的解決問題。' },
  { title: '特點', text: '思考敏捷,能運用適當工具解決事情,善言詞,具領導能力。會主動關心新進同仁,協助他們上手業務。' },
  { title: '求學階段', text: '大學獨立開發物聯網液肥控制系統,使用 MATLAB 設計使用者介面,交互控制感測器接收並控制信號,最後結合資料庫供日後參考改進作物。' },
  { title: '天思數位科技', text: '負責全端工程師兩年半,網頁維護、Cordova App 維運、政府系統、標管系統、MIS 等客製化系統開發。前端使用 Vue.js,後端使用 ASP.NET Core。' },
  { title: '目前', text: '任職於緯創軟體,駐派華邦電,持續在全端開發領域深耕,同時積極探索 AI 輔助開發。' },
]
