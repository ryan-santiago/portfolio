"use client";

import { createGameWindowContext } from "@/components/retro-window/createGameWindowContext";

export const { Provider: Game2048Provider, useGameWindow: useGame2048 } =
  createGameWindowContext("Game2048");
