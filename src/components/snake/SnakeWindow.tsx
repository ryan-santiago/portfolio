"use client";

import { RetroWindow } from "@/components/retro-window/RetroWindow";
import { useSnakeGame } from "./SnakeGameContext";
import { SnakeGame } from "./SnakeGame";

export function SnakeWindow() {
  const { isOpen, close } = useSnakeGame();
  if (!isOpen) return null;

  return (
    <RetroWindow title="snake.exe" ariaLabel="Snake game" onClose={close}>
      <SnakeGame />
    </RetroWindow>
  );
}
