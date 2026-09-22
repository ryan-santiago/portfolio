"use client";

import { useGame2048 } from "./Game2048Context";

export function Game2048IconButton() {
  const { open } = useGame2048();

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Play 2048"
      title="Play 2048"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-charcoal-soft transition-colors hover:border-accent hover:text-accent"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    </button>
  );
}
