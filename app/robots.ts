import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

/* Every crawler — search and AI answer engines alike — is welcome. Only
   deliberate exclusions are listed; there is no need to name bots to allow them. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        // Nothing to crawl behind the enquiry endpoint.
        "/api/",
        // Internal path of the Markdown mirrors; the canonical URLs are /<page>.md.
        "/md/",
      ],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
