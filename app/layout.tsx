import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE, PRACTITIONER, SOCIAL, LINKTREE_URL } from "@/content/site";
import { ALL_PROGRAMS, priceValue } from "@/content/programs";
import { STATIC_PAGES, mdPathFor } from "@/lib/pages";
import { SITE_NAME, OG_LOCALE } from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const { title: TITLE, description: DESCRIPTION } = STATIC_PAGES.home;

export const viewport: Viewport = {
  themeColor: "#FAF6EF",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE_NAME,
  title: {
    default: TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  authors: [{ name: PRACTITIONER.name, url: `${SITE.url}/story` }],
  creator: PRACTITIONER.name,
  category: "Life coaching & hypnotherapy",
  alternates: { canonical: "/", types: { "text/markdown": mdPathFor("/") } },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: OG_LOCALE,
    url: "/",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const prices = ALL_PROGRAMS.map(priceValue);
  const priceRange = `US$${Math.min(...prices).toLocaleString("en-US")}–US$${Math.max(...prices).toLocaleString("en-US")}`;
  const portrait = `${SITE.url}/images/hero-portrait.png`;
  // Her public profiles, so search engines and AI agents can tie this site to them.
  const sameAs = [...SOCIAL.map((s) => s.url), LINKTREE_URL];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE_NAME,
        description: DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE.url}/#practice` },
      },
      {
        "@type": "Person",
        "@id": `${SITE.url}/#practitioner`,
        name: PRACTITIONER.name,
        jobTitle: "Transformational life coach · BQH/QHHT® practitioner",
        description:
          "Transformational life coach and BQH/QHHT® practitioner guiding clients to clear limiting beliefs, heal subconscious patterns and consciously create their lives.",
        image: portrait,
        url: `${SITE.url}/story`,
        worksFor: { "@id": `${SITE.url}/#practice` },
        sameAs,
        knowsAbout: [
          "Transformational life coaching",
          "Identity transformation",
          "Subconscious healing",
          "Manifestation",
          "Beyond Quantum Healing (BQH)",
          "Quantum Healing Hypnosis Technique (QHHT)",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.url}/#practice`,
        name: SITE_NAME,
        description: DESCRIPTION,
        url: SITE.url,
        logo: `${SITE.url}/logos/logo-512.png`,
        image: portrait,
        email: SITE.email,
        telephone: SITE.phone,
        priceRange,
        currenciesAccepted: "USD",
        areaServed: "Worldwide",
        address: { "@type": "PostalAddress", addressLocality: SITE.location.split(",")[0].trim(), addressCountry: "GY" },
        founder: { "@id": `${SITE.url}/#practitioner` },
        sameAs,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Bookings",
          telephone: SITE.phone,
          email: SITE.email,
          availableLanguage: "English",
        },
        knowsAbout: ["Transformational life coaching", "BQH/QHHT® hypnotherapy sessions"],
      },
    ],
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${karla.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <SiteHeader />
        <main id="main" className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
