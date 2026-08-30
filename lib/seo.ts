import type { Metadata } from "next";
import { mdPathFor, type PageMeta } from "./pages";

export const SITE_NAME = "Inner Alchemy Institution";
export const OG_LOCALE = "en_GB";

/**
 * Per-page metadata in one shape.
 *
 * Next merges `openGraph` and `twitter` *shallowly*: the moment a page sets
 * either, the root layout's version is dropped wholesale. Building both here
 * keeps every page's share card in step with its title, description and
 * canonical — while the file-convention `opengraph-image.tsx` still attaches
 * the image automatically.
 *
 * Every page also advertises its Markdown twin (`<link rel="alternate"
 * type="text/markdown">`) so AI agents can find the plain-text version.
 */
export function pageMetadata({ title, description, path, absoluteTitle = false }: PageMeta): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} — ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path, types: { "text/markdown": mdPathFor(path) } },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: OG_LOCALE,
      url: path,
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
