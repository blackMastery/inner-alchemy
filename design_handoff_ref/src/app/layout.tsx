import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { BookingProvider } from "@/components/BookingContext";
import BookingModal from "@/components/BookingModal";

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

export const metadata: Metadata = {
  title: "Inner Alchemy Institution — Hadassah Headley",
  description:
    "Transformational life coaching and BQH/QHHT® quantum healing sessions with Hadassah Headley. Begin with a free 15-minute discovery call.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${karla.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <BookingProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <BookingModal />
        </BookingProvider>
      </body>
    </html>
  );
}
