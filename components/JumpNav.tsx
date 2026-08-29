"use client";

import { useEffect, useRef, useState } from "react";

export type JumpItem = { id: string; label: string };

/**
 * Sticky in-page navigation for a long page. Plain anchors, so it works with
 * no JS; the observer only adds the "you are here" highlight.
 */
export default function JumpNav({ items }: { items: JumpItem[] }) {
  // null on the server → nothing highlighted at first paint, no hydration mismatch.
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // The topmost section whose top has passed under the header + bar wins.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  // Keep the active pill in view when the strip scrolls horizontally on small screens.
  useEffect(() => {
    if (!active) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-id="${active}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [active]);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[85px] z-40 border-b border-rule bg-linen/95 backdrop-blur-sm max-md:top-[77px]"
    >
      <ul
        ref={listRef}
        className="mx-auto flex max-w-[1120px] gap-2 overflow-x-auto px-8 py-3 max-md:px-[22px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const current = active === item.id;
          return (
            <li key={item.id} data-id={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={current ? "location" : undefined}
                className={`block whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-semibold no-underline transition-colors ${
                  current
                    ? "border-clay bg-clay text-linen"
                    : "border-rule bg-parchment text-body-2 hover:border-clay-light hover:text-clay-dark"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
