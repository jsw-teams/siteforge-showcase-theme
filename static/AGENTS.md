# Siteforge Product Docs Agent Guide

This site uses Siteforge as a static site builder for a product showcase, product documentation, ordinary Markdown pages, local search, feeds, sitemaps, and agent discovery.

## Useful Files

- `config.yml`: site-level settings such as site URL, locales, navigation, and selected theme.
- `content/docs/`: product documentation Markdown. Each `content/docs/<slug>/index.<locale>.md` becomes a docs page.
- `content/pages/about/`: ordinary page example.
- `themes/product-docs/theme.yml`: product-docs theme configuration.
- `themes/product-docs/templates/`: page layout templates.
- `themes/product-docs/styles/`: page and feature CSS.
- `themes/product-docs/scripts/`: browser features loaded by the consent-aware theme entry script.
- `src/`: build-time content parsing, rendering, feed, sitemap, asset, and theme glue.
- `static/.well-known/api-catalog`: RFC 9727 linkset for machine-readable discovery, generated from `config.yml`.
- `static/.well-known/mcp/server-card.json`: WebMCP-oriented capability card, generated from `config.yml`.

## Build

```bash
npm install
npm run generate
npm run check
npm run server
```

Build output goes to `dist/`.

## License And Attribution

Siteforge is licensed under `AGPL-3.0-or-later`. Preserve the original attribution: `Siteforge by JSW Teams`.

Keep the root `NOTICE` file and the deployed `/NOTICE` file, or provide equivalent visible attribution with a link to https://github.com/jsw-teams/siteforge.

## Frontend Extension Rules

- Put reusable theme configuration in `themes/<name>/theme.yml`.
- Put CSS in `themes/<name>/style.css` or `themes/<name>/styles/*.css`.
- Put browser feature scripts in `themes/<name>/scripts/*.js`.
- Keep optional third-party scripts behind consent categories.
- Necessary local features may load before a visitor saves consent choices.
- Do not put site-specific assets directly into builder code; expose them through the theme or `static/`.

## Agent Discovery

The homepage should expose RFC 8288 `Link` response headers generated from `config.yml` for:

- `rel="api-catalog"` -> `/.well-known/api-catalog`
- `rel="service-desc"` -> `/openapi.json`
- `rel="service-doc"` -> `/AGENTS.md`
- `rel="describedby"` -> `/llms.txt`

The product-docs theme also exposes WebMCP tools on page load when the browser supports `document.modelContext.registerTool()` or `navigator.modelContext.provideContext()`.

Current default tools:

- `search_public_docs`: search the local public documentation index.
- `list_discovery_resources`: return the agent-facing discovery resources.
