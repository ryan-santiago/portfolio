"use client";

import { useEffect, useRef, useState } from "react";

const COLS = 18;
const ROWS = 13;
const CELL = 12;
const TICK_MS = 140;

type Point = [number, number];
type Status = "idle" | "playing" | "gameover";

const INITIAL_SNAKE: Point[] = [
  [8, 6],
  [7, 6],
  [6, 6],
];

function randomEmptyCell(occupied: Point[]): Point {
  let cell: Point;
  do {
    cell = [
      Math.floor(Math.random() * COLS),
      Math.floor(Math.random() * ROWS),
    ];
  } while (occupied.some(([x, y]) => x === cell[0] && y === cell[1]));
  return cell;
}

export function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>(() => randomEmptyCell(INITIAL_SNAKE));
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const directionRef = useRef<Point>([1, 0]);
  const pendingDirectionRef = useRef<Point>([1, 0]);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(randomEmptyCell(INITIAL_SNAKE));
    setScore(0);
    directionRef.current = [1, 0];
    pendingDirectionRef.current = [1, 0];
    setStatus("playing");
  };

  const queueDirection = (next: Point) => {
    if (status === "idle" || status === "gameover") {
      startGame();
      return;
    }
    const current = directionRef.current;
    if (current[0] + next[0] === 0 && current[1] + next[1] === 0) return;
    pendingDirectionRef.current = next;
  };

  useEffect(() => {
    const keyMap: Record<string, Point> = {
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const next = keyMap[event.key];
      if (!next) return;
      event.preventDefault();
      queueDirection(next);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [status]);

  useEffect(() => {
    if (status !== "playing") return;

    const id = window.setInterval(() => {
      directionRef.current = pendingDirectionRef.current;
      setSnake((prev) => {
        const [headX, headY] = prev[0];
        const [dx, dy] = directionRef.current;
        const newHead: Point = [headX + dx, headY + dy];

        const hitWall =
          newHead[0] < 0 ||
          newHead[0] >= COLS ||
          newHead[1] < 0 ||
          newHead[1] >= ROWS;
        const hitSelf = prev.some(
          ([x, y]) => x === newHead[0] && y === newHead[1],
        );

        if (hitWall || hitSelf) {
          setStatus("gameover");
          return prev;
        }

        const ateFood = newHead[0] === food[0] && newHead[1] === food[1];
        const nextSnake = [newHead, ...prev];
        if (!ateFood) {
          nextSnake.pop();
        } else {
          setScore((s) => s + 1);
          setFood(randomEmptyCell(nextSnake));
        }
        return nextSnake;
      });
    }, TICK_MS);

    return () => window.clearInterval(id);
  }, [status, food]);

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
      queueDirection(dx > 0 ? [1, 0] : [-1, 0]);
    } else {
      queueDirection(dy > 0 ? [0, 1] : [0, -1]);
    }
  };

  return (
    <div>
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative mx-auto overflow-hidden border-2 border-charcoal bg-white"
        style={{ width: COLS * CELL, height: ROWS * CELL, touchAction: "none" }}
      >
        {snake.map(([x, y], index) => (
          <div
            key={index}
            className="absolute bg-charcoal"
            style={{ left: x * CELL, top: y * CELL, width: CELL, height: CELL }}
          />
        ))}
        <div
          className="absolute bg-charcoal"
          style={{
            left: food[0] * CELL,
            top: food[1] * CELL,
            width: CELL,
            height: CELL,
          }}
        />

        {status !== "playing" && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-charcoal py-1.5 text-center text-xs font-bold tracking-widest text-white">
            {status === "gameover" ? "GAME OVER" : "PRESS ARROW"}
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-col items-center gap-1">
        <button
          type="button"
          onClick={() => queueDirection([0, -1])}
          aria-label="Move up"
          className="flex h-8 w-8 items-center justify-center border-2 border-charcoal text-sm transition-colors hover:bg-charcoal hover:text-white"
        >
          &#9650;
        </button>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => queueDirection([-1, 0])}
            aria-label="Move left"
            className="flex h-8 w-8 items-center justify-center border-2 border-charcoal text-sm transition-colors hover:bg-charcoal hover:text-white"
          >
            &#9664;
          </button>
          <button
            type="button"
            onClick={() => queueDirection([0, 1])}
            aria-label="Move down"
            className="flex h-8 w-8 items-center justify-center border-2 border-charcoal text-sm transition-colors hover:bg-charcoal hover:text-white"
          >
            &#9660;
          </button>
          <button
            type="button"
            onClick={() => queueDirection([1, 0])}
            aria-label="Move right"
            className="flex h-8 w-8 items-center justify-center border-2 border-charcoal text-sm transition-colors hover:bg-charcoal hover:text-white"
          >
            &#9654;
          </button>
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] font-semibold tracking-widest text-charcoal-soft uppercase">
        arrows / swipe &middot; score {score}
      </p>
    </div>
  );
}
