import createMDX from "@next/mdx";
import type { NextConfig } from "next";

/** A request that asks for Markdown (`Accept: text/markdown, …`). Matched as ^…$ against the raw header. */
const ACCEPT_MARKDOWN = { type: "header", key: "accept", value: "(.*)text/markdown(.*)" } as const;

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // The standalone QHHT® page and the "Beyond the Mind" programme were renamed;
  // every other old program URL kept its slug and still resolves directly.
  async redirects() {
    return [
      { source: "/qhht", destination: "/programs/qhht", permanent: true },
      { source: "/programs/beyond-the-mind", destination: "/programs/bqh", permanent: true },
    ];
  },
  // Markdown mirrors for AI agents, served by app/md/[...path]/route.ts.
  // `beforeFiles` so they win over the prerendered HTML and the [slug] page.
  async rewrites() {
    return {
      beforeFiles: [
        // /faq.md, /programs/bqh.md, /index.md
        { source: "/:path*.md", destination: "/md/:path*" },
        // Content negotiation: the same URL, asked for as Markdown.
        // Paths with a dot (sitemap.xml, llms.txt, images) are left alone.
        { source: "/", destination: "/md/index", has: [ACCEPT_MARKDOWN] },
        { source: "/:path((?!_next/|api/|md/)[^.]+)", destination: "/md/:path", has: [ACCEPT_MARKDOWN] },
      ],
    };
  },
  // HTML and Markdown share a URL, so caches must key on Accept.
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "Vary", value: "Accept" }] }];
  },
};

// The site's TSX copy uses typographic quotes and dashes; smartypants keeps
// MDX prose consistent with it rather than emitting straight quotes.
const withMDX = createMDX({
  // Turbopack passes loader options to Rust, so plugins must be named as
  // strings — a function reference is not serializable.
  options: { remarkPlugins: [["remark-smartypants", {}]] },
});

export default withMDX(nextConfig);
