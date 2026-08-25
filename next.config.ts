import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Journal posts are authored as MDX pages under app/journal/<slug>/page.mdx.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // The standalone QHHT® page was folded into the Beyond the Mind programme.
  async redirects() {
    return [{ source: "/qhht", destination: "/programs/beyond-the-mind", permanent: true }];
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
