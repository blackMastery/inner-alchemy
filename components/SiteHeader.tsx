"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BookingButton from "./BookingButton";
import { CATEGORIES } from "@/content/programs";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs", children: Object.values(CATEGORIES) },
  { label: "FAQ", href: "/faq" },
  { label: "My Story", href: "/story" },
];

/** Home is exact; everything else also owns its child routes (/programs/coaching → Programs). */
const isActive = (item: NavItem, pathname: string) =>
  item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);

const linkClass = (active: boolean) =>
  `whitespace-nowrap border-b pb-[3px] text-sm font-semibold ${
    active ? "border-clay-light text-clay-dark" : "border-transparent text-body-2 hover:text-clay-dark"
  }`;

/**
 * A nav item with a submenu. The label is a real link; hover or focus reveals
 * the children (CSS), and the chevron toggles them for touch and keyboard
 * users (state). Escape and click-outside close; so does navigating away.
 */
function NavMenu({ item, pathname }: { item: NavItem & { children: NavChild[] }; pathname: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = `${item.label.toLowerCase()}-menu`;

  // Close when the route changes (back/forward, or a menu link) — the
  // "adjust state during render" pattern, so no effect-driven re-render.
  const [seenPathname, setSeenPathname] = useState(pathname);
  if (seenPathname !== pathname) {
    setSeenPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="group relative flex items-center gap-1"
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        href={item.href}
        aria-current={pathname === item.href ? "page" : undefined}
        className={linkClass(isActive(item, pathname))}
      >
        {item.label}
      </Link>
      <button
        ref={buttonRef}
        type="button"
        aria-label={`${item.label} submenu`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="-m-1 cursor-pointer p-1 text-body-2 hover:text-clay-dark"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
      {/* The before: pseudo bridges the gap above the menu so hover doesn't drop crossing it. */}
      <ul
        id={menuId}
        className={`absolute left-0 top-full mt-3 min-w-[240px] flex-col gap-0.5 rounded-[18px] border border-rule bg-parchment p-2 shadow-[0_12px_32px_rgba(46,42,36,0.10)] before:absolute before:inset-x-0 before:-top-3 before:h-3 group-hover:flex group-focus-within:flex ${
          open ? "flex" : "hidden"
        }`}
      >
        {item.children.map((child) => {
          const active = pathname === child.href;
          return (
            <li key={child.href}>
              <Link
                href={child.href}
                aria-current={active ? "page" : undefined}
                className={`block rounded-[12px] px-3.5 py-2.5 text-sm font-semibold no-underline ${
                  active ? "bg-linen-warm text-clay-dark" : "text-body-2 hover:bg-linen-warm hover:text-clay-dark"
                }`}
              >
                {child.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

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
        <Link href="/" className="flex min-w-0 items-center gap-3.5">
          <Image
            src="/logos/emblem-on-light.png"
            alt=""
            width={142}
            height={142}
            priority
            className="h-12 w-12 shrink-0 max-md:h-10 max-md:w-10"
          />
          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="font-display text-[26px] font-medium leading-none tracking-[0.04em] text-body max-md:text-[22px]">
              Inner Alchemy Institution
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted max-xl:hidden max-lg:block">
              Life Coaching &amp; Hypnotherapy Services
            </span>
          </span>
        </Link>

        {/* Hamburger takes over below 1024px, before the nav runs out of room */}
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
          className="hidden shrink-0 cursor-pointer flex-col gap-[5px] p-2 -m-2 max-lg:flex"
        >
          <span className="h-[1.5px] w-6 bg-body-2" />
          <span className="h-[1.5px] w-6 bg-body-2" />
          <span className="h-[1.5px] w-6 bg-body-2" />
        </button>

        <nav className="flex items-center gap-6 max-lg:hidden">
          {NAV.map((item) =>
            item.children ? (
              <NavMenu key={item.href} item={{ ...item, children: item.children }} pathname={pathname} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={linkClass(isActive(item, pathname))}
              >
                {item.label}
              </Link>
            ),
          )}
          <BookingButton size="sm">Book a free call</BookingButton>
        </nav>
      </div>

      {menuOpen && (
        <div id="mobile-nav" className="flex flex-col border-t border-rule bg-linen px-[22px] pb-[22px] pt-3.5 lg:hidden">
          {NAV.map((item) => (
            <div key={item.href} className="flex flex-col">
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`border-b border-rule-4 py-3.5 text-[17px] font-semibold ${
                  isActive(item, pathname) ? "text-clay-dark" : "text-body"
                }`}
              >
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={pathname === child.href ? "page" : undefined}
                  className={`border-b border-rule-4 py-3 pl-6 text-[15px] font-semibold ${
                    pathname === child.href ? "text-clay-dark" : "text-body-2"
                  }`}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <BookingButton className="mt-4 w-full">Book a free call</BookingButton>
        </div>
      )}
    </header>
  );
}
