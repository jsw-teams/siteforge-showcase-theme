---
title: "Pages and dynamic slots"
description: "Use content/pages and Siteforge slots to customize home, search, and special pages with low cost."
updated: "2026-06-28"
translationKey: "docs-pages-and-slots"
section: "Basic operations"
order: 2
sitemap: true
---

## Pages are editable page structures

`content/pages/<slug>/index.<locale>.md` is a first-class customization surface in Siteforge. Page Markdown can include static HTML, which is useful for headings, sections, component placement, and small page-level scripts.

In this product-docs theme, the home page lives in `content/pages/home/index.en.md`, the search page lives in `content/pages/search/index.en.md`, and the documentation entry lives in `content/docs/index/index.en.md` so docs navigation, search index, and current-page outline all use the docs model.

## Dynamic interactive slots

Use a Siteforge slot when Markdown should decide where a component appears, while the builder generates the component and the theme script owns interaction:

```html
<!-- siteforge:post-list -->
<!-- siteforge:pagination -->
<!-- siteforge:archive-list -->
<!-- siteforge:terms -->
<!-- siteforge:search-panel -->
<!-- siteforge:languages -->
```

A slot is a complete component. The page should not add duplicate text after it. For search, write the page header first, then place:

```html
<!-- siteforge:search-panel -->
```

## Build a dynamic slot

Use `featured-docs` as an example. The Markdown page contains one comment, the builder reads `content/docs/*`, generates a featured docs list, and a theme script can handle interactions.

```html
<!-- siteforge:featured-docs -->
```

The code key is camelCase:

```js
featuredDocs
```

### 1. Put needed data in the content model

`src/lib/content.mjs` already has the important chain: `loadDocs()`, `loadBlogData()`, and `buildHtmlPages()`. If the component only needs doc title, summary, section, and URL, reuse the `docs` returned by `loadDocs()`. If it needs more, such as `featured: true`, add that field in `loadDocs()`.

Search-like components also need `buildSearchIndex()`. This theme indexes docs only, so search slots naturally search documentation content only.

### 2. Pass data into the theme

`buildHtmlPages()` builds `docsByLocale` and passes it to ordinary pages and documentation pages. That lets `content/pages/about`, `content/pages/search`, and `content/docs/*` share the same docs data without repeating a list in Markdown.

### 3. Register the slot in theme rendering

In `src/lib/theme-html.mjs`, generate the component HTML:

```js
const main = replaceSlots(pageContent.html, {
  featuredDocs: renderFeaturedDocs(docs)
});
```

`featuredDocs` is the target for `<!-- siteforge:featured-docs -->`. The HTML is component structure, not hand-written decoration for authors.

### 4. Mount script and style in theme.yml

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

### 5. Use it in Markdown

```html
<section class="intro" aria-labelledby="intro-title">
  <h1 id="intro-title">Read these first</h1>
</section>

<!-- siteforge:featured-docs -->
```

During build, `replaceSlots()` maps `<!-- siteforge:featured-docs -->` to `slots.featuredDocs`. Authors control placement, `content.mjs` provides structured content, the theme template emits the component, and the theme script owns interaction.
