"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";

const ROUTE_ORDER = NAV_ITEMS.map((item) => item.href);

const EDGE_TOLERANCE = 4;
const WHEEL_THRESHOLD = 12;
const TOUCH_THRESHOLD = 40;
const NAVIGATION_LOCK_MS = 900;

export function ScrollPageNav() {
  const pathname = usePathname();
  const router = useRouter();
  const isLockedRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    const currentIndex = ROUTE_ORDER.indexOf(pathname);
    if (currentIndex === -1) return;

    const isAtTop = () => window.scrollY <= EDGE_TOLERANCE;
    const isAtBottom = () =>
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - EDGE_TOLERANCE;

    const goTo = (direction: 1 | -1) => {
      const nextHref = ROUTE_ORDER[currentIndex + direction];
      if (!nextHref || isLockedRef.current) return;

      isLockedRef.current = true;
      router.push(nextHref, {
        transitionTypes: [direction === 1 ? "nav-forward" : "nav-back"],
      });
      window.setTimeout(() => {
        isLockedRef.current = false;
      }, NAVIGATION_LOCK_MS);
    };

    const isModalOpen = () => document.body.dataset.modalOpen === "true";

    const onWheel = (event: WheelEvent) => {
      if (isLockedRef.current || isModalOpen()) return;
      if (event.deltaY > WHEEL_THRESHOLD && isAtBottom()) {
        event.preventDefault();
        goTo(1);
      } else if (event.deltaY < -WHEEL_THRESHOLD && isAtTop()) {
        event.preventDefault();
        goTo(-1);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const startY = touchStartYRef.current;
      touchStartYRef.current = null;
      if (isLockedRef.current || isModalOpen() || startY === null) return;

      const endY = event.changedTouches[0]?.clientY;
      if (endY === undefined) return;

      const delta = startY - endY;
      if (delta > TOUCH_THRESHOLD && isAtBottom()) {
        goTo(1);
      } else if (delta < -TOUCH_THRESHOLD && isAtTop()) {
        goTo(-1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [pathname, router]);

  return null;
}
