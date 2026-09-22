"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Reference-counted so multiple retro windows can be open at once without
// one window's close accidentally clearing the flag for another.
let openWindowCount = 0;

function registerOpenWindow() {
  openWindowCount += 1;
  document.body.dataset.modalOpen = "true";
}

function unregisterOpenWindow() {
  openWindowCount = Math.max(0, openWindowCount - 1);
  if (openWindowCount === 0) {
    delete document.body.dataset.modalOpen;
  }
}

interface DragState {
  pointerId: number;
  offsetX: number;
  offsetY: number;
}

const DEFAULT_WIDTH = 260;
const DEFAULT_HEIGHT_ESTIMATE = 320;

export function RetroWindow({
  title,
  ariaLabel,
  onClose,
  width = DEFAULT_WIDTH,
  heightEstimate = DEFAULT_HEIGHT_ESTIMATE,
  spawnOffset = { x: 0, y: 0 },
  children,
}: {
  title: string;
  ariaLabel: string;
  onClose: () => void;
  width?: number;
  heightEstimate?: number;
  spawnOffset?: { x: number; y: number };
  children: ReactNode;
}) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const dragRef = useRef<DragState | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  // Mount/unmount of this component IS the window opening/closing, since
  // callers only render <RetroWindow> while their own isOpen is true.
  useEffect(() => {
    registerOpenWindow();
    return () => unregisterOpenWindow();
  }, []);

  useEffect(() => {
    // Anchored near the top-right rather than the bottom-right: these
    // windows are launched from the footer, and spawning them there would
    // let an open window cover the footer's icon row, blocking access to
    // any other game icons next to the one just clicked.
    setPosition({
      x: Math.max(16, window.innerWidth - width - 32 + spawnOffset.x),
      y: Math.max(16, 96 + spawnOffset.y),
    });
    // Only ever compute the initial spawn position once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const height = rect?.height ?? heightEstimate;
    const maxX = window.innerWidth - width;
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

  if (position === null) return null;

  return (
    <div
      ref={windowRef}
      role="dialog"
      aria-label={ariaLabel}
      style={{ left: position.x, top: position.y, width }}
      className="fixed z-[200] border-2 border-charcoal bg-white font-mono text-charcoal shadow-2xl select-none"
    >
      {/* The close button is a SIBLING of the draggable area, not a child —
          a pointerdown on a descendant still bubbles to the drag handler's
          setPointerCapture, which (for mouse input) isn't released on
          pointerup automatically, silently swallowing clicks on any nested
          button. */}
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
          <span className="text-xs font-bold">{title}</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${title}`}
          className="flex h-4 w-4 items-center justify-center border border-charcoal text-xs leading-none transition-colors hover:bg-charcoal hover:text-white"
        >
          &times;
        </button>
      </div>

      <div className="p-3">{children}</div>
    </div>
  );
}
