---
title: "自訂預設主題"
description: "預設主題可直接使用；需要品牌化時先替換內容與 source-assets。"
updated: "2026-06-28"
translationKey: "docs-customization"
section: "自訂"
order: 4
sitemap: true
---

## 先替換內容和資源

如果預設主題已經滿足你的網站需求，不需要先理解主題開發。

優先修改：

- `config.yml`：站點名、描述、作者、語言、導覽、頁腳、robots、llms、feed、插件開關和 discovery。
- `content/posts/`：文章。
- `content/pages/`：首頁、關於頁、歸檔頁、分類頁、標籤頁、搜尋頁或其他普通頁面。
- `themes/<name>/source-assets/`：logo、favicon、OG 圖、截圖和其他主題資源。

## 什麼時候進入主題目錄

只有當你需要新的布局、元件、視覺體系或互動行為時，再進入 `themes/<name>/`。

樣式通常改 `style.css` 和 `styles/*.css`；模板改 `templates/*.html`；瀏覽器行為改 `scripts/*.js`，再通過 `theme.yml` 暴露。
