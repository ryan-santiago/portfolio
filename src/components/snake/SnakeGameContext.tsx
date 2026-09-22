"use client";

import { createGameWindowContext } from "@/components/retro-window/createGameWindowContext";

export const { Provider: SnakeGameProvider, useGameWindow: useSnakeGame } =
  createGameWindowContext("SnakeGame");
