import { renderLlmsFull } from "@/lib/markdown";

/** The whole site as one Markdown document. Prerendered at build. */
export const dynamic = "force-static";

export function GET() {
  return new Response(renderLlmsFull(), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, must-revalidate" },
  });
}
