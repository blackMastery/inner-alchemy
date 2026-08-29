import { SITE } from "@/content/site";
import { priceValue, programHref, type Program } from "@/content/programs";

/** A schema.org Offer for one program, pointing at its own page. */
export function offerFor(p: Program) {
  return {
    "@type": "Offer",
    name: p.name,
    url: `${SITE.url}${programHref(p.slug)}`,
    price: priceValue(p),
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    areaServed: p.format === "in-person" ? SITE.location : "Worldwide",
    seller: { "@id": `${SITE.url}/#practice` },
  };
}

/** Home → Programs → …trail. Paths are site-relative. */
export function programBreadcrumbs(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "" }, { name: "Programs", path: "/programs" }, ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE.url}${t.path}`,
    })),
  };
}

/** Serialise for an inline <script type="application/ld+json">. */
export const jsonLdHtml = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
