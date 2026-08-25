import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { BookingProvider } from "@/components/BookingContext";
import BookingModal from "@/components/BookingModal";
import { SITE, PRACTITIONER } from "@/content/site";

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

const DESCRIPTION =
  "Transformational life coaching with Hadassah Headley — identity transformation, subconscious healing and practical manifestation, online. Plus BQH/QHHT® quantum healing sessions. Begin with a free 15-minute discovery call.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Inner Alchemy Institution — Hadassah Headley",
    template: "%s — Inner Alchemy Institution",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Inner Alchemy Institution",
    title: "Inner Alchemy Institution — Hadassah Headley",
    description: DESCRIPTION,
    url: SITE.url,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inner Alchemy Institution — Hadassah Headley",
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE.url}/#practitioner`,
        name: PRACTITIONER.name,
        jobTitle: "Transformational life coach · BQH/QHHT® practitioner",
        url: `${SITE.url}/story`,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.url}/#practice`,
        name: "Inner Alchemy Institution",
        description: DESCRIPTION,
        url: SITE.url,
        email: SITE.email,
        areaServed: "Worldwide",
        address: { "@type": "PostalAddress", addressLocality: SITE.location },
        founder: { "@id": `${SITE.url}/#practitioner` },
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
        <BookingProvider>
          <SiteHeader />
          <main id="main" className="flex-1">{children}</main>
          <SiteFooter />
          <BookingModal />
        </BookingProvider>
      </body>
    </html>
  );
}
