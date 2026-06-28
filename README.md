# Siteforge Showcase Theme

`siteforge-showcase-theme` is a public Siteforge secondary-development example. It shows how a basic content site can grow into a product landing page plus documentation site while keeping the Siteforge core focused on content, build, SEO, feed, sitemap, `robots.txt`, `llms.txt`, and discovery output.

The bundled `product-docs` theme demonstrates theme-level extensions for product sites:

- product hero and compact feature sections
- quickstart section for Siteforge-style commands
- docs gateway page
- docs navigation grouped by `section`
- page table of contents up to H3
- doc cards generated from docs metadata
- quality proof carousel and image lightbox
- consent-gated optional scripts

Docs-specific fields such as `section`, `order`, `sort`, and doc cards live in the theme layer. They are intentionally not moved back into Siteforge core, so this repository stays useful as a showcase of what a theme can add.

## Quick Start

Clone this showcase, install dependencies, then check the current generated output before building again:

```bash
git clone https://github.com/jsw-teams/siteforge-showcase-theme.git
cd siteforge-showcase-theme
npm install
npm run check
npm run generate
npm run server
```

Local preview defaults to:

```text
http://127.0.0.1:4173/
```

For PowerShell environments that block `npm.ps1`, use `npm.cmd`:

```powershell
npm.cmd install
npm.cmd run check
npm.cmd run generate
npm.cmd run server
```

## What To Edit

Use Siteforge the same way you would use a content-site generator first:

- `config.yml`: site name, description, author, language, navigation, footer, `robots`, `llms`, feed, plugin switches, and discovery metadata.
- `content/posts/`: blog posts or regular updates.
- `content/pages/`: home, about, search, docs gateway, and other normal pages.
- `content/docs/`: product documentation pages for this theme.
- `themes/product-docs/source-assets/`: icons and images that the theme should optimize into `static/assets/`.

Only enter `themes/product-docs/` when you want to customize layout, styles, templates, client scripts, or theme-level docs behavior.

## Deployment

This repo is meant to be deployed as a static site. For Cloudflare Pages, use:

```text
Build command: npm run generate
Build output: dist
Node.js: 22.12 or newer
```

Do not publish this package to npm and do not create a GitHub Release for normal showcase updates.
