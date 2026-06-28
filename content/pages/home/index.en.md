---
title: "Siteforge"
description: "Siteforge is a Hexo-inspired static site builder for content sites, product pages, documentation, and agent-friendly secondary development."
updated: "2026-06-28"
translationKey: "home"
sitemap: true
---

<section class="product-hero" aria-labelledby="home-title">
  <div class="hero-copy">
    <p class="eyebrow">Static site builder</p>
    <h1 id="home-title">A static builder shaped for content sites and agent workflows</h1>
    <p class="lead">Siteforge keeps content, themes, and site operations in clear directories: teams write Markdown, developers extend themes, and the builder emits SEO, search, sitemap, feed, llms, and Agent discovery resources.</p>
    <div class="hero-actions">
      <a class="button-link" href="/en/docs/">Read the guide</a>
      <a class="button-link button-link-secondary" href="https://github.com/jsw-teams/siteforge">View GitHub</a>
    </div>
  </div>
  <figure class="hero-product-mark">
    <img src="/assets/siteforge-icon.png" alt="Siteforge project icon" width="512" height="512" loading="eager" decoding="async" fetchpriority="high">
  </figure>
</section>

<section class="quickstart-band" aria-labelledby="quickstart-title">
  <p class="eyebrow">Quick start</p>
  <h2 id="quickstart-title">Use it directly after cloning</h2>
  <div class="quickstart-runbook" aria-label="Direct use command path">
    <div><span>Clone</span><pre><code>git clone https://github.com/jsw-teams/siteforge.git</code></pre></div>
    <div><span>Enter</span><pre><code>cd siteforge</code></pre></div>
    <div><span>Install</span><pre><code>npm install</code></pre></div>
    <div><span>Check first</span><pre><code>npm run check</code></pre></div>
    <div><span>Generate</span><pre><code>npm run generate</code></pre></div>
    <div><span>Preview</span><pre><code>npm run server</code></pre></div>
  </div>
  <a class="quickstart-doc-link" href="/en/docs/">Read full docs</a>
</section>

<section class="proof-band" aria-labelledby="proof-title">
  <div class="section-heading">
    <p class="eyebrow">Production checks</p>
    <h2 id="proof-title">The default theme has a public quality baseline</h2>
  </div>
  <p class="proof-copy">The README links to reproducible reports: <a href="https://pagespeed.web.dev/analysis/https-blog-js-gripe-en/ifrxjzn6xy?hl=zh-cn">PageSpeed</a> shows desktop scores of 100 across all four categories and mobile performance at 98. Cloudflare Agent checks also pass.</p>
  <div class="proof-grid">
    <article><strong>100</strong><span>Desktop categories</span></article>
    <article><strong>98</strong><span>Mobile performance</span></article>
    <article><strong>3/3</strong><span>Agent checks</span></article>
  </div>
</section>

<section class="feature-band compact-feature-band" aria-labelledby="features-title">
  <div class="section-heading">
    <p class="eyebrow">Why Siteforge</p>
    <h2 id="features-title">Keep boundaries clear, then let themes grow</h2>
  </div>
  <div class="feature-grid">
    <article><h3>Content stays content</h3><p><code>content/</code> holds posts, pages, and docs; Markdown can include dynamic slot mount points.</p></article>
    <article><h3>Themes stay themes</h3><p><code>themes/&lt;name&gt;</code> owns templates, styles, scripts, and theme config for product and documentation sites.</p></article>
    <article><h3>Site ops stay generated</h3><p>SEO, robots, feed, sitemap, llms, OpenAPI, and MCP server cards are generated from config.</p></article>
  </div>
</section>
