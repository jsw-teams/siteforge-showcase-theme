---
title: "頁面與動態 slot"
description: "用 content/pages 和 Siteforge slot 低成本定制首頁、搜尋頁和其他特殊頁面。"
updated: "2026-06-28"
translationKey: "docs-pages-and-slots"
section: "基本操作"
order: 2
sitemap: true
---

## Pages 是可編輯頁面結構

`content/pages/<slug>/index.<locale>.md` 是 Siteforge 的一等定制面。頁面 Markdown 可以直接書寫靜態 HTML，適合維護標題、區塊、少量元件位置和頁面腳本。

目前 product-docs 主題也按這個契約組織：首頁在 `content/pages/home/index.zh-TW.md`，搜尋頁在 `content/pages/search/index.zh-TW.md`。文件入口屬於多篇文件集合，放在 `content/docs/index/index.zh-TW.md`，這樣左側文件導覽、搜尋索引和目前文件目錄都能按文件模型生成。

## 動態互動 slot

當頁面需要「位置由 Markdown 決定，元件由構建器生成，並由主題腳本接管互動」時，使用 Siteforge slot：

```html
<!-- siteforge:post-list -->
<!-- siteforge:pagination -->
<!-- siteforge:archive-list -->
<!-- siteforge:terms -->
<!-- siteforge:search-panel -->
<!-- siteforge:languages -->
```

slot 是完整元件，不需要在後面補「這裡會顯示結果」這類說明。搜尋頁應先用頁面自己的 header 寫清意圖，然後直接放置：

```html
<!-- siteforge:search-panel -->
```

## 開發一個動態互動 slot

以 `featured-docs` 為例：Markdown 頁面只寫一行註釋，構建器讀取 `content/docs/*` 的文件資料，生成推薦文件列表，主題腳本再處理互動。

```html
<!-- siteforge:featured-docs -->
```

程式碼裡對應駝峰 key：

```js
featuredDocs
```

### 1. 讓內容模型帶上資料

`src/lib/content.mjs` 已經有 `loadDocs()`、`loadBlogData()` 和 `buildHtmlPages()` 三條關鍵鏈路。若元件只需要文件標題、摘要、分組和連結，直接復用 `loadDocs()` 返回的 `docs`；若需要額外欄位，例如 `featured: true`，就在 `loadDocs()` 的物件中補欄位。

搜尋類元件還要注意 `buildSearchIndex()`。目前主題只把 docs 放進搜尋索引，因此搜尋 slot 天然只命中文件內容。

### 2. 把資料傳給主題模板

`buildHtmlPages()` 會按語言整理 `docsByLocale`，再傳給普通頁面和文件頁面模板。這讓 `content/pages/about`、`content/pages/search` 和 `content/docs/*` 都能拿到同一份 docs 資料。

### 3. 在主題渲染裡註冊 slot

在 `src/lib/theme-html.mjs` 的頁面渲染邏輯中生成元件 HTML：

```js
const main = replaceSlots(pageContent.html, {
  featuredDocs: renderFeaturedDocs(docs)
});
```

`featuredDocs` 就是 `<!-- siteforge:featured-docs -->` 的目標。HTML 是元件外殼，不是讓內容作者手寫的裝飾。

### 4. 在 theme.yml 掛腳本和樣式

```yaml
features:
  featuredDocs: true
featureScripts:
  featuredDocs: scripts/featured-docs.js
featureStyles:
  featuredDocs: styles/featured-docs.css
featureCategories:
  featuredDocs: necessary
```

### 5. 在 Markdown 裡使用

```html
<section class="intro" aria-labelledby="intro-title">
  <h1 id="intro-title">先讀這幾篇</h1>
</section>

<!-- siteforge:featured-docs -->
```

構建時，`replaceSlots()` 會把 `<!-- siteforge:featured-docs -->` 轉成 `slots.featuredDocs`。內容作者控制位置，`content.mjs` 提供結構化內容，主題模板生成元件，主題腳本接管互動。
