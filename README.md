# Jason's Portfolio Website

這是一個展示軟體工程師 Jason Xie (謝弘翊) 作品集的靜態網站。使用 Vite 建置，並透過 GitHub Actions 自動部署。

## 📁 專案結構

- `projects.json`: 儲存專案作品的數據，新增或修改作品請編輯此文件。
- `index.html`: 個人主頁。
- `project-detail.html`: 作品詳情頁。
- `src/`: (如果未來有更多源碼，建議移入 src 目錄)

## 🚀 開發指南

### 1. 安裝依賴

首次使用請先安裝 Node.js (推薦 v20+)，然後執行：

```bash
npm install
```

### 2. 啟動開發伺服器

```bash
npm run dev
```

瀏覽器將自動開啟本地預覽地址。

### 3. 建置生產版本

```bash
npm run build
```

建置後的檔案將位於 `dist` 資料夾。

### 4. 本地預覽生產版本

```bash
npm run preview
```

## 🔒 安全性說明

- **DOMPurify**: 專案已集成 DOMPurify，當解析 `projects.json` 中的 HTML 內容時，會自動過濾潛在的 XSS 攻擊腳本。
- **Strict Mode**: 所有腳本均採用 ES Modules 模式。

## 📦 部署

本專案配置了 GitHub Actions workflows。

1. 確保 Repository 設定中，GitHub Pages Source 選擇 "GitHub Actions"。
2. 推送代碼至 `main` 分支將自動觸發部署。

## 📝 如何新增作品

1. 打開 `projects.json`。
2. 在 `projects` 陣列中新增一個物件。
3. 填寫 `id` (唯一), `title`, `description` 等欄位。
4. 將圖片放入 `images` 資料夾。
5. 提交並推送，網站將自動更新。
