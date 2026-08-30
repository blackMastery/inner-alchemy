import { MARKDOWN_PAGES } from "@/lib/markdown";
import { pageKey } from "@/lib/pages";

/* The Markdown twin of every page, prerendered at build. Reached through the
   rewrites in next.config.ts: /faq.md and `Accept: text/markdown` on /faq
   both land on /md/faq. The /md/ prefix itself is disallowed in robots.txt. */

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return MARKDOWN_PAGES.map((p) => ({ path: pageKey(p.path).split("/") }));
}

export async function GET(_request: Request, ctx: RouteContext<"/md/[...path]">) {
  const key = (await ctx.params).path.join("/");
  const page = MARKDOWN_PAGES.find((p) => pageKey(p.path) === key);
  // dynamicParams=false still invokes the handler for unknown paths.
  if (!page) return new Response("Not found", { status: 404 });

  return new Response(page.render(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
