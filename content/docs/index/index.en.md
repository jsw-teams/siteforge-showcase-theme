---
title: "Siteforge docs"
description: "A Siteforge path from site config and content directories to theme extension and Agent discovery."
updated: "2026-06-28"
translationKey: "docs-index"
section: "Get started"
order: 1
sitemap: true
---

<section class="docs-gateway" aria-labelledby="docs-gateway-title">
  <p class="eyebrow">Get started</p>
  <h2 id="docs-gateway-title">Run the site first, then enter the theme</h2>
  <p>Siteforge follows the same practical path as many documentation sites: confirm site-level config and content directories first, then move into theme files by page type.</p>
  <div class="docs-flow" aria-label="Siteforge path">
    <span>config.yml</span><span>content/</span><span>themes/&lt;name&gt;</span><span>dist</span>
  </div>
</section>

<section class="docs-quickstart" aria-labelledby="docs-quickstart-title">
  <p class="eyebrow">Direct use</p>
  <h2 id="docs-quickstart-title">Use directly</h2>
  <p>If you are writing a blog or maintaining an ordinary content site, you do not need to learn theme development first.</p>
  <ol>
    <li><strong>Clone.</strong><code>git clone https://github.com/jsw-teams/siteforge.git</code></li>
    <li><strong>Enter.</strong><code>cd siteforge</code></li>
    <li><strong>Install.</strong><code>npm install</code></li>
    <li><strong>Check first.</strong><code>npm run check</code> verifies output, theme assets, and discovery resources.</li>
    <li><strong>Generate.</strong><code>npm run generate</code> is similar to <code>hexo generate</code> / <code>hexo g</code>.</li>
    <li><strong>Preview.</strong><code>npm run server</code> is similar to <code>hexo server</code> / <code>hexo s</code>; default URL: <code>http://127.0.0.1:4173/</code>.</li>
  </ol>
</section>

### Files you usually edit

Start with `config.yml`: site name, languages, navigation, robots, llms, feed, discovery, and third-party scripts become structured inputs there.

Put content in `content/`: ordinary pages use `content/pages`, product docs use `content/docs`, and posts or mirrors continue to use their content directories.

Put theme work in `themes/<name>`: visual language, docs navigation, search styling, consent, lightbox, carousel, and footer behavior should be solved in the theme layer first.

<section aria-labelledby="docs-cards-title">
  <p class="eyebrow">Documentation</p>
  <h2 id="docs-cards-title">Read by stage</h2>
  <!-- siteforge:doc-cards -->
</section>
