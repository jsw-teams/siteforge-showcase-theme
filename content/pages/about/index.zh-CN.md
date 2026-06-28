---
title: "关于 Siteforge"
description: "Siteforge 把内容、主题和站务输出分层，让内容站、产品介绍和文档站更容易维护，也更容易被 Agent 继续开发。"
updated: "2026-06-28"
translationKey: "about"
sitemap: true
---

## 为什么写 Siteforge

很多普通内容站点并不需要每次都重新做一套前端工程。它们真正需要的是稳定的内容目录、可复制的主题边界、基础 SEO、站点地图、订阅、搜索、隐私偏好，以及可被 Agent 读取的发现入口。

Siteforge 把这些重复工作收进一个静态构建器里：站点级信息放在 `config.yml`，内容放在 `content/`，主题放在 `themes/<name>/`，生成物输出到 `dist/`。这样内容维护者可以专注 Markdown，主题开发者可以专注模板、样式和脚本，构建器负责把站务文件一并生成出来。

## 适合谁

- 想用 Hexo 式心智模型管理内容，但需要更明确主题边界的开发者。
- 想把产品介绍、产品文档和普通页面静态化的开源项目或小团队。
- 希望让 Codex、Claude 或其他 Agent 能快速读懂并二次开发站点的人。

## 当前站点的角色

这个站点介绍的是 Siteforge 项目本身：它为什么存在、怎么直接使用、如何组织内容和文档，以及怎样在主题边界内进行二次开发。当前站点同时也是一个产品展示 + 产品文档主题的示例，因此 footer 指向本主题源码，方便继续复用或改造。

## 开源协议与归属

Siteforge 使用 `AGPL-3.0-or-later` 协议发布。基于 Siteforge 修改、分发、公开部署或二次开发的版本，应按 AGPL 要求继续开放对应源码。

本主题基于 Siteforge 二次开发，主题仓库见 [jsw-teams/siteforge-showcase-theme](https://github.com/jsw-teams/siteforge-showcase-theme)。原始 Siteforge 仓库见 [jsw-teams/siteforge](https://github.com/jsw-teams/siteforge)，公开 NOTICE 见 [/NOTICE](/NOTICE)。
