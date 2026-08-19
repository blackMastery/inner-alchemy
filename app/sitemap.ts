import type { MetadataRoute } from "next";
import { SITE, PROGRAMS } from "@/content/site";
import { JOURNAL } from "@/content/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`;

  const pages: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    // The conversion engine — the page that answers what actually happens.
    { url: url("/session"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/programs"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/qhht"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/faq"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/story"), changeFrequency: "yearly", priority: 0.7 },
    { url: url("/journal"), changeFrequency: "weekly", priority: 0.7 },
  ];

  const programs: MetadataRoute.Sitemap = PROGRAMS.map((p) => ({
    url: url(`/programs/${p.slug}`),
    changeFrequency: "monthly",
    priority: p.featured ? 0.8 : 0.6,
  }));

  const posts: MetadataRoute.Sitemap = JOURNAL.map((p) => ({
    url: url(`/journal/${p.slug}`),
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...programs, ...posts];
}
