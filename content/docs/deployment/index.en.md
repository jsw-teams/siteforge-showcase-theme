---
title: "Deploy and publish"
description: "Generate static files, check dist output, and verify site-operation resources before deployment."
updated: "2026-06-28"
translationKey: "docs-deployment"
section: "Deploy"
order: 3
sitemap: true
---

## Generate before publishing

Run:

```bash
npm run generate
```

This creates `dist/` and emits pages, static assets, feed, sitemap, robots, llms, and discovery files.

## Then run checks

```bash
npm run check
```

The check covers `dist/`, theme assets, sitemap, feed, Agent discovery, and WebMCP bootstrap. After it passes, hand `dist/` to your static host.

## Preview is not publish

`npm run server` is for local editing. Before publishing, still run `npm run generate` and `npm run check`.
