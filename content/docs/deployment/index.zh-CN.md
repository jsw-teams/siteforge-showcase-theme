---
title: "部署与发布"
description: "生成静态文件，检查 dist 输出，并确认部署前的站务资源。"
updated: "2026-06-28"
translationKey: "docs-deployment"
section: "部署"
order: 3
sitemap: true
---

## 发布前先生成

部署前运行：

```bash
npm run generate
```

它会生成 `dist/`，并输出页面、静态资源、feed、sitemap、robots、llms 和 discovery 文件。

## 再运行检查

```bash
npm run check
```

检查会覆盖 `dist/`、主题资源、sitemap、feed、Agent discovery 和 WebMCP bootstrap。检查通过后，再把 `dist/` 交给你的静态托管平台。

## 本地预览不等于发布

`npm run server` 适合边写边看。它每 10 秒监听 `content/`、`themes/`、`src/`、`static/`、`config.yml` 和 `astro.config.mjs`，检测到变更才重建。

发布前仍应单独运行 `npm run generate` 和 `npm run check`。
