import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE, PRACTITIONER } from "@/content/site";
import { PROGRAMS, priceValue } from "@/content/programs";
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

const TITLE = "Transformational Life Coach & BQH/QHHT® Practitioner — Inner Alchemy Institution";
const DESCRIPTION =
  "Transformational life coaching with Hadassah Headley — clear limiting beliefs, heal subconscious patterns and consciously create your life, online. Eight coaching programs plus BQH/QHHT® quantum healing sessions. Book a free 15-minute call.";

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
  alternates: { canonical: "/" },
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
  const prices = PROGRAMS.map(priceValue);
  const priceRange = `$${Math.min(...prices).toLocaleString("en-US")}–$${Math.max(...prices).toLocaleString("en-US")}`;
  const portrait = `${SITE.url}/images/hero-portrait.png`;

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
        image: portrait,
        email: SITE.email,
        telephone: SITE.phone,
        priceRange,
        currenciesAccepted: "USD",
        areaServed: "Worldwide",
        address: { "@type": "PostalAddress", addressLocality: SITE.location.split(",")[0].trim(), addressCountry: "GY" },
        founder: { "@id": `${SITE.url}/#practitioner` },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Bookings",
          telephone: SITE.phone,
          email: SITE.email,
          availableLanguage: "English",
        },
        knowsAbout: ["Transformational life coaching", "BQH/QHHT® quantum healing sessions"],
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
