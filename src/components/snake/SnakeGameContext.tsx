"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface SnakeGameContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const SnakeGameContext = createContext<SnakeGameContextValue | null>(null);

export function SnakeGameProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SnakeGameContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </SnakeGameContext.Provider>
  );
}

export function useSnakeGame() {
  const context = useContext(SnakeGameContext);
  if (!context) {
    throw new Error("useSnakeGame must be used within a SnakeGameProvider");
  }
  return context;
}
