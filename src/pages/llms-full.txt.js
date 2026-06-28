import { buildLlmsFullTxt, loadBlogData } from "../lib/content.mjs";

export async function GET() {
  const { site, posts, pages, docs } = await loadBlogData();
  return new Response(buildLlmsFullTxt(site, posts, pages, docs), {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
