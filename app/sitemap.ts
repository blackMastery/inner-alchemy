import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { PROGRAM_PAGES, programHref } from "@/content/programs";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`;

  const pages: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/programs"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/programs/coaching"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/programs/hypnotherapy"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/faq"), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/story"), changeFrequency: "yearly", priority: 0.7 },
    { url: url("/session"), changeFrequency: "monthly", priority: 0.6 },
  ];

  const programs: MetadataRoute.Sitemap = PROGRAM_PAGES.map((p) => ({
    url: url(programHref(p.slug)),
    changeFrequency: "monthly",
    priority: p.featured ? 0.9 : 0.8,
  }));

  return [...pages, ...programs];
}
