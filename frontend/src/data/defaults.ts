import type { Profile, WorkExperience, Skill, Project, Education, Certification, BioSection } from '../types'

export const DEFAULT_PROFILE: Profile = {
  full_name: '謝承羲',
  title: '全端工程師 | 技術與業務的連結者',
  tagline: '用邏輯構建系統，用感性連結人心',
  quote: '做一個對社會有用的人，才有活著的意義 ✨',
  location: '台中市南區 / 駐派華邦電',
  avatar_url: 'https://avatars.githubusercontent.com/u/161303806?v=4', // 預設頭像
  about_me: `
我是承羲，一名擅長將 **複雜技術語言轉化為業務邏輯** 的全端工程師。

身為 ENFP，我擁有高度的同理心與溝通熱忱。我不僅僅是寫 Code，更熱衷於 **理解使用者背後的真實需求**。我的技術棧橫跨 C# .NET Core 與 Vue 3，並積極探索 **AI MCP 協議** 在開發流程中的應用。

我有房地產與金融投資背景，這訓練了我以 **ROI (投資回報率)** 的思維來審視每一行程式碼的價值。我致力於打造不僅穩定，且能為企業帶來實質效益的軟體解決方案。
  `,
  total_experience: '3年+ 全端開發經驗',
  github_url: 'https://github.com/cckawaii0808',
  website_url: 'https://cckawaii0808.github.io/',
  connect_with_me: {
    text: '除了程式與邏輯，我也熱衷於生活中的各種探索。如果你也喜歡羽球、理財或 AI，歡迎隨時找我交流！',
    hobbies: ['羽球', '金融投資', 'AI 開發', '閱讀'],
  }
}

export const DEFAULT_WORK_EXPERIENCES: WorkExperience[] = [
  {
    company_name: '緯創軟體 (Wistron ITS)',
    job_title: '全端工程師 (駐派華邦電)',
    industry: '半導體製造 / 企業級系統開發',
    location: '新竹科管局 / 遠端',
    start_date: '2026/01',
    end_date: '',
    is_current: true,
    description: '在大型半導體企業的嚴謹環境下，負責 QM (品質管理) 與 SD (銷售) 模組的系統開發與維護。重點在於 **確保高併發環境下的系統穩定性**，並優化既有 .NET Core + Vue 3 架構，提升維護效率。',
    technologies: ['C# .NET Core', 'Vue 3', 'MS SQL', 'System Stability', 'Enterprise Architecture'],
  },
  {
    company_name: '天思數位科技',
    job_title: '全端工程師',
    industry: '互聯網 / 政府專案',
    location: '台中市西屯區',
    start_date: '2023/08',
    end_date: '2026/01',
    is_current: false,
    description: '主導多個政府與企業客製化系統開發。從需求訪談、資料庫設計到前後端實作，獨立完成 **跨平台整合** (Web + Hybrid App)。成功串接 ChatGPT API 優化內部工作流，並撰寫技術文件降低團隊溝通成本。',
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
    category: 'AI 驅動開發 (AI-DD)',
    description: '善用 Claude / ChatGPT 結合 MCP 協議，打造高效的自動化開發工作流。不只是使用者，更是 AI 工具的整合者。',
    tags: ['Prompt Engineering', 'MCP Protocol', 'AI Tools Integration'],
    proficiency: 4,
  },
  {
    category: '跨領域溝通與協作',
    description: 'ENFP 特質讓我能輕鬆跨越工程師與 PM/業務 之間的溝通鴻溝。擅長將技術限制轉化為商業決策選項。',
    tags: ['需求分析', '技術轉譯', '團隊協作', '同理心'],
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
  { title: '目前', text: '任職於緯創軟體,駐派華邦電,持續在全端開發領域深耕,同時積極探索 AI 輔助開發的可能性。' },
]
