# Change: 初始化前後端分離的個人作品集網站

## Why
目前專案是舊的靜態 HTML 網站，需要重新建立一個現代化的前後端分離架構，讓網站主人可以透過後台管理介面動態管理作品集內容，而不需要直接修改程式碼。

## What Changes
- 清理舊的 HTML/CSS/JS 檔案
- 建立 Monorepo 專案結構 (frontend + backend)
- **前端**: Vue 3 + Vite + TypeScript + Tailwind CSS
- **後端**: Express + TypeScript + Prisma
- **資料庫**: PostgreSQL (Zeabur)
- 建立環境變數管理機制 (.env)
- 設定 .gitignore 排除敏感資訊
- 建立資料庫 Schema (portfolios, profile, skills)

## Impact
- Affected specs: `portfolio` (新建)
- Affected code: 整個專案結構重建
- **BREAKING**: 完全取代舊網站

## 部署架構
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   前端 (Vue)    │────▶│  後端 (Express) │────▶│   PostgreSQL    │
│  GitHub Pages   │ API │     Zeabur      │     │     Zeabur      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```
