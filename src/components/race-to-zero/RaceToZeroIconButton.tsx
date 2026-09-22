"use client";

import { useRaceToZero } from "./RaceToZeroContext";

export function RaceToZeroIconButton() {
  const { open } = useRaceToZero();

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Play Race to Zero"
      title="Play Race to Zero"
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
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      </svg>
    </button>
  );
}
