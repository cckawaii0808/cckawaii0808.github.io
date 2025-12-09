# Implementation Tasks

## 1. 專案清理與初始化
- [x] 1.1 建立 .gitignore 檔案 (排除 node_modules, .env, dist 等)
- [x] 1.2 建立 .env.example 範例檔案
- [x] 1.3 建立 .env 環境變數檔案 (含 PostgreSQL 連線資訊)
- [x] 1.4 清理舊的 HTML/CSS/JS 檔案 (保留 openspec、.claude、.github)

## 2. 前端專案建立 (frontend/)
- [x] 2.1 使用 Vite 初始化 Vue 3 + TypeScript 專案
- [x] 2.2 安裝相依套件 (Vue Router, Pinia, Axios, Tailwind CSS, Iconify)
- [x] 2.3 設定 Tailwind CSS
- [x] 2.4 建立基本目錄結構 (components, views, stores, api, types)
- [x] 2.5 建立首頁 Layout 組件 (響應式設計，手機優先)
- [x] 2.6 建立作品集列表頁面 (響應式網格，手機優先)
- [x] 2.7 建立 API 呼叫封裝
- [x] 2.8 設定 GitHub Pages 部署 (vite.config.ts + 404.html)

## 3. 後端專案建立 (backend/)
- [x] 3.1 初始化 Express + TypeScript 專案
- [x] 3.2 安裝相依套件 (Prisma, cors, dotenv, helmet, jsonwebtoken)
- [x] 3.3 設定 Prisma 連接 PostgreSQL
- [x] 3.4 建立資料庫 Schema (portfolios, profile, skills)
- [ ] 3.5 執行資料庫 Migration (需要 DATABASE_URL)
- [x] 3.6 建立 API Routes (portfolio, profile, skills, auth)
- [x] 3.7 建立 CORS 設定
- [x] 3.8 建立健康檢查 endpoint

## 4. 後台管理功能
- [x] 4.1 建立後台登入頁面 (響應式設計)
- [x] 4.2 建立作品集管理頁面 (CRUD，響應式設計)
- [x] 4.3 建立個人資料編輯頁面 (響應式設計)
- [x] 4.4 建立技能管理頁面 (響應式設計)

## 5. 部署設定
- [x] 5.1 設定前端 GitHub Actions 自動部署到 GitHub Pages
- [ ] 5.2 設定後端 Zeabur 部署 (手動於 Zeabur 平台設定)
- [ ] 5.3 測試前後端連線 (需要實際部署後測試)

## 響應式設計說明
所有頁面均採用 **Mobile-First** 設計原則：
- 手機：單欄式佈局，可觸控的按鈕大小
- 平板：兩欄式網格
- 桌面：三欄式網格，側邊導航
- 使用 Tailwind CSS 的響應式斷點：`sm:`, `md:`, `lg:`
