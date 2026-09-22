"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SITE_NAME_PRIMARY, SITE_NAME_SECONDARY } from "@/lib/constants";
import { Nav } from "./Nav";
import { ChatBubbleIcon } from "@/components/ui/ChatBubbleIcon";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={`sticky top-0 z-50 border-b transition-all duration-200 ${
        isScrolled
          ? "border-border bg-surface/95 shadow-sm backdrop-blur"
          : "border-transparent bg-surface/80 backdrop-blur"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 transition-all duration-200 sm:px-6 ${
          isScrolled ? "py-3" : "py-4"
        }`}
      >
        <Link href="/" className="shrink-0 text-lg font-extrabold sm:text-xl">
          <span className="text-charcoal">{SITE_NAME_PRIMARY}</span>
          <span className="text-accent">{SITE_NAME_SECONDARY}</span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
          <Nav />
          <ChatBubbleIcon />
        </div>
      </div>
    </header>
  );
}
