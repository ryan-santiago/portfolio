"use client";

import { useEffect, useRef, useState } from "react";

const SIZE = 4;
const CELL = 48;
const GAP = 4;
const WIN_VALUE = 2048;
const SLIDE_MS = 130;

type Direction = "up" | "down" | "left" | "right";
type Status = "playing" | "over";

interface Tile {
  id: number;
  value: number;
  row: number;
  col: number;
}

function tilesToGrid(tiles: Tile[]): number[][] {
  const grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  for (const tile of tiles) grid[tile.row][tile.col] = tile.value;
  return grid;
}

function emptyCells(tiles: Tile[]): [number, number][] {
  const grid = tilesToGrid(tiles);
  const cells: [number, number][] = [];
  for (let r = 0; r < SIZE; r += 1) {
    for (let c = 0; c < SIZE; c += 1) {
      if (grid[r][c] === 0) cells.push([r, c]);
    }
  }
  return cells;
}

function hasMovesLeft(tiles: Tile[]): boolean {
  if (emptyCells(tiles).length > 0) return true;
  const grid = tilesToGrid(tiles);
  for (let r = 0; r < SIZE; r += 1) {
    for (let c = 0; c < SIZE; c += 1) {
      const value = grid[r][c];
      if (c < SIZE - 1 && grid[r][c + 1] === value) return true;
      if (r < SIZE - 1 && grid[r + 1][c] === value) return true;
    }
  }
  return false;
}

/** Maps "the nth slot along the direction of travel, within line `lineIndex`"
 * to an actual (row, col) — e.g. for "left", line = row, slot 0 = col 0. */
function slotToRowCol(direction: Direction, lineIndex: number, slot: number) {
  switch (direction) {
    case "left":
      return { row: lineIndex, col: slot };
    case "right":
      return { row: lineIndex, col: SIZE - 1 - slot };
    case "up":
      return { row: slot, col: lineIndex };
    case "down":
      return { row: SIZE - 1 - slot, col: lineIndex };
  }
}

/** Computes where every tile slides to for this move, and which pairs
 * merge. Returns the slid (but not yet merged/spawned) tile positions —
 * a merged-away tile slides to the same slot as the tile it merges into,
 * so both animate into the same cell before the merge resolves. */
function computeSlide(tiles: Tile[], direction: Direction) {
  const lines: Tile[][] = Array.from({ length: SIZE }, () => []);
  for (const tile of tiles) {
    const lineIndex = direction === "left" || direction === "right" ? tile.row : tile.col;
    lines[lineIndex].push(tile);
  }

  const axisPosition = (tile: Tile) =>
    direction === "left" || direction === "right" ? tile.col : tile.row;
  const ascending = direction === "left" || direction === "up";
  for (const line of lines) {
    line.sort((a, b) => (ascending ? axisPosition(a) - axisPosition(b) : axisPosition(b) - axisPosition(a)));
  }

  const slid: Tile[] = [];
  const mergedIds = new Set<number>();
  const mergeTargets = new Map<number, number>(); // survivor tile id -> new value
  let gained = 0;
  let moved = false;

  lines.forEach((line, lineIndex) => {
    let slot = 0;
    let i = 0;
    while (i < line.length) {
      const current = line[i];
      const next = line[i + 1];
      const { row, col } = slotToRowCol(direction, lineIndex, slot);
      if (current.row !== row || current.col !== col) moved = true;
      slid.push({ ...current, row, col });

      if (next && next.value === current.value) {
        if (next.row !== row || next.col !== col) moved = true;
        slid.push({ ...next, row, col });
        mergedIds.add(next.id);
        mergeTargets.set(current.id, current.value * 2);
        gained += current.value * 2;
        i += 2;
      } else {
        i += 1;
      }
      slot += 1;
    }
  });

  return { slid, mergedIds, mergeTargets, gained, moved };
}

function tileClass(value: number) {
  if (value >= 128) return "border-charcoal bg-charcoal text-white";
  return "border-charcoal bg-white text-charcoal";
}

function tileTextSize(value: number) {
  if (value >= 1000) return "text-xs";
  if (value >= 100) return "text-sm";
  return "text-base";
}

export function Game2048() {
  const nextIdRef = useRef(1);
  const createTile = (row: number, col: number, value: number): Tile => ({
    id: nextIdRef.current++,
    value,
    row,
    col,
  });

  const spawnRandomTile = (tiles: Tile[]): Tile[] => {
    const empties = emptyCells(tiles);
    if (empties.length === 0) return tiles;
    const [row, col] = empties[Math.floor(Math.random() * empties.length)];
    const value = Math.random() < 0.9 ? 2 : 4;
    return [...tiles, createTile(row, col, value)];
  };

  const [tiles, setTiles] = useState<Tile[]>(() =>
    spawnRandomTile(spawnRandomTile([])),
  );
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<Status>("playing");
  const [justWon, setJustWon] = useState(false);
  const hasWonRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const restart = () => {
    isAnimatingRef.current = false;
    setTiles(spawnRandomTile(spawnRandomTile([])));
    setScore(0);
    setStatus("playing");
    setJustWon(false);
    hasWonRef.current = false;
  };

  const move = (direction: Direction) => {
    if (status === "over") {
      restart();
      return;
    }
    if (isAnimatingRef.current) return;

    const { slid, mergedIds, mergeTargets, gained, moved } = computeSlide(
      tiles,
      direction,
    );
    if (!moved) return;

    // Phase 1: slide everything (including tiles about to merge away) to
    // their destination — same ids, so the CSS transition animates it.
    isAnimatingRef.current = true;
    setTiles(slid);

    window.setTimeout(() => {
      // Phase 2: resolve merges into fresh tiles (so the "pop" plays on
      // mount) and spawn the new tile, now that the slide has landed.
      const survivors = slid.filter((tile) => !mergedIds.has(tile.id));
      const resolved = survivors.map((tile) => {
        const mergedValue = mergeTargets.get(tile.id);
        return mergedValue ? createTile(tile.row, tile.col, mergedValue) : tile;
      });
      const withSpawn = spawnRandomTile(resolved);

      setTiles(withSpawn);
      setScore((s) => s + gained);

      const reachedNow =
        !hasWonRef.current && withSpawn.some((tile) => tile.value >= WIN_VALUE);
      if (reachedNow) {
        hasWonRef.current = true;
        setJustWon(true);
      } else if (justWon) {
        setJustWon(false);
      }

      if (!hasMovesLeft(withSpawn)) {
        setStatus("over");
      }
      isAnimatingRef.current = false;
    }, SLIDE_MS);
  };

  useEffect(() => {
    const keyMap: Record<string, Direction> = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const direction = keyMap[event.key];
      if (!direction) return;
      event.preventDefault();
      move(direction);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiles, status, justWon]);

  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;

    if (Math.abs(dx) > Math.abs(dy)) {
      move(dx > 0 ? "right" : "left");
    } else {
      move(dy > 0 ? "down" : "up");
    }
  };

  let statusText: string;
  if (status === "over") statusText = "GAME OVER";
  else if (justWon) statusText = "YOU REACHED 2048!";
  else statusText = `SCORE ${score}`;

  const boardSize = SIZE * CELL + (SIZE - 1) * GAP;

  return (
    <div>
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative mx-auto border-2 border-charcoal bg-white p-1"
        style={{ width: boardSize + 8, height: boardSize + 8, touchAction: "none" }}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${SIZE}, ${CELL}px)`,
            gap: GAP,
          }}
        >
          {Array.from({ length: SIZE * SIZE }).map((_, index) => (
            <div
              key={index}
              className="border border-border"
              style={{ width: CELL, height: CELL }}
            />
          ))}
        </div>

        {tiles.map((tile) => (
          // Two nested elements on purpose: this outer one owns the slide
          // (a `transform: translate` transition), the inner one owns the
          // spawn/merge "pop" (a `transform: scale` keyframe animation).
          // Putting both transforms on one element would have the pop
          // animation clobber the slide's translate for its duration.
          <div
            key={tile.id}
            className="absolute top-1 left-1"
            style={{
              width: CELL,
              height: CELL,
              transform: `translate(${tile.col * (CELL + GAP)}px, ${tile.row * (CELL + GAP)}px)`,
              transition: `transform ${SLIDE_MS}ms ease-out`,
            }}
          >
            <div
              className={`tile-pop flex h-full w-full items-center justify-center border font-bold ${tileClass(tile.value)} ${tileTextSize(tile.value)}`}
            >
              {tile.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 bg-charcoal px-2 py-1.5 text-center text-[11px] font-bold tracking-widest text-white">
        {statusText}
      </div>

      <div className="mt-3 flex flex-col items-center gap-1">
        <button
          type="button"
          onClick={() => move("up")}
          aria-label="Move up"
          className="flex h-8 w-8 items-center justify-center border-2 border-charcoal text-sm transition-colors hover:bg-charcoal hover:text-white"
        >
          &#9650;
        </button>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => move("left")}
            aria-label="Move left"
            className="flex h-8 w-8 items-center justify-center border-2 border-charcoal text-sm transition-colors hover:bg-charcoal hover:text-white"
          >
            &#9664;
          </button>
          <button
            type="button"
            onClick={() => move("down")}
            aria-label="Move down"
            className="flex h-8 w-8 items-center justify-center border-2 border-charcoal text-sm transition-colors hover:bg-charcoal hover:text-white"
          >
            &#9660;
          </button>
          <button
            type="button"
            onClick={() => move("right")}
            aria-label="Move right"
            className="flex h-8 w-8 items-center justify-center border-2 border-charcoal text-sm transition-colors hover:bg-charcoal hover:text-white"
          >
            &#9654;
          </button>
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] font-semibold tracking-widest text-charcoal-soft uppercase">
        arrows / swipe &middot; merge to 2048
      </p>
    </div>
  );
}
