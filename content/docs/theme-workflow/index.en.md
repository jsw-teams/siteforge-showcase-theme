---
title: "Theme development boundaries"
description: "Develop product and documentation themes through Siteforge's theme-first workflow."
updated: "2026-06-28"
translationKey: "docs-theme-workflow"
section: "Secondary development"
order: 5
sitemap: true
---

## Theme-first workflow

Siteforge's AGENTS.md recommends changing the theme before changing the builder:

1. Copy `themes/default` to `themes/<your-theme>`.
2. Rename the theme directory and `theme.name`.
3. Change global visual language in `style.css`.
4. Change page or feature styles in `styles/*.css`.
5. Change HTML structure in `templates/*.html`.
6. Add optional browser behavior in `scripts/*.js` and expose it through `theme.yml`.

## When to change src

Only enter `src/` when improving the framework itself, such as loading config, adding a reusable page type, exposing new structured data to theme templates, or improving feed, sitemap, headers, and agent discovery.

Colors, spacing, a single site's home page, footer copy, comment providers, analytics tokens, and image assets belong in content or theme files.

## Current product-docs theme

The current theme is a product showcase plus product documentation theme. The home page explains Siteforge's value, while docs pages hold multiple Markdown documents with a left navigation and current-page outline.
