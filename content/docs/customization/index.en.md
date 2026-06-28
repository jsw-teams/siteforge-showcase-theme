---
title: "Customize the default theme"
description: "Use the default theme directly; replace content and source-assets first when branding is needed."
updated: "2026-06-28"
translationKey: "docs-customization"
section: "Customize"
order: 4
sitemap: true
---

## Replace content and assets first

If the default theme already fits your site, you do not need to learn theme development first.

Start with:

- `config.yml`: site name, description, author, languages, nav, footer, robots, llms, feed, plugins, and discovery.
- `content/posts/`: posts.
- `content/pages/`: home, about, archive, categories, tags, search, and other ordinary pages.
- `themes/<name>/source-assets/`: logo, favicon, OG images, screenshots, and theme assets.

## When to enter the theme directory

Only enter `themes/<name>/` when you need new layout, components, visual language, or browser behavior.

Styles usually live in `style.css` and `styles/*.css`; templates live in `templates/*.html`; browser behavior lives in `scripts/*.js` and is exposed through `theme.yml`.
