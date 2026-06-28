---
title: "主题开发边界"
description: "按 Siteforge 的 theme-first workflow 开发产品介绍与文档站主题。"
updated: "2026-06-28"
translationKey: "docs-theme-workflow"
section: "二次开发"
order: 5
sitemap: true
---

## Theme-first workflow

Siteforge 的 AGENTS.md 建议先改主题，再改构建器：

1. 复制 `themes/default` 到 `themes/<your-theme>`。
2. 把主题目录名和 `theme.name` 改成项目名。
3. 在 `style.css` 中改全局视觉语言。
4. 在 `styles/*.css` 中改页面或功能样式。
5. 在 `templates/*.html` 中改 HTML 结构。
6. 在 `scripts/*.js` 中加可选行为，并通过 `theme.yml` 暴露。

README 给 Agent 的推荐提示也强调：先读取 `AGENTS.md` 和 `config.yml`，把站点名、多语言、导航、插件、consent、页脚、robots、llms、OpenAPI、API catalog、MCP server card、headers 当作结构化输入，不要让用户反复口头补充。

## 什么时候改 src

只有当你在改进框架本身时才进入 `src/`，例如：

- 加载或合并站点与主题配置。
- 添加可复用页面类型。
- 向主题模板暴露新的结构化数据。
- 改进 feed、sitemap、headers 或 agent discovery。
- 改变资源复制或构建输出行为。

颜色、间距、单个站点首页、footer 文案、评论 provider、统计 token、图片资源，都应留在主题或内容层。

## 当前 product-docs 主题

当前主题是“产品介绍 + 产品文档”类型网站主题。首页负责解释 Siteforge 项目价值，文档页负责承载多篇 Markdown 文档，并提供左侧文档列表与当前页面目录。

它不是博客主题。博客、分类、标签等页面仍可由构建器支持，但当前主题的导航和搜索围绕产品介绍、普通页面和产品文档组织。

## 站务输出边界

README 明确要求：如果某个站务文件能从 `config.yml` 推导出来，就不要在 `static/` 里维护另一份手写版本。当前主题沿用这个方向：

- `robots` 生成 `robots.txt`。
- `llms` 生成 `llms.txt` 和 `llms-full.txt`。
- `feed` 生成 `feed.xml`。
- `discovery` 生成 OpenAPI、API catalog、MCP server card、status 和 `_headers`。

这样做的价值是让 Agent 二次开发时先改结构化配置，再由构建器生成页面外的站务资源。
