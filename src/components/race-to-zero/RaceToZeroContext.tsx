"use client";

import { createGameWindowContext } from "@/components/retro-window/createGameWindowContext";

export const { Provider: RaceToZeroProvider, useGameWindow: useRaceToZero } =
  createGameWindowContext("RaceToZero");
