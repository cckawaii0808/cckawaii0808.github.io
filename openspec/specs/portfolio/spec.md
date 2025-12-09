# portfolio Specification

## Purpose
TBD - created by archiving change init-fullstack-portfolio. Update Purpose after archive.
## Requirements
### Requirement: 作品集資料管理
系統 SHALL 提供作品集資料的 CRUD 功能，包含標題、描述、網址、圖片、標籤、排序和可見性設定。

#### Scenario: 取得所有可見作品集
- **WHEN** 訪客請求作品集列表
- **THEN** 系統回傳所有 is_visible=true 的作品集，依 sort_order 排序

#### Scenario: 管理員新增作品
- **WHEN** 管理員已認證並提交新作品資料
- **THEN** 系統建立新的作品集記錄並回傳成功

#### Scenario: 管理員更新作品
- **WHEN** 管理員已認證並提交更新資料
- **THEN** 系統更新對應的作品集記錄

#### Scenario: 管理員刪除作品
- **WHEN** 管理員已認證並請求刪除
- **THEN** 系統刪除對應的作品集記錄

---

### Requirement: 個人資料管理
系統 SHALL 提供個人資料的讀取和更新功能，包含姓名、簡介、頭像和社群連結。

#### Scenario: 取得個人資料
- **WHEN** 訪客請求個人資料
- **THEN** 系統回傳個人資料內容

#### Scenario: 管理員更新個人資料
- **WHEN** 管理員已認證並提交更新資料
- **THEN** 系統更新個人資料記錄

---

### Requirement: 技能管理
系統 SHALL 提供技能列表的管理功能，包含技能名稱、分類、熟練度和排序。

#### Scenario: 取得技能列表
- **WHEN** 訪客請求技能列表
- **THEN** 系統回傳所有技能，依 sort_order 排序

#### Scenario: 管理員管理技能
- **WHEN** 管理員已認證並提交技能異動
- **THEN** 系統執行對應的新增/更新/刪除操作

---

### Requirement: 管理員認證
系統 SHALL 提供簡單的管理員認證機制，保護後台管理功能。

#### Scenario: 管理員登入成功
- **WHEN** 提供正確的管理員密碼
- **THEN** 系統回傳 JWT Token

#### Scenario: 管理員登入失敗
- **WHEN** 提供錯誤的密碼
- **THEN** 系統回傳 401 Unauthorized

#### Scenario: 未認證存取受保護資源
- **WHEN** 未提供有效 Token 存取受保護 API
- **THEN** 系統回傳 401 Unauthorized

---

### Requirement: 環境變數安全
系統 SHALL 將所有敏感資訊儲存在環境變數中，並確保不會提交到版本控制。

#### Scenario: .env 檔案被 git 忽略
- **WHEN** 執行 git status
- **THEN** .env 檔案不會出現在追蹤清單中

#### Scenario: 提供 .env.example 範例
- **WHEN** 新開發者 clone 專案
- **THEN** 可參考 .env.example 建立自己的 .env 檔案

