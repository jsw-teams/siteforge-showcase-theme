---
title: "Siteforge"
description: "Siteforge 是一个偏 Hexo 思路的静态网站构建器，面向内容站、产品介绍页、产品文档和 Agent 友好的二次开发。"
updated: "2026-06-28"
translationKey: "home"
sitemap: true
---

<section class="product-hero" aria-labelledby="home-title">
  <div class="hero-copy">
    <p class="eyebrow">Static site builder</p>
    <h1 id="home-title">为内容站和 Agent 二次开发准备的静态构建器</h1>
    <p class="lead">Siteforge 把内容、主题和站务输出放进清晰的目录边界：内容团队维护 Markdown，开发者扩展主题，构建器负责 SEO、搜索、sitemap、feed、llms 与 Agent discovery。</p>
    <div class="hero-actions">
      <a class="button-link" href="/zh-CN/docs/">阅读指南</a>
      <a class="button-link button-link-secondary" href="https://github.com/jsw-teams/siteforge">查看 GitHub</a>
    </div>
  </div>
  <figure class="hero-product-mark">
    <img src="/assets/siteforge-icon.png" alt="Siteforge 项目图标" width="512" height="512" loading="eager" decoding="async" fetchpriority="high">
  </figure>
</section>

<section class="quickstart-band" aria-labelledby="quickstart-title">
  <p class="eyebrow">Quick start</p>
  <h2 id="quickstart-title">直接使用：克隆后按目的执行</h2>
  <div class="quickstart-runbook" aria-label="直接使用命令路径">
    <div>
      <span>获取项目</span>
      <pre><code>git clone https://github.com/jsw-teams/siteforge.git</code></pre>
    </div>
    <div>
      <span>安装依赖</span>
      <pre><code>npm install</code></pre>
    </div>
    <div>
      <span>先做检查</span>
      <pre><code>npm run check</code></pre>
    </div>
    <div>
      <span>生成静态文件</span>
      <pre><code>npm run generate</code></pre>
    </div>
    <div>
      <span>本地预览</span>
      <pre><code>npm run server</code></pre>
    </div>
  </div>
  <a class="quickstart-doc-link" href="/zh-CN/docs/">查看完整使用文档</a>
</section>

<section class="proof-band" aria-labelledby="proof-title">
  <div class="section-heading">
    <p class="eyebrow">Production checks</p>
    <h2 id="proof-title">默认主题已经过实站检查</h2>
  </div>
  <p class="proof-copy">README 给出了可复核的公开报告：<a href="https://pagespeed.web.dev/analysis/https-blog-js-gripe-en/ifrxjzn6xy?hl=zh-cn">PageSpeed 原始报告</a>显示桌面端四项 100，移动端性能 98；Cloudflare Agent 检查通过，说明默认输出已经覆盖轻量渲染、可访问性、搜索引擎基础信息和 Agent 发现入口。</p>
  <div class="proof-grid">
    <article><strong>100</strong><span>桌面端四项全满</span></article>
    <article><strong>98</strong><span>移动端性能</span></article>
    <article><strong>3/3</strong><span>Agent 检查通过</span></article>
  </div>
  <div class="report-carousel" data-report-carousel aria-label="公开检查截图">
    <button class="report-control report-control-prev" type="button" data-report-prev aria-label="上一张报告">‹</button>
    <div class="report-track">
      <figure class="is-active" data-report-slide>
      <img data-lightbox src="/assets/readme/pagespeed-desktop.png" alt="PageSpeed 桌面端报告截图" width="1400" height="786" loading="lazy" decoding="async">
      <figcaption>PageSpeed desktop report</figcaption>
      </figure>
      <figure data-report-slide>
      <img data-lightbox src="/assets/readme/pagespeed-mobile.png" alt="PageSpeed 移动端报告截图" width="1400" height="786" loading="lazy" decoding="async">
      <figcaption>PageSpeed mobile report</figcaption>
      </figure>
      <figure data-report-slide>
      <img data-lightbox src="/assets/readme/cloudflare-agent-check.png" alt="Cloudflare Agent 检查通过截图" width="1400" height="786" loading="lazy" decoding="async">
      <figcaption>Cloudflare Agent check</figcaption>
      </figure>
    </div>
    <button class="report-control report-control-next" type="button" data-report-next aria-label="下一张报告">›</button>
    <div class="report-dots" aria-label="报告切换">
      <button type="button" class="is-active" data-report-dot aria-label="查看桌面端 PageSpeed 报告"></button>
      <button type="button" data-report-dot aria-label="查看移动端 PageSpeed 报告"></button>
      <button type="button" data-report-dot aria-label="查看 Cloudflare Agent 检查"></button>
    </div>
  </div>
</section>

<section class="feature-band compact-feature-band" aria-labelledby="features-title">
  <div class="section-heading">
    <p class="eyebrow">Why Siteforge</p>
    <h2 id="features-title">先把边界划清，再让主题自由生长</h2>
  </div>
  <div class="feature-grid">
    <article>
      <h3>内容归内容</h3>
      <p><code>content/</code> 承载文章、页面和文档；Markdown 可以写正文，也可以声明动态 slot 挂载点。</p>
    </article>
    <article>
      <h3>主题归主题</h3>
      <p><code>themes/&lt;name&gt;</code> 管模板、样式、脚本和主题配置，适合快速做产品站、文档站或品牌化页面。</p>
    </article>
    <article>
      <h3>站务交给构建器</h3>
      <p>SEO、robots、feed、sitemap、llms、OpenAPI 和 MCP server card 从配置生成，方便人和 Agent 一起维护。</p>
    </article>
  </div>
</section>
