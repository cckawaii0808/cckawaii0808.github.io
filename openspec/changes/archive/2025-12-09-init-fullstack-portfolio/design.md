# Design: 前後端分離個人作品集

## Context
- 網站主人希望能透過後台介面管理作品集，而非直接修改程式碼
- 使用 Zeabur 提供的 PostgreSQL 作為資料庫
- 前端部署在 GitHub Pages (免費)，後端部署在 Zeabur

## Goals / Non-Goals

### Goals
- 建立可維護的前後端分離架構
- 提供簡單易用的後台管理介面
- 確保環境變數安全，不洩漏到 Git

### Non-Goals
- 複雜的權限管理系統 (只有一個管理員)
- 多語言支援 (目前只需繁體中文)
- SEO 優化 (可後續處理)

## Decisions

### 1. Monorepo 結構
**決定**: 使用單一 Repository 管理前後端
**原因**:
- 方便同時開發和維護
- 共享 TypeScript 型別定義
- 簡化 CI/CD 設定

### 2. 認證方案
**決定**: 使用簡單的 JWT + 環境變數密碼
**原因**:
- 只有一個管理員，不需要複雜的認證系統
- Supabase Auth 對此場景過於複雜
**替代方案**: Supabase Auth (棄用，過於複雜)

### 3. ORM 選擇
**決定**: 使用 Prisma
**原因**:
- TypeScript 原生支援，型別安全
- 自動產生 Migration
- 優秀的開發體驗

### 4. 環境變數管理
**決定**: 使用 .env 檔案 + .env.example 範例
**結構**:
```
/.env              # 實際環境變數 (git ignored)
/.env.example      # 範例檔案 (提交到 git)
/frontend/.env     # 前端環境變數
/backend/.env      # 後端環境變數
```

## Risks / Trade-offs

| 風險 | 緩解措施 |
|------|----------|
| GitHub Pages 不支援 SPA 路由 | 使用 404.html 重導向技巧 |
| 後端冷啟動延遲 (Zeabur 免費方案) | 可接受，個人網站流量低 |
| PostgreSQL 連線資訊洩漏 | 嚴格設定 .gitignore |

## Migration Plan
1. 建立新的專案結構，不刪除舊檔案
2. 測試新網站功能正常
3. 確認部署成功後，再清理舊檔案
4. 更新 GitHub Pages 設定

## Open Questions
- [ ] 是否需要圖片上傳功能？(可使用 Cloudinary 或 Supabase Storage)
- [ ] 是否需要訪客留言功能？
