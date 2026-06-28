---
title: "Siteforge 文件"
description: "從站點配置、內容目錄、主題擴展到 Agent discovery 的 Siteforge 入門路徑。"
updated: "2026-06-28"
translationKey: "docs-index"
section: "開始使用"
order: 1
sitemap: true
---

<section class="docs-gateway" aria-labelledby="docs-gateway-title">
  <p class="eyebrow">Get started</p>
  <h2 id="docs-gateway-title">先跑通站點，再進入主題</h2>
  <p>Siteforge 的使用路徑和主流文件站類似：先確認站點級配置和內容目錄，再按頁面類型進入主題層。普通內容維護者只需要理解 Markdown 和 YAML，開發者則可以在主題邊界內完成產品介紹頁、文件頁和互動元件。</p>
  <div class="docs-flow" aria-label="Siteforge 使用路徑">
    <span>config.yml</span><span>content/</span><span>themes/&lt;name&gt;</span><span>dist</span>
  </div>
</section>

<section class="docs-quickstart" aria-labelledby="docs-quickstart-title">
  <p class="eyebrow">Direct use</p>
  <h2 id="docs-quickstart-title">直接使用</h2>
  <p>只寫部落格或維護普通內容站時，不需要先理解主題開發。按這個路徑走：</p>
  <ol>
    <li><strong>克隆專案。</strong><code>git clone https://github.com/jsw-teams/siteforge.git</code></li>
    <li><strong>進入目錄。</strong><code>cd siteforge</code></li>
    <li><strong>安裝依賴。</strong><code>npm install</code></li>
    <li><strong>先做檢查。</strong><code>npm run check</code> 用來確認目前輸出、主題資源和發現入口是健康的。</li>
    <li><strong>生成靜態文件。</strong><code>npm run generate</code> 類似 <code>hexo generate</code> / <code>hexo g</code>。</li>
    <li><strong>本地預覽。</strong><code>npm run server</code> 類似 <code>hexo server</code> / <code>hexo s</code>，預設地址是 <code>http://127.0.0.1:4173/</code>。</li>
  </ol>
</section>

### 你會改哪些文件

先從 `config.yml` 開始：站點名、多語言、導覽、robots、llms、feed、discovery 和第三方腳本都可以在這裡變成結構化輸入。

內容放進 `content/`：普通頁面用 `content/pages`，多篇產品文件用 `content/docs`，文章或鏡像內容繼續放在對應內容目錄。

主題放進 `themes/<name>`：產品介紹頁的視覺、文件頁的左側導覽、搜尋頁樣式、consent、lightbox、輪播和頁腳都應該先在主題層解決。

<section aria-labelledby="docs-cards-title">
  <p class="eyebrow">Documentation</p>
  <h2 id="docs-cards-title">按階段閱讀文件</h2>
  <!-- siteforge:doc-cards -->
</section>
