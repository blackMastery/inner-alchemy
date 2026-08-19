"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BookingButton from "./BookingButton";

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "The Session", href: "/session" },
  { label: "QHHT", href: "/qhht" },
  { label: "FAQ", href: "/faq" },
  { label: "My Story", href: "/story" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-linen/95 backdrop-blur-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-clay focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-linen"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-8 px-8 py-[18px] max-md:px-[22px]">
        <Link href="/" className="flex flex-col gap-0.5">
          <span className="flex items-baseline gap-2.5 font-display text-[26px] font-medium tracking-[0.04em] text-body">
            Inner <span aria-hidden="true" className="text-[15px] text-clay">✦</span> Alchemy
          </span>
          <span className="text-[11px] uppercase tracking-[0.24em] text-muted">
            Institution · Life Coaching &amp; Hypnotherapy Services
          </span>
        </Link>

        {/* Hamburger takes over below 1024px, before the nav runs out of room */}
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
          className="hidden cursor-pointer flex-col gap-[5px] p-2 -m-2 max-lg:flex"
        >
          <span className="h-[1.5px] w-6 bg-body-2" />
          <span className="h-[1.5px] w-6 bg-body-2" />
          <span className="h-[1.5px] w-6 bg-body-2" />
        </button>

        <nav className="flex items-center gap-7 max-lg:hidden">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`border-b pb-[3px] text-sm font-semibold ${
                  active ? "border-clay-light text-clay-dark" : "border-transparent text-body-2 hover:text-clay-dark"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <BookingButton size="sm">Book a free call</BookingButton>
        </nav>
      </div>

      {menuOpen && (
        <div id="mobile-nav" className="flex flex-col border-t border-rule bg-linen px-[22px] pb-[22px] pt-3.5 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`border-b border-rule-4 py-3.5 text-[17px] font-semibold ${
                pathname === item.href ? "text-clay-dark" : "text-body"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <BookingButton className="mt-4 w-full">Book a free call</BookingButton>
        </div>
      )}
    </header>
  );
}
