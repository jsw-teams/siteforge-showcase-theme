---
title: "部署與發布"
description: "生成靜態文件，檢查 dist 輸出，並確認部署前的站務資源。"
updated: "2026-06-28"
translationKey: "docs-deployment"
section: "部署"
order: 3
sitemap: true
---

## 發布前先生成

部署前運行：

```bash
npm run generate
```

它會生成 `dist/`，並輸出頁面、靜態資源、feed、sitemap、robots、llms 和 discovery 文件。

## 再運行檢查

```bash
npm run check
```

檢查會覆蓋 `dist/`、主題資源、sitemap、feed、Agent discovery 和 WebMCP bootstrap。檢查通過後，再把 `dist/` 交給靜態託管平台。

## 本地預覽不等於發布

`npm run server` 適合邊寫邊看。發布前仍應單獨運行 `npm run generate` 和 `npm run check`。
