import path from "node:path";
import fsSync from "node:fs";
import { formatDate, t } from "../i18n.mjs";
import {
  baseJsonLd,
  breadcrumbJsonLd,
  escapeHtml,
  localText,
  renderLanguageAvailability,
  renderLayout,
  renderPagination,
  renderPostList,
  renderTermLinks,
  siteDefaultLocale,
  siteLocales
} from "../templates.mjs";

function readTemplate(themeDir, templateDir, file) {
  const templatePath = path.join(themeDir, templateDir, file);
  return fsSync.existsSync(templatePath) ? fsSync.readFileSync(templatePath, "utf8") : "";
}

function renderHtmlTemplate(source, data) {
  return source
    .replace(/\{\{\{\s*([\w.-]+)\s*\}\}\}/g, (_, key) => data[key] ?? "")
    .replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (_, key) => escapeHtml(data[key] ?? ""));
}

function slotNameToKey(name) {
  return String(name || "").replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function replaceSlots(html, slots = {}) {
  return String(html || "")
    .replace(/<!--\s*siteforge:([\w-]+)\s*-->/g, (_, name) => slots[slotNameToKey(name)] ?? "")
    .replace(/\{\{\s*siteforge\.([\w-]+)\s*\}\}/g, (_, name) => slots[slotNameToKey(name)] ?? "");
}

function extractPageHeadings(html) {
  const headings = [...String(html || "").matchAll(/<h([1-3])\b([^>]*)>([\s\S]*?)<\/h\1>/gi)]
    .map((match) => {
      const level = Number(match[1]);
      const id = match[2].match(/\bid=["']([^"']+)["']/i)?.[1] || "";
      const label = match[3].replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
      return { id, label, level };
    })
    .filter((item) => item.id && item.label);
  return headings;
}

function renderPageToc(html) {
  const headings = extractPageHeadings(html);
  if (!headings.length) return "";
  return `<nav class="doc-toc" aria-label="页面目录">
    ${headings.map((heading) => `<a class="toc-level-${heading.level}" href="#${escapeHtml(heading.id)}">${escapeHtml(heading.label)}</a>`).join("")}
  </nav>`;
}

function renderDocNav(docs = [], locale, currentUrl = "", currentHtml = "", currentTitle = "") {
  const entries = docs.filter((doc) => doc.locale === locale);
  if (!entries.length) return "";
  const headings = [
    ...(currentTitle ? [{ id: "main", label: currentTitle, level: 1 }] : []),
    ...extractPageHeadings(currentHtml)
  ];
  const groups = new Map();
  for (const doc of entries) {
    const section = doc.section || "指南";
    if (!groups.has(section)) groups.set(section, []);
    groups.get(section).push(doc);
  }
  return `<nav class="doc-section-nav" aria-label="文档列表">
    ${[...groups.entries()].map(([section, items]) => `<section>
      <p class="doc-nav-section">${escapeHtml(section)}</p>
      ${items.map((item) => {
        const current = item.url === currentUrl ? ' aria-current="page"' : "";
        const childLinks = item.url === currentUrl && headings.length
          ? `<div class="doc-nav-headings">${headings.map((heading) => `<a class="doc-heading-level-${heading.level}" href="#${escapeHtml(heading.id)}">${escapeHtml(heading.label)}</a>`).join("")}</div>`
          : "";
        return `<div class="doc-nav-item"><a class="doc-nav-page" href="${item.url}"${current}>${escapeHtml(item.title)}</a>${childLinks}</div>`;
      }).join("")}
    </section>`).join("")}
  </nav>`;
}

function renderDocCards(docs = [], locale, currentUrl = "") {
  const entries = docs.filter((doc) => doc.locale === locale);
  if (!entries.length) return "";
  return `<div class="doc-map" aria-label="文档路径">
    ${entries.map((doc) => {
      const current = doc.url === currentUrl ? ' aria-current="page"' : "";
      const section = doc.section || "Docs";
      return `<a class="doc-map-row" href="${doc.url}"${current}>
        <span class="doc-map-section">${escapeHtml(section)}</span>
        <strong>${escapeHtml(doc.title)}</strong>
        <span class="doc-map-desc">${escapeHtml(doc.description || "")}</span>
      </a>`;
    }).join("")}
  </div>`;
}

export function loadHtmlThemeTemplates(site, themeDir, templateDir) {
  const files = {
    home: readTemplate(themeDir, templateDir, "home.html"),
    archive: readTemplate(themeDir, templateDir, "archive.html"),
    termsIndex: readTemplate(themeDir, templateDir, "terms-index.html"),
    termsPage: readTemplate(themeDir, templateDir, "terms-page.html"),
    page: readTemplate(themeDir, templateDir, "page.html"),
    plainPage: readTemplate(themeDir, templateDir, "plain-page.html")
  };

  return {
    renderHomePage({ site, locale, posts, page = 1, totalPages = 1, pageUrl = (number) => number === 1 ? `/${locale}/` : `/${locale}/${"older/".repeat(number - 1)}`, pageContent = null }) {
      if (!files.home) return null;
      const locales = siteLocales(site);
      const siteName = localText(site.siteName, locale, site);
      const slots = {
        postList: renderPostList(posts, locale),
        pagination: renderPagination({ locale, page, totalPages, pageUrl })
      };
      const main = pageContent
        ? renderHtmlTemplate(files.home, { content: replaceSlots(pageContent.html, slots) })
        : renderHtmlTemplate(files.home, {
        content: "",
        siteName,
        intro: t(locale, "siteIntro"),
        latestPosts: t(locale, "latestPosts"),
        ...slots
      });
      return renderLayout({
        site,
        locale,
        title: pageContent?.title || siteName,
        description: pageContent?.description || localText(site.description, locale, site),
        url: pageUrl(page),
        current: "home",
        main,
        alternates: locales.map((entryLocale) => ({ hreflang: entryLocale, url: `/${entryLocale}/` })).concat({ hreflang: "x-default", url: `/${siteDefaultLocale(site)}/` }),
        jsonLd: baseJsonLd(site, locale),
        styles: site.theme?.pageStyles?.home || [],
        scripts: site.theme?.pageScripts?.home || []
      });
    },

    renderArchivePage({ site, locale, groups, pageContent = null }) {
      if (!files.archive) return null;
      const locales = siteLocales(site);
      const archiveList = groups.map((group) => `<section aria-labelledby="year-${group.year}">
        <h2 id="year-${group.year}">${escapeHtml(group.year)}</h2>
        <ul>
          ${group.posts.map((post) => `<li><time datetime="${escapeHtml(post.date)}">${escapeHtml(formatDate(post.date, locale))}</time><a href="${post.url}">${escapeHtml(post.title)}</a></li>`).join("")}
        </ul>
      </section>`).join("");
      const slots = { archiveList };
      const main = pageContent ? replaceSlots(pageContent.html, slots) : renderHtmlTemplate(files.archive, {
        title: t(locale, "archive"),
        description: t(locale, "archiveDescription"),
        ...slots
      });
      return renderLayout({
        site,
        locale,
        title: t(locale, "archive"),
        description: t(locale, "archiveDescription"),
        url: `/${locale}/archive/`,
        current: "archive",
        main,
        alternates: locales.map((entryLocale) => ({ hreflang: entryLocale, url: `/${entryLocale}/archive/` })).concat({ hreflang: "x-default", url: `/${siteDefaultLocale(site)}/archive/` }),
        robots: "noindex,follow",
        jsonLd: [baseJsonLd(site, locale), breadcrumbJsonLd(site, [
          { name: t(locale, "home"), url: `/${locale}/` },
          { name: t(locale, "archive"), url: `/${locale}/archive/` }
        ])],
        styles: site.theme?.pageStyles?.archive || [],
        scripts: site.theme?.pageScripts?.archive || []
      });
    },

    renderTermIndexPage({ site, locale, titleKey, descriptionKey, terms, url, current, pageContent = null }) {
      if (!files.termsIndex) return null;
      const locales = siteLocales(site);
      const slots = { terms: renderTermLinks(terms, t(locale, "noPosts")) };
      const main = pageContent ? replaceSlots(pageContent.html, slots) : renderHtmlTemplate(files.termsIndex, {
        title: t(locale, titleKey),
        description: t(locale, descriptionKey),
        ...slots
      });
      return renderLayout({
        site,
        locale,
        title: t(locale, titleKey),
        description: t(locale, descriptionKey),
        url,
        current,
        alternates: locales.map((entryLocale) => ({ hreflang: entryLocale, url: `/${entryLocale}/${current}/` })).concat({ hreflang: "x-default", url: `/${siteDefaultLocale(site)}/${current}/` }),
        main,
        robots: "noindex,follow",
        jsonLd: [baseJsonLd(site, locale), breadcrumbJsonLd(site, [
          { name: t(locale, "home"), url: `/${locale}/` },
          { name: t(locale, titleKey), url }
        ])],
        styles: site.theme?.pageStyles?.[current] || site.theme?.pageStyles?.term || [],
        scripts: site.theme?.pageScripts?.[current] || site.theme?.pageScripts?.term || []
      });
    },

    renderTermPage({ site, locale, title, description, posts, url, current, parentKey }) {
      if (!files.termsPage) return null;
      const main = renderHtmlTemplate(files.termsPage, {
        title,
        description,
        postList: renderPostList(posts, locale)
      });
      return renderLayout({
        site,
        locale,
        title,
        description,
        url,
        current,
        main,
        robots: "noindex,follow",
        jsonLd: [baseJsonLd(site, locale), breadcrumbJsonLd(site, [
          { name: t(locale, "home"), url: `/${locale}/` },
          { name: t(locale, parentKey), url: `/${locale}/${current}/` },
          { name: title, url }
        ])],
        styles: site.theme?.pageStyles?.term || site.theme?.pageStyles?.[current] || [],
        scripts: site.theme?.pageScripts?.term || site.theme?.pageScripts?.[current] || []
      });
    },

    renderSearchPage({ site, locale, pageContent = null }) {
      if (!pageContent) return null;
      const locales = siteLocales(site);
      const main = replaceSlots(pageContent.html, {
        searchPanel: `<section class="search-panel" data-search-root data-search-locale="${escapeHtml(locale)}" data-search-empty="${escapeHtml(t(locale, "searchEmpty"))}" data-search-no-results="${escapeHtml(t(locale, "searchNoResults"))}" data-search-loading="${escapeHtml(t(locale, "searchLoading"))}" data-search-error="${escapeHtml(t(locale, "searchError"))}" data-search-results-label="${escapeHtml(t(locale, "searchResultsCount"))}">
      <form class="search-form" data-search-form role="search">
        <label class="visually-hidden" for="search-input">${escapeHtml(t(locale, "search"))}</label>
        <input id="search-input" class="search-input" data-search-input type="search" name="q" autocomplete="off" placeholder="${escapeHtml(t(locale, "searchPlaceholder"))}">
      </form>
      <p class="search-status empty" data-search-status aria-live="polite">${escapeHtml(t(locale, "searchLoading"))}</p>
      <div class="search-results" data-search-results></div>
    </section>`
      });
      return renderLayout({
        site,
        locale,
        title: pageContent.title,
        description: pageContent.description,
        url: `/${locale}/search/`,
        current: "search",
        main,
        alternates: locales.map((entryLocale) => ({ hreflang: entryLocale, url: `/${entryLocale}/search/` })).concat({ hreflang: "x-default", url: `/${siteDefaultLocale(site)}/search/` }),
        robots: "noindex,follow",
        jsonLd: [baseJsonLd(site, locale), breadcrumbJsonLd(site, [
          { name: t(locale, "home"), url: `/${locale}/` },
          { name: t(locale, "search"), url: `/${locale}/search/` }
        ])],
        styles: site.theme?.pageStyles?.page || [],
        scripts: site.theme?.pageScripts?.page || []
      });
    },

    renderAboutPage({ site, locale, page, translations, docs = [] }) {
      if (!files.page) return null;
      const languageBlock = renderLanguageAvailability(locale, translations);
      const isDocPage = page.kind === "doc" || page.url.includes(`/${locale}/docs/`);
      const content = replaceSlots(page.html, {
        languages: languageBlock,
        docCards: isDocPage ? renderDocCards(docs, locale, page.url) : ""
      });
      const main = renderHtmlTemplate(isDocPage || !files.plainPage ? files.page : files.plainPage, {
        title: page.title,
        description: page.description,
        languages: languageBlock,
        toc: isDocPage ? renderPageToc(content) : "",
        docNav: isDocPage ? renderDocNav(docs, locale, page.url, content, page.title) : "",
        content
      });
      const alternates = translations
        .map((entry) => ({ hreflang: entry.locale, url: entry.url }))
        .concat({ hreflang: "x-default", url: translations.find((entry) => entry.locale === siteDefaultLocale(site))?.url ?? translations[0].url });
      return renderLayout({
        site,
        locale,
        title: page.title,
        description: page.description,
        url: page.url,
        current: isDocPage ? "docs" : page.slug,
        main,
        languageLinks: translations,
        alternates,
        jsonLd: [baseJsonLd(site, locale), breadcrumbJsonLd(site, [
          { name: t(locale, "home"), url: `/${locale}/` },
          { name: page.title, url: page.url }
        ])],
        styles: site.theme?.pageStyles?.page || [],
        scripts: site.theme?.pageScripts?.page || []
      });
    }
  };
}
