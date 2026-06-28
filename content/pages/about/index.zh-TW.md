---
title: "關於 Siteforge"
description: "Siteforge 將內容、主題和站務輸出分層，讓內容站、產品介紹和文件站更容易維護，也更容易被 Agent 繼續開發。"
updated: "2026-06-28"
translationKey: "about"
sitemap: true
---

## 為什麼寫 Siteforge

很多普通內容站點並不需要每次都重新做一套前端工程。它們真正需要的是穩定的內容目錄、可複製的主題邊界、基礎 SEO、站點地圖、訂閱、搜尋、隱私偏好，以及可被 Agent 讀取的發現入口。

Siteforge 把這些重複工作收進一個靜態構建器裡：站點級資訊放在 `config.yml`，內容放在 `content/`，主題放在 `themes/<name>/`，生成物輸出到 `dist/`。這樣內容維護者可以專注 Markdown，主題開發者可以專注模板、樣式和腳本，構建器負責把站務文件一併生成出來。

## 適合誰

- 想用 Hexo 式心智模型管理內容，但需要更明確主題邊界的開發者。
- 想把產品介紹、產品文件和普通頁面靜態化的開源專案或小團隊。
- 希望讓 Codex、Claude 或其他 Agent 能快速讀懂並二次開發站點的人。

## 當前站點的角色

這個站點介紹的是 Siteforge 專案本身：它為什麼存在、怎麼直接使用、如何組織內容和文件，以及怎樣在主題邊界內進行二次開發。當前站點同時也是一個產品展示 + 產品文件主題的示例，因此 footer 指向本主題原始碼，方便繼續複用或改造。

## 開源協議與歸屬

Siteforge 使用 `AGPL-3.0-or-later` 協議發布。基於 Siteforge 修改、分發、公開部署或二次開發的版本，應按 AGPL 要求繼續開放對應原始碼。

本主題基於 Siteforge 二次開發，主題倉庫見 [jsw-teams/siteforge-showcase-theme](https://github.com/jsw-teams/siteforge-showcase-theme)。原始 Siteforge 倉庫見 [jsw-teams/siteforge](https://github.com/jsw-teams/siteforge)，公開 NOTICE 見 [/NOTICE](/NOTICE)。
