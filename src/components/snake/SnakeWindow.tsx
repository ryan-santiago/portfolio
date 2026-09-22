"use client";

import { useEffect, useRef, useState } from "react";
import { useSnakeGame } from "./SnakeGameContext";
import { SnakeGame } from "./SnakeGame";

const WINDOW_WIDTH = 260;
const WINDOW_HEIGHT_ESTIMATE = 320;

interface DragState {
  pointerId: number;
  offsetX: number;
  offsetY: number;
}

export function SnakeWindow() {
  const { isOpen, close } = useSnakeGame();
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const dragRef = useRef<DragState | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.dataset.modalOpen = "true";
    return () => {
      delete document.body.dataset.modalOpen;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || position !== null) return;
    setPosition({
      x: Math.max(16, window.innerWidth - WINDOW_WIDTH - 32),
      y: Math.max(16, window.innerHeight - WINDOW_HEIGHT_ESTIMATE - 32),
    });
  }, [isOpen, position]);

  const onTitleBarPointerDown = (event: React.PointerEvent) => {
    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragRef.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  };

  const onTitleBarPointerMove = (event: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const rect = windowRef.current?.getBoundingClientRect();
    const height = rect?.height ?? WINDOW_HEIGHT_ESTIMATE;
    const maxX = window.innerWidth - WINDOW_WIDTH;
    const maxY = window.innerHeight - height;

    setPosition({
      x: Math.min(Math.max(0, event.clientX - drag.offsetX), Math.max(0, maxX)),
      y: Math.min(Math.max(0, event.clientY - drag.offsetY), Math.max(0, maxY)),
    });
  };

  const onTitleBarPointerUp = (event: React.PointerEvent) => {
    dragRef.current = null;
    const target = event.currentTarget as HTMLElement;
    if (target.hasPointerCapture(event.pointerId)) {
      target.releasePointerCapture(event.pointerId);
    }
  };

  if (!isOpen || position === null) return null;

  return (
    <div
      ref={windowRef}
      role="dialog"
      aria-label="Snake game"
      style={{ left: position.x, top: position.y, width: WINDOW_WIDTH }}
      className="fixed z-[200] border-2 border-charcoal bg-white font-mono text-charcoal shadow-2xl select-none"
    >
      <div className="flex items-center justify-between border-b-2 border-charcoal px-2 py-1.5">
        <div
          onPointerDown={onTitleBarPointerDown}
          onPointerMove={onTitleBarPointerMove}
          onPointerUp={onTitleBarPointerUp}
          onPointerCancel={onTitleBarPointerUp}
          style={{ touchAction: "none" }}
          className="flex flex-1 cursor-move items-center gap-2"
        >
          <div className="flex gap-1" aria-hidden="true">
            <span className="h-3 w-3 border border-charcoal" />
            <span className="h-3 w-3 border border-charcoal" />
          </div>
          <span className="text-xs font-bold">snake.exe</span>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close snake game"
          className="flex h-4 w-4 items-center justify-center border border-charcoal text-xs leading-none transition-colors hover:bg-charcoal hover:text-white"
        >
          &times;
        </button>
      </div>

      <div className="p-3">
        <SnakeGame />
      </div>
    </div>
  );
}
