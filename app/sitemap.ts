import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { PROGRAM_PAGES, programHref } from "@/content/programs";
import { CONTENT_UPDATED, STATIC_PAGES } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`;
  const lastModified = CONTENT_UPDATED;

  const pages: MetadataRoute.Sitemap = [
    { url: url(STATIC_PAGES.home.path), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: url(STATIC_PAGES.programs.path), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: url(STATIC_PAGES.coaching.path), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: url(STATIC_PAGES.hypnotherapy.path), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: url(STATIC_PAGES.faq.path), lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: url(STATIC_PAGES.story.path), lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: url(STATIC_PAGES.session.path), lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];

  const programs: MetadataRoute.Sitemap = PROGRAM_PAGES.map((p) => ({
    url: url(programHref(p.slug)),
    lastModified,
    changeFrequency: "monthly",
    priority: p.featured ? 0.9 : 0.8,
  }));

  return [...pages, ...programs];
}
