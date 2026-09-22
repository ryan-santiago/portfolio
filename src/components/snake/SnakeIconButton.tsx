"use client";

import { useSnakeGame } from "./SnakeGameContext";

export function SnakeIconButton() {
  const { open } = useSnakeGame();

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Play Snake"
      title="Play Snake"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-charcoal-soft transition-colors hover:border-accent hover:text-accent"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect x="1" y="1" width="3" height="3" fill="currentColor" />
        <rect x="4" y="1" width="3" height="3" fill="currentColor" />
        <rect x="7" y="1" width="3" height="3" fill="currentColor" />
        <rect x="7" y="4" width="3" height="3" fill="currentColor" />
        <rect x="7" y="7" width="3" height="3" fill="currentColor" />
        <rect x="10" y="7" width="3" height="3" fill="currentColor" />
        <rect x="13" y="7" width="3" height="3" fill="currentColor" />
      </svg>
    </button>
  );
}
