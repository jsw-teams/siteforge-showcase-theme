---
title: "自定义默认主题"
description: "默认主题可直接使用；需要品牌化时先替换内容与 source-assets。"
updated: "2026-06-28"
translationKey: "docs-customization"
section: "自定义"
order: 4
sitemap: true
---

## 先替换内容和资源

如果默认主题已经满足你的博客网站类型需求，不需要先理解主题开发。

优先修改：

- `config.yml`：站点名、描述、作者、语言、导航、页脚、robots、llms、feed、插件开关和 discovery。
- `content/posts/`：文章。
- `content/pages/`：首页、关于页、归档页、分类页、标签页、搜索页或其他普通页面。
- `themes/<name>/source-assets/`：logo、favicon、OG 图、截图和其他主题资源。

## 什么时候进入主题目录

只有当你需要新的布局、组件、视觉体系或交互行为时，再进入 `themes/<name>/`。

样式通常改 `style.css` 和 `styles/*.css`；模板改 `templates/*.html`；浏览器行为改 `scripts/*.js`，再通过 `theme.yml` 暴露。
