import { renderLlmsTxt } from "@/lib/markdown";

/** Curated index for AI agents — https://llmstxt.org. Prerendered at build. */
export const dynamic = "force-static";

export function GET() {
  return new Response(renderLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, must-revalidate" },
  });
}
