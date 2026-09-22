"use client";

import { RetroWindow } from "@/components/retro-window/RetroWindow";
import { useGame2048 } from "./Game2048Context";
import { Game2048 } from "./Game2048";

export function Game2048Window() {
  const { isOpen, close } = useGame2048();
  if (!isOpen) return null;

  return (
    <RetroWindow
      title="2048.exe"
      ariaLabel="2048 game"
      onClose={close}
      width={230}
      heightEstimate={360}
      spawnOffset={{ x: -600, y: 0 }}
    >
      <Game2048 />
    </RetroWindow>
  );
}
