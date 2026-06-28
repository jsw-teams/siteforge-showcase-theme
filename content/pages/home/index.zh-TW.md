---
title: "Siteforge"
description: "Siteforge 是一個偏 Hexo 思路的靜態網站構建器，面向內容站、產品介紹頁、產品文件和 Agent 友好的二次開發。"
updated: "2026-06-28"
translationKey: "home"
sitemap: true
---

<section class="product-hero" aria-labelledby="home-title">
  <div class="hero-copy">
    <p class="eyebrow">Static site builder</p>
    <h1 id="home-title">為內容站和 Agent 二次開發準備的靜態構建器</h1>
    <p class="lead">Siteforge 把內容、主題和站務輸出放進清晰的目錄邊界：內容團隊維護 Markdown，開發者擴展主題，構建器負責 SEO、搜尋、sitemap、feed、llms 與 Agent discovery。</p>
    <div class="hero-actions">
      <a class="button-link" href="/zh-TW/docs/">閱讀指南</a>
      <a class="button-link button-link-secondary" href="https://github.com/jsw-teams/siteforge">查看 GitHub</a>
    </div>
  </div>
  <figure class="hero-product-mark">
    <img src="/assets/siteforge-icon.png" alt="Siteforge 專案圖示" width="512" height="512" loading="eager" decoding="async" fetchpriority="high">
  </figure>
</section>

<section class="quickstart-band" aria-labelledby="quickstart-title">
  <p class="eyebrow">Quick start</p>
  <h2 id="quickstart-title">直接使用：克隆後按目的執行</h2>
  <div class="quickstart-runbook" aria-label="直接使用命令路徑">
    <div>
      <span>取得專案</span>
      <pre><code>git clone https://github.com/jsw-teams/siteforge.git</code></pre>
    </div>
    <div>
      <span>進入目錄</span>
      <pre><code>cd siteforge</code></pre>
    </div>
    <div>
      <span>安裝依賴</span>
      <pre><code>npm install</code></pre>
    </div>
    <div>
      <span>先做檢查</span>
      <pre><code>npm run check</code></pre>
    </div>
    <div>
      <span>生成靜態文件</span>
      <pre><code>npm run generate</code></pre>
    </div>
    <div>
      <span>本地預覽</span>
      <pre><code>npm run server</code></pre>
    </div>
  </div>
  <a class="quickstart-doc-link" href="/zh-TW/docs/">查看完整使用文件</a>
</section>

<section class="proof-band" aria-labelledby="proof-title">
  <div class="section-heading">
    <p class="eyebrow">Production checks</p>
    <h2 id="proof-title">預設主題已經過實站檢查</h2>
  </div>
  <p class="proof-copy">README 給出了可複核的公開報告：<a href="https://pagespeed.web.dev/analysis/https-blog-js-gripe-en/ifrxjzn6xy?hl=zh-cn">PageSpeed 原始報告</a>顯示桌面端四項 100，行動端效能 98；Cloudflare Agent 檢查通過，說明預設輸出已經覆蓋輕量渲染、可訪問性、搜尋引擎基礎資訊和 Agent 發現入口。</p>
  <div class="proof-grid">
    <article><strong>100</strong><span>桌面端四項全滿</span></article>
    <article><strong>98</strong><span>行動端效能</span></article>
    <article><strong>3/3</strong><span>Agent 檢查通過</span></article>
  </div>
  <div class="report-carousel" data-report-carousel aria-label="公開檢查截圖">
    <button class="report-control report-control-prev" type="button" data-report-prev aria-label="上一張報告">‹</button>
    <div class="report-track">
      <figure class="is-active" data-report-slide>
      <img data-lightbox src="/assets/readme/pagespeed-desktop.png" alt="PageSpeed 桌面端報告截圖" width="1400" height="786" loading="lazy" decoding="async">
      <figcaption>PageSpeed desktop report</figcaption>
      </figure>
      <figure data-report-slide>
      <img data-lightbox src="/assets/readme/pagespeed-mobile.png" alt="PageSpeed 行動端報告截圖" width="1400" height="786" loading="lazy" decoding="async">
      <figcaption>PageSpeed mobile report</figcaption>
      </figure>
      <figure data-report-slide>
      <img data-lightbox src="/assets/readme/cloudflare-agent-check.png" alt="Cloudflare Agent 檢查通過截圖" width="1400" height="786" loading="lazy" decoding="async">
      <figcaption>Cloudflare Agent check</figcaption>
      </figure>
    </div>
    <button class="report-control report-control-next" type="button" data-report-next aria-label="下一張報告">›</button>
    <div class="report-dots" aria-label="報告切換">
      <button type="button" class="is-active" data-report-dot aria-label="查看桌面端 PageSpeed 報告"></button>
      <button type="button" data-report-dot aria-label="查看行動端 PageSpeed 報告"></button>
      <button type="button" data-report-dot aria-label="查看 Cloudflare Agent 檢查"></button>
    </div>
  </div>
</section>

<section class="feature-band compact-feature-band" aria-labelledby="features-title">
  <div class="section-heading">
    <p class="eyebrow">Why Siteforge</p>
    <h2 id="features-title">先把邊界劃清，再讓主題自由生長</h2>
  </div>
  <div class="feature-grid">
    <article>
      <h3>內容歸內容</h3>
      <p><code>content/</code> 承載文章、頁面和文件；Markdown 可以寫正文，也可以宣告動態 slot 掛載點。</p>
    </article>
    <article>
      <h3>主題歸主題</h3>
      <p><code>themes/&lt;name&gt;</code> 管模板、樣式、腳本和主題配置，適合快速做產品站、文件站或品牌化頁面。</p>
    </article>
    <article>
      <h3>站務交給構建器</h3>
      <p>SEO、robots、feed、sitemap、llms、OpenAPI 和 MCP server card 從配置生成，方便人和 Agent 一起維護。</p>
    </article>
  </div>
</section>
