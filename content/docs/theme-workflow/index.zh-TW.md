---
title: "主題開發邊界"
description: "按 Siteforge 的 theme-first workflow 開發產品介紹與文件站主題。"
updated: "2026-06-28"
translationKey: "docs-theme-workflow"
section: "二次開發"
order: 5
sitemap: true
---

## Theme-first workflow

Siteforge 的 AGENTS.md 建議先改主題，再改構建器：

1. 複製 `themes/default` 到 `themes/<your-theme>`。
2. 把主題目錄名和 `theme.name` 改成專案名。
3. 在 `style.css` 中改全局視覺語言。
4. 在 `styles/*.css` 中改頁面或功能樣式。
5. 在 `templates/*.html` 中改 HTML 結構。
6. 在 `scripts/*.js` 中加可選行為，並通過 `theme.yml` 暴露。

## 什麼時候改 src

只有當你在改進框架本身時才進入 `src/`，例如載入配置、添加頁面類型、向主題模板暴露新的結構化資料，或改進 feed、sitemap、headers 和 agent discovery。

顏色、間距、單個站點首頁、footer 文案、評論 provider、統計 token、圖片資源，都應留在主題或內容層。

## 當前 product-docs 主題

當前主題是「產品介紹 + 產品文件」類型網站主題。首頁負責解釋 Siteforge 專案價值，文件頁負責承載多篇 Markdown 文件，並提供左側文件列表與當前頁目錄。
