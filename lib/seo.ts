import type { Metadata } from "next";

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
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  /** Page title. Templated as "<title> — Inner Alchemy Institution" unless `absoluteTitle`. */
  title: string;
  description: string;
  /** Route path, e.g. "/programs". Becomes the canonical and og:url. */
  path: string;
  /** Use the title verbatim in <title> — for the home page, where the brand leads. */
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} — ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
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
