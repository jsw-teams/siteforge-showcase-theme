---
title: "Siteforge 文档"
description: "从站点配置、内容目录、主题扩展到 Agent discovery 的 Siteforge 入门路径。"
updated: "2026-06-28"
translationKey: "docs-index"
section: "开始使用"
order: 1
sitemap: true
---

<section class="docs-gateway" aria-labelledby="docs-gateway-title">
  <p class="eyebrow">Get started</p>
  <h2 id="docs-gateway-title">先跑通站点，再进入主题</h2>
  <p>Siteforge 的使用路径和主流文档站类似：先确认站点级配置和内容目录，再按页面类型进入主题层。这样普通内容维护者只需要理解 Markdown 和 YAML，开发者则可以在主题边界内完成产品介绍页、文档页和交互组件。</p>
  <div class="docs-flow" aria-label="Siteforge 使用路径">
    <span>config.yml</span>
    <span>content/</span>
    <span>themes/&lt;name&gt;</span>
    <span>dist</span>
  </div>
</section>

<section class="docs-quickstart" aria-labelledby="docs-quickstart-title">
  <p class="eyebrow">Direct use</p>
  <h2 id="docs-quickstart-title">直接使用</h2>
  <p>只写博客或维护普通内容站时，不需要先理解主题开发。按这个路径走：</p>
  <ol>
    <li><strong>克隆项目。</strong><code>git clone https://github.com/jsw-teams/siteforge.git</code></li>
    <li><strong>进入目录。</strong><code>cd siteforge</code></li>
    <li><strong>安装依赖。</strong><code>npm install</code></li>
    <li><strong>先做检查。</strong><code>npm run check</code> 用来确认当前输出、主题资源和发现入口是健康的。</li>
    <li><strong>生成静态文件。</strong><code>npm run generate</code> 类似 <code>hexo generate</code> / <code>hexo g</code>。</li>
    <li><strong>本地预览。</strong><code>npm run server</code> 类似 <code>hexo server</code> / <code>hexo s</code>，默认地址是 <code>http://127.0.0.1:4173/</code>。</li>
  </ol>
  <div class="docs-command-grid" aria-label="常用命令">
    <pre><code>git clone https://github.com/jsw-teams/siteforge.git</code></pre>
    <pre><code>cd siteforge</code></pre>
    <pre><code>npm install</code></pre>
    <pre><code>npm run check</code></pre>
    <pre><code>npm run generate</code></pre>
    <pre><code>npm run server</code></pre>
  </div>
  <div class="docs-direct-edit">
    <p><strong>改 <code>config.yml</code>：</strong>站点名、描述、作者、语言、导航、页脚、robots、llms、feed、插件开关和 discovery 信息都放这里。</p>
    <p><strong>改 <code>content/posts/</code>：</strong>新增或编辑文章。</p>
    <p><strong>改 <code>content/pages/</code>：</strong>调整首页、关于页、归档页、分类页、标签页、搜索页或其他普通页面。</p>
  </div>
  <p>本地预览每 10 秒监听 <code>content/</code>、<code>themes/</code>、<code>src/</code>、<code>static/</code>、<code>config.yml</code> 和 <code>astro.config.mjs</code>，构建出错时预览进程不会退出。</p>
  <p><code>npm run check</code> 检查 <code>dist/</code>、主题资源、sitemap、feed、Agent discovery 和 WebMCP bootstrap。PowerShell 执行策略阻止 <code>npm.ps1</code> 时，改用 <code>npm.cmd run server</code>、<code>npm.cmd run generate</code> 和 <code>npm.cmd run check</code>。</p>
</section>

### 你会改哪些文件

先从 `config.yml` 开始：站点名、多语言、导航、robots、llms、feed、discovery 和第三方脚本都可以在这里变成结构化输入。

内容放进 `content/`：普通页面用 `content/pages`，多篇产品文档用 `content/docs`，文章或镜像内容继续放在对应内容目录。

主题放进 `themes/<name>`：产品介绍页的视觉、文档页的左侧导航、搜索页样式、consent、lightbox、轮播和页脚都应该先在主题层解决。

<section aria-labelledby="docs-cards-title">
  <p class="eyebrow">Documentation</p>
  <h2 id="docs-cards-title">按阶段阅读文档</h2>
  <!-- siteforge:doc-cards -->
</section>

<section class="docs-proof" aria-labelledby="docs-proof-title">
  <div>
    <p class="eyebrow">Quality baseline</p>
    <h2 id="docs-proof-title">从默认主题开始，不从空白页开始</h2>
    <p>README 附带了可复核的 PageSpeed 与 Agent 检查结果：桌面端性能、无障碍、最佳做法、SEO 全 100，移动端性能 98，Cloudflare Agent 检查通过。二次开发时可以把这些报告当作主题改造后的回归基线。</p>
  </div>
  <div class="report-carousel" data-report-carousel>
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
