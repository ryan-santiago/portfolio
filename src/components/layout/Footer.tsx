import { SITE_NAME } from "@/lib/constants";
import { SnakeIconButton } from "@/components/snake/SnakeIconButton";
import { RaceToZeroIconButton } from "@/components/race-to-zero/RaceToZeroIconButton";
import { Game2048IconButton } from "@/components/game2048/Game2048IconButton";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-8 text-sm text-charcoal-soft md:flex-row md:justify-between">
        <p>
          &copy; {year} {SITE_NAME}. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          <span>Tired of reading tech stacks? Take a quick break &rarr;</span>
          <div className="flex items-center gap-2">
            <SnakeIconButton />
            <RaceToZeroIconButton />
            <Game2048IconButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
