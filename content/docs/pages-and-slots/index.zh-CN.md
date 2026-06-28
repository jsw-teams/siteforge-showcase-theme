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

slot 适合承载需要构建器数据和浏览器交互的组件。下面用 `docs-live-search` 举一个完整例子：它在 Markdown 页面里只出现一行注释，构建器会把它替换成一个文档搜索组件，主题脚本再接管输入、加载索引、结果渲染和空状态。

先约定 slot 名称。Markdown 里使用短横线命名：

```html
<!-- siteforge:docs-live-search -->
```

代码里对应驼峰 key：

```js
docsLiveSearch
```

然后在页面渲染函数里生成组件 HTML。示例位置是 `src/lib/theme-html.mjs`：

```js
const main = replaceSlots(pageContent.html, {
  docsLiveSearch: `<section
    class="docs-live-search"
    data-docs-live-search
    data-search-locale="${escapeHtml(locale)}"
    data-search-empty="${escapeHtml(t(locale, "searchEmpty"))}"
    data-search-no-results="${escapeHtml(t(locale, "searchNoResults"))}">
    <form class="docs-live-search-form" data-search-form role="search">
      <label class="visually-hidden" for="search-input">${escapeHtml(t(locale, "search"))}</label>
      <input id="search-input" class="search-input" data-search-input type="search">
    </form>
    <p class="search-status empty" data-search-status aria-live="polite"></p>
    <div class="search-results" data-search-results></div>
  </section>`
});
```

这个 HTML 是组件外壳，不是给内容作者手写的页面装饰。它包含脚本需要读取的 `data-docs-live-search`、`data-search-input`、`data-search-status` 和 `data-search-results`，所以后续交互可以稳定绑定。

再把交互脚本作为主题功能挂载，例如 `theme.yml`：

```yaml
features:
  docsLiveSearch: true
featureScripts:
  docsLiveSearch: scripts/docs-live-search.js
featureCategories:
  docsLiveSearch: necessary
```

`scripts/docs-live-search.js` 只需要找 `[data-docs-live-search]`，读取输入框、状态节点和结果节点，再请求文档搜索索引并渲染结果。组件内部状态由脚本维护，不需要页面作者补“这里显示搜索结果”。

最后在 Markdown/HTML 页面里使用 slot。例如 `content/pages/search/index.zh-CN.md`：

```html
<section class="search-hero" aria-labelledby="search-title">
  <p class="eyebrow">Docs search</p>
  <h1 id="search-title">只搜索文档</h1>
  <p class="lead">搜索索引只包含文档内容。</p>
</section>

<!-- siteforge:docs-live-search -->
```

构建时，`replaceSlots()` 会把 `<!-- siteforge:docs-live-search -->` 转成 `slots.docsLiveSearch`。这就是 Siteforge slot 的重点：内容作者控制组件位置，主题和构建器控制组件结构、数据和交互。

## 什么时候新增 slot

只有当组件需要构建器数据或交互状态，同时又需要让用户在 Markdown/HTML 中决定位置时，才应该新增 slot。静态文案、固定链接和一次性 HTML 直接放在 `content/pages` 里即可，不要伪装成 slot。

新增 slot 时，README 建议同步更新 `src/lib/theme-html.mjs`、必要的 fallback 渲染、主题 i18n、主题样式或脚本，以及 README、`AGENTS.md` 和部署用的 `static/AGENTS.md`。这能避免页面内容、主题模板和 Agent 指南各说各话。
