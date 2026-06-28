import fs from "node:fs/promises";
import path from "node:path";
import { generateAssets } from "./assets.mjs";
import {
  buildApiCatalog,
  buildHeaders,
  buildMcpServerCard,
  buildOpenApiJson,
  buildStatusJson,
  loadPosts,
  readSiteConfig
} from "./lib/content.mjs";

process.env.OG_FETCH_REMOTE_COVERS = "true";

const site = await readSiteConfig();
await writeDiscoveryFiles(site);
await generateAssets();

const posts = await loadPosts(site);
const generatedOgImages = posts.filter((post) => post.ogImage?.startsWith("/assets/og/")).length;

console.log(`Prepared ${generatedOgImages} generated post OG image${generatedOgImages === 1 ? "" : "s"}.`);

async function writeText(file, content) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, content, "utf8");
}

async function writeJson(file, value) {
  await writeText(file, `${JSON.stringify(value, null, 2)}\n`);
}

async function writeDiscoveryFiles(site) {
  const staticDir = path.join(process.cwd(), "static");
  await writeJson(path.join(staticDir, "openapi.json"), buildOpenApiJson(site));
  await writeJson(path.join(staticDir, ".well-known", "api-catalog"), buildApiCatalog(site));
  await writeJson(path.join(staticDir, ".well-known", "mcp", "server-card.json"), buildMcpServerCard(site));
  await writeJson(path.join(staticDir, ".well-known", "status.json"), buildStatusJson(site));
  await writeText(path.join(staticDir, "_headers"), buildHeaders(site));
}
