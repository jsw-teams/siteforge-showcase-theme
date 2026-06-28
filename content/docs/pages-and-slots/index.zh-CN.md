---
title: "页面与动态 slot"
description: "用 content/pages 和 Siteforge slot 低成本定制首页、搜索页和其他特殊页面。"
updated: "2026-06-28"
translationKey: "docs-pages-and-slots"
section: "基本操作"
order: 2
sitemap: true
---

## Pages 是可编辑页面结构

`content/pages/<slug>/index.<locale>.md` 是 Siteforge 的一等定制面。新版 README 明确说明，页面 Markdown 可以直接书写静态 HTML，适合维护标题、区块、少量组件位置和页面脚本。

当前 product-docs 主题也按这个契约组织：首页在 `content/pages/home/index.zh-CN.md`，搜索页在 `content/pages/search/index.zh-CN.md`。文档入口属于多篇文档集合，放在 `content/docs/index/index.zh-CN.md`，这样左侧文档导航、搜索索引和当前文档目录都能按文档模型生成。

特殊页面也可以用同一套规则覆盖：

```text
content/pages/home/index.<locale>.md        # /<locale>/
content/pages/archive/index.<locale>.md     # /<locale>/archive/
content/pages/categories/index.<locale>.md  # /<locale>/categories/
content/pages/tags/index.<locale>.md        # /<locale>/tags/
content/pages/search/index.<locale>.md      # /<locale>/search/
```

## 动态互动 slot

当页面需要“位置由 Markdown 决定，组件由构建器生成，并由主题脚本接管交互”时，使用 Siteforge slot。它不是普通 HTML 片段，也不是把一段 Markdown 换个名字；它更像一个声明式挂载点：

```html
<!-- siteforge:post-list -->
<!-- siteforge:pagination -->
<!-- siteforge:archive-list -->
<!-- siteforge:terms -->
<!-- siteforge:search-panel -->
<!-- siteforge:languages -->
```

slot 是完整组件，不需要在后面补“这里会显示结果”这类说明。比如搜索页应先用页面自己的 `<header>` 写清页面意图，然后直接放置：

```html
<!-- siteforge:search-panel -->
```

## 开发一个动态互动 slot

slot 适合承载需要构建器数据和浏览器交互的组件。下面用 `featured-docs` 举一个完整应用例子：在任意 `content/pages` 或 `content/docs` 页面里写一行注释，构建器读取 `content/docs/*` 的文档数据，生成推荐文档列表，主题脚本再处理折叠、键盘导航或埋点等交互。

先约定 slot 名称。Markdown 里使用短横线命名：

```html
<!-- siteforge:featured-docs -->
```

代码里对应驼峰 key：

```js
featuredDocs
```

### 1. 让内容模型带上组件需要的数据

`src/lib/content.mjs` 已经有三条关键链路：

```js
export async function loadDocs(site = null) {
  const files = await fg("content/docs/*/index.*.md", { cwd: rootDir, onlyFiles: true });
  // 解析 title、description、section、order、html、url、markdownBody 等字段
}

export async function loadBlogData() {
  const site = await readSiteConfig();
  const posts = await loadPosts(site);
  const pages = await loadPages(site);
  const docs = await loadDocs(site);
  return { site, posts, pages, docs };
}

export async function buildHtmlPages() {
  const { site, posts, pages, docs } = await loadBlogData();
  // docsByLocale 会传给普通页面和文档页面模板
}
```

如果 `featured-docs` 只需要推荐文档标题、摘要、分组和链接，就不必新增内容目录；直接复用 `loadDocs()` 返回的 `docs`。如果组件需要额外字段，例如 `featured: true`，就在 `loadDocs()` 的对象里补一个布尔值：

```js
docs.push({
  slug,
  locale,
  title: parsed.data.title || slug,
  description: plainSummary(parsed.content, parsed.data.description),
  section: parsed.data.section ? String(parsed.data.section) : "指南",
  order: Number(parsed.data.order || 0),
  featured: parsed.data.featured === true,
  html: renderMarkdown(parsed.content, baseDir, contentKey, { html: true }),
  url: slug === "index" ? `/${locale}/docs/` : `/${locale}/docs/${slug}/`,
  kind: "doc"
});
```

搜索类组件还要注意 `buildSearchIndex()`。当前主题只把 docs 放进搜索索引：

```js
export function buildSearchIndex(posts, locale, pages = [], docs = []) {
  return docs.filter((doc) => doc.locale === locale).map((doc) => ({
    title: doc.title,
    description: doc.description,
    url: doc.url,
    category: doc.section || "Docs",
    text: stripMarkdown(doc.markdownBody || "")
  }));
}
```

所以如果 slot 要读取搜索索引，它会天然只命中文档内容；如果 slot 要读普通页面，就需要同步调整这里的索引来源。

### 2. 把数据传给主题模板

`buildHtmlPages()` 已经把当前语言的文档列表传给普通页面和文档页面：

```js
const docsByLocale = new Map(locales.map((locale) => [
  locale,
  docs
    .filter((doc) => doc.locale === locale)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
]));

add(page.url, templates.renderAboutPage({
  site,
  locale: page.locale,
  page,
  translations,
  docs: docsByLocale.get(page.locale) || []
}));
```

这一步让 `content/pages/about`、`content/pages/search` 和 `content/docs/*` 都能拿到同一份 docs 数据。slot 不需要在 Markdown 里重新写文档列表。

### 3. 在主题渲染里注册 slot

然后在页面渲染函数里生成组件 HTML。示例位置是 `src/lib/theme-html.mjs` 的页面渲染逻辑：

```js
function renderFeaturedDocs(docs = []) {
  const items = docs
    .filter((doc) => doc.featured || doc.order <= 3)
    .slice(0, 4)
    .map((doc) => `<a class="featured-doc" href="${escapeHtml(doc.url)}">
      <span>${escapeHtml(doc.section || "Docs")}</span>
      <strong>${escapeHtml(doc.title)}</strong>
      <small>${escapeHtml(doc.description)}</small>
    </a>`)
    .join("");

  return `<section class="featured-docs" data-featured-docs>
    <header>
      <p class="eyebrow">Recommended</p>
      <h2>推荐阅读</h2>
    </header>
    <div class="featured-docs-list">${items}</div>
  </section>`;
}

const main = replaceSlots(pageContent.html, {
  featuredDocs: renderFeaturedDocs(docs)
});
```

这里的 `featuredDocs` 就是 `<!-- siteforge:featured-docs -->` 的目标。HTML 是组件外壳，不是给内容作者手写的装饰；`data-featured-docs` 是主题脚本的稳定钩子。

### 4. 在主题配置里挂脚本和样式

如果它只是静态推荐列表，只加样式即可；如果要做折叠、键盘导航、曝光统计或轮播，再把脚本作为主题功能挂载：

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

`scripts/featured-docs.js` 只需要找 `[data-featured-docs]`，再接管组件内部交互。Consent 启用时，`featureCategories` 会决定它属于必要功能、偏好功能、统计功能还是营销功能。

### 5. 在 Markdown 页面里使用 slot

最后在 Markdown/HTML 页面里使用 slot。例如 `content/pages/home/index.zh-CN.md` 或某篇文档：

```html
<section class="intro" aria-labelledby="intro-title">
  <p class="eyebrow">Guide</p>
  <h1 id="intro-title">先读这几篇</h1>
  <p>页面作者只决定推荐文档出现在哪里。</p>
</section>

<!-- siteforge:featured-docs -->
```

构建时，`replaceSlots()` 会把 `<!-- siteforge:featured-docs -->` 转成 `slots.featuredDocs`。这就是 Siteforge slot 的重点：内容作者控制组件位置，`content.mjs` 提供结构化内容，主题模板生成组件，主题脚本接管交互。

## 什么时候新增 slot

只有当组件需要构建器数据或交互状态，同时又需要让用户在 Markdown/HTML 中决定位置时，才应该新增 slot。静态文案、固定链接和一次性 HTML 直接放在 `content/pages` 里即可，不要伪装成 slot。

新增 slot 时，README 建议同步更新 `src/lib/theme-html.mjs`、必要的 fallback 渲染、主题 i18n、主题样式或脚本，以及 README、`AGENTS.md` 和部署用的 `static/AGENTS.md`。这能避免页面内容、主题模板和 Agent 指南各说各话。
