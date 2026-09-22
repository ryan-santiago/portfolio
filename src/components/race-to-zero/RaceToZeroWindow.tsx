"use client";

import { RetroWindow } from "@/components/retro-window/RetroWindow";
import { useRaceToZero } from "./RaceToZeroContext";
import { RaceToZeroGame } from "./RaceToZeroGame";

export function RaceToZeroWindow() {
  const { isOpen, close } = useRaceToZero();
  if (!isOpen) return null;

  return (
    <RetroWindow
      title="race-to-zero.exe"
      ariaLabel="Race to Zero game"
      onClose={close}
      heightEstimate={290}
      spawnOffset={{ x: -300, y: 0 }}
    >
      <RaceToZeroGame />
    </RetroWindow>
  );
}
