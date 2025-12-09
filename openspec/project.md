# Project Context

## Purpose
CC的全新個人網站，採用前後端分離架構。前端使用 Vue 框架，後端使用 Express + Supabase。提供後台管理介面，可動態管理作品集內容。

## Tech Stack

### 前端 (Frontend)
- **框架**: Vue 3 (Composition API)
- **建構工具**: Vite
- **程式語言**: TypeScript
- **路由**: Vue Router
- **狀態管理**: Pinia
- **HTTP 客戶端**: Axios 或 @supabase/supabase-js
- **樣式**: SCSS + Tailwind CSS
- **圖示**: Iconify
- **部署平台**: GitHub Pages (前台) / Zeabur (後台管理)

### 後端 (Backend)
- **框架**: Node.js + Express
- **程式語言**: TypeScript
- **ORM**: Prisma 或直接使用 Supabase Client
- **認證**: Supabase Auth
- **部署平台**: Zeabur

### 資料庫 (Database)
- **類型**: PostgreSQL
- **平台**: Supabase (Zeabur 整合)
- **功能**:
  - 作品集資料 (名稱、描述、網址、圖片、排序)
  - 個人資訊
  - 技能列表

## Project Conventions

### Code Style
- 使用 ESLint + Prettier 進行程式碼格式化
- Vue 組件使用 `<script setup>` 語法
- TypeScript 嚴格模式
- 檔案命名: 組件使用 PascalCase，其他檔案使用 kebab-case
- 中文內容使用繁體中文 (台灣)
- API 命名: RESTful 風格

### Architecture Patterns
- **前後端分離**: 前端透過 API 取得資料
- **Monorepo 結構** (建議):
  ```
  /
  ├── frontend/          # Vue 前端專案
  │   ├── src/
  │   │   ├── assets/
  │   │   ├── components/
  │   │   ├── views/
  │   │   ├── router/
  │   │   ├── stores/      # Pinia stores
  │   │   ├── composables/
  │   │   ├── api/         # API 呼叫封裝
  │   │   └── types/       # TypeScript 型別
  │   └── package.json
  │
  ├── backend/           # Express 後端專案
  │   ├── src/
  │   │   ├── routes/
  │   │   ├── controllers/
  │   │   ├── services/
  │   │   ├── middleware/
  │   │   └── types/
  │   └── package.json
  │
  └── package.json       # Workspace 設定
  ```
- 響應式設計 (RWD)，支援桌面、平板、手機

### API 設計
```
GET    /api/portfolio          # 取得所有作品
GET    /api/portfolio/:id      # 取得單一作品
POST   /api/portfolio          # 新增作品 (需認證)
PUT    /api/portfolio/:id      # 更新作品 (需認證)
DELETE /api/portfolio/:id      # 刪除作品 (需認證)

GET    /api/profile            # 取得個人資料
PUT    /api/profile            # 更新個人資料 (需認證)

GET    /api/skills             # 取得技能列表
POST   /api/skills             # 新增技能 (需認證)
```

### Testing Strategy
- 單元測試: Vitest (前端) / Jest (後端)
- API 測試: Supertest
- 建議: 部署前執行 `npm run build` 確認無錯誤

### Git Workflow
- 主分支: `master` (原始碼)
- 部署分支: `gh-pages` (前端靜態檔案)
- Commit 訊息格式: Conventional Commits (feat/fix/docs/style/refactor)

## Domain Context
- 網站主人 CC，1999 年 8 月出生
- 2021 年畢業於國立勤益科技大學 (NCUT)
- 主要展示:
  - 個人簡介 (可後台編輯)
  - 技能專長 (可後台管理)
  - 作品集 (可後台 CRUD)
  - 聯絡資訊

### 資料庫 Schema 規劃
```sql
-- 作品集
CREATE TABLE portfolios (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  url VARCHAR(500),
  image_url VARCHAR(500),
  tags TEXT[],
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 個人資料
CREATE TABLE profile (
  id UUID PRIMARY KEY,
  name VARCHAR(100),
  bio TEXT,
  avatar_url VARCHAR(500),
  social_links JSONB,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 技能
CREATE TABLE skills (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  proficiency INTEGER CHECK (proficiency BETWEEN 1 AND 100),
  sort_order INTEGER DEFAULT 0
);
```

## Important Constraints
- 前端需相容 GitHub Pages 靜態網站限制 (SPA 需設定 404.html)
- 後端 API 需設定 CORS 允許前端網域
- 需維持響應式設計，支援各種螢幕尺寸
- 開發環境: Windows
- 後台管理介面需要登入認證 (使用 Supabase Auth)

## External Dependencies
- **Supabase**: 資料庫 + 認證 + 即時訂閱
- **Zeabur**: 後端部署 + Supabase 整合
- **GitHub Pages**: 前端靜態網站部署
- **外部連結**:
  - YouTube 頻道
  - 社群媒體連結
  - GitHub 個人檔案
