"use client";

import { useEffect, useState } from "react";

const START = 25;
const COMPUTER_THINK_MIN_MS = 700;
const COMPUTER_THINK_MAX_MS = 1400;

/** Randomized "thinking" pause so the computer's move doesn't feel like
 * an instant computation every time. */
function randomThinkDelay() {
  return (
    COMPUTER_THINK_MIN_MS +
    Math.random() * (COMPUTER_THINK_MAX_MS - COMPUTER_THINK_MIN_MS)
  );
}

type Status = "choose-first" | "player-turn" | "computer-turn" | "game-over";
type Winner = "player" | "computer" | null;

// Friendlier at higher numbers, a bit more pointed as the count drops —
// still meant as light ribbing, never mean.
const TEASE_LIGHT = [
  "Getting cozy down here, huh?",
  "I see you counting ahead. Cute.",
  "Halfway home... for one of us.",
  "Ooh, tightening up already.",
];
const TEASE_MEDIUM = [
  "You sure about that move?",
  "I've got a good feeling about this one.",
  "Careful now, it's getting spicy.",
  "Somebody's about to learn some math.",
];
const TEASE_SHARP = [
  "This is basically over. No hard feelings.",
  "I can already taste the victory lap.",
  "You might want to look away for this part.",
  "It's not you, it's... okay, it's kind of you.",
];

// Shown instead of the sharp tier when the upcoming turn is the player's
// and they're one move from winning — trash-talking a losing position
// would just be a bad read.
const TEASE_PLAYER_AHEAD = [
  "Looks like you're about to win this one.",
  "Uh oh, I think you've got me here.",
  "Nicely played — the finish line is right there.",
  "Okay, I may have miscalculated. Nice.",
];

function pickOne(pool: string[]) {
  return pool[Math.floor(Math.random() * pool.length)];
}

function pickTease(remaining: number): string | null {
  if (remaining >= 17 || remaining <= 0) return null;
  if (remaining > 11) return pickOne(TEASE_LIGHT);
  if (remaining > 5) return pickOne(TEASE_MEDIUM);
  return pickOne(TEASE_SHARP);
}

/** Tease to show heading into the player's turn — swaps in an
 * encouraging line when `remaining` is low enough that the player can
 * win outright on this next turn. */
function pickTeaseForPlayerTurn(remaining: number): string | null {
  if (remaining > 0 && remaining < 4) return pickOne(TEASE_PLAYER_AHEAD);
  return pickTease(remaining);
}

/** Leaves a multiple of 4 whenever possible (the winning strategy for this
 * game); otherwise the computer is already in a losing spot, so it just
 * picks a random legal move. */
function computerMove(remaining: number): number {
  const maxMove = Math.min(3, remaining);
  for (let move = 1; move <= maxMove; move += 1) {
    if ((remaining - move) % 4 === 0) return move;
  }
  return 1 + Math.floor(Math.random() * maxMove);
}

export function RaceToZeroGame() {
  const [remaining, setRemaining] = useState(START);
  const [status, setStatus] = useState<Status>("choose-first");
  const [winner, setWinner] = useState<Winner>(null);
  const [tease, setTease] = useState<string | null>(null);

  const chooseFirst = (who: "player" | "computer") => {
    setRemaining(START);
    setWinner(null);
    setTease(null);
    setStatus(who === "player" ? "player-turn" : "computer-turn");
  };

  const playerMove = (amount: number) => {
    if (status !== "player-turn" || amount > remaining) return;
    const next = remaining - amount;
    setRemaining(next);
    if (next === 0) {
      setWinner("player");
      setTease(null);
      setStatus("game-over");
    } else {
      // Tease only ever changes on the computer's own move — leave
      // whatever it last said on screen while the player decides.
      setStatus("computer-turn");
    }
  };

  useEffect(() => {
    if (status !== "computer-turn") return;
    const timeout = window.setTimeout(() => {
      const move = computerMove(remaining);
      const next = remaining - move;
      setRemaining(next);
      if (next === 0) {
        setWinner("computer");
        setTease(null);
        setStatus("game-over");
      } else {
        setTease(pickTeaseForPlayerTurn(next));
        setStatus("player-turn");
      }
    }, randomThinkDelay());
    return () => window.clearTimeout(timeout);
  }, [status, remaining]);

  let statusText: string;
  if (status === "choose-first") statusText = "WHO GOES FIRST?";
  else if (status === "game-over") {
    statusText = winner === "player" ? "YOU WIN!" : "COMPUTER WINS";
  } else if (status === "computer-turn") statusText = "COMPUTER'S TURN...";
  else if (tease) statusText = tease.toUpperCase();
  else statusText = "YOUR TURN";

  return (
    <div>
      <div
        className="mx-auto flex flex-col border-2 border-charcoal bg-white"
        style={{ width: 220 }}
      >
        <div
          className="flex flex-col items-center justify-center gap-1 py-4"
          style={{ minHeight: 84 }}
        >
          <span className="text-[11px] tracking-widest text-charcoal-soft uppercase">
            remaining
          </span>
          <span className="text-4xl font-bold">{remaining}</span>
        </div>

        <div className="bg-charcoal px-2 py-1.5 text-center text-[11px] font-bold tracking-widest text-white">
          {statusText}
        </div>
      </div>

      <div className="mt-3 flex flex-col items-center gap-2">
        {status === "choose-first" ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => chooseFirst("player")}
              className="border-2 border-charcoal px-4 py-2 text-xs font-bold transition-colors hover:bg-charcoal hover:text-white"
            >
              YOU
            </button>
            <button
              type="button"
              onClick={() => chooseFirst("computer")}
              className="border-2 border-charcoal px-4 py-2 text-xs font-bold transition-colors hover:bg-charcoal hover:text-white"
            >
              COMPUTER
            </button>
          </div>
        ) : status === "game-over" ? (
          <button
            type="button"
            onClick={() => {
              setRemaining(START);
              setWinner(null);
              setTease(null);
              setStatus("choose-first");
            }}
            className="border-2 border-charcoal px-4 py-2 text-xs font-bold transition-colors hover:bg-charcoal hover:text-white"
          >
            PLAY AGAIN
          </button>
        ) : (
          <div className="flex gap-2">
            {[1, 2, 3].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => playerMove(amount)}
                disabled={status !== "player-turn" || amount > remaining}
                className="flex h-10 w-10 items-center justify-center border-2 border-charcoal text-sm font-bold transition-colors hover:bg-charcoal hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-charcoal"
              >
                {amount}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="mt-3 text-center text-[11px] font-semibold tracking-widest text-charcoal-soft uppercase">
        pick 1, 2, or 3 &middot; reach zero to win
      </p>
    </div>
  );
}
