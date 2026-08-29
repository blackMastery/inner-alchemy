import createMDX from "@next/mdx";
import type { NextConfig } from "next";

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
};

// The site's TSX copy uses typographic quotes and dashes; smartypants keeps
// MDX prose consistent with it rather than emitting straight quotes.
const withMDX = createMDX({
  // Turbopack passes loader options to Rust, so plugins must be named as
  // strings — a function reference is not serializable.
  options: { remarkPlugins: [["remark-smartypants", {}]] },
});

export default withMDX(nextConfig);
