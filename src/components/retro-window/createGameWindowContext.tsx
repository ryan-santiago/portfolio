"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface GameWindowContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

/**
 * Factory for a game's open/close state. Each mini-game (Snake, Race to
 * Zero, ...) gets its own independent context via this, so multiple game
 * windows can be open at once without sharing state.
 */
export function createGameWindowContext(name: string) {
  const Context = createContext<GameWindowContextValue | null>(null);
  Context.displayName = `${name}Context`;

  function Provider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Context.Provider
        value={{
          isOpen,
          open: () => setIsOpen(true),
          close: () => setIsOpen(false),
        }}
      >
        {children}
      </Context.Provider>
    );
  }

  function useGameWindow() {
    const context = useContext(Context);
    if (!context) {
      throw new Error(`${name} hooks must be used within its Provider`);
    }
    return context;
  }

  return { Provider, useGameWindow };
}
