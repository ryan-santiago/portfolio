"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";

const ROUTE_ORDER = NAV_ITEMS.map((item) => item.href);

export function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const currentIndex = ROUTE_ORDER.indexOf(pathname);
  const getTransitionTypes = (href: string) => {
    const targetIndex = ROUTE_ORDER.indexOf(href);
    if (currentIndex === -1 || targetIndex === -1 || targetIndex === currentIndex) {
      return undefined;
    }
    return [targetIndex > currentIndex ? "nav-forward" : "nav-back"];
  };

  return (
    <div className="relative">
      <nav className="hidden items-center gap-6 text-sm sm:flex md:gap-8 md:text-base">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            transitionTypes={getTransitionTypes(item.href)}
            className={
              isActive(item.href)
                ? "font-semibold text-accent"
                : "font-medium text-charcoal-soft transition-colors hover:text-charcoal"
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-surface-alt sm:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          {isOpen ? (
            <path d="M18 6 6 18M6 6l12 12" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" />
          )}
        </svg>
      </button>

      {isOpen && (
        <nav className="absolute right-0 top-full z-50 mt-3 flex w-40 flex-col gap-1 rounded-xl border border-border bg-surface p-2 shadow-lg sm:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              transitionTypes={getTransitionTypes(item.href)}
              onClick={() => setIsOpen(false)}
              className={
                isActive(item.href)
                  ? "rounded-lg px-3 py-2 text-sm font-semibold text-accent"
                  : "rounded-lg px-3 py-2 text-sm font-medium text-charcoal-soft transition-colors hover:bg-surface-alt hover:text-charcoal"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
