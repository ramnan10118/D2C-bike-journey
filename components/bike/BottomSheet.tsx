"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Typography } from "@acko/typography";

/** Keep in sync with `--motion-duration-sheet` in `globals.css`. */
const SHEET_EXIT_MS = 200;

function dismissThresholdPx(): number {
  return Math.min(
    120,
    typeof window !== "undefined" ? window.innerHeight * 0.15 : 120
  );
}

export interface BottomSheetProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

export function BottomSheet({
  title,
  open,
  onClose,
  children,
  footer,
}: BottomSheetProps) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [openUI, setOpenUI] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);

  const dragYLatest = useRef(0);
  const dragStartY = useRef(0);
  const dragStartOffset = useRef(0);
  const dragActiveRef = useRef(false);

  dragYLatest.current = dragY;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setMounted(true);
      setOpenUI(false);
      setDragY(0);
      dragActiveRef.current = false;
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setOpenUI(true));
      });
      return () => {
        cancelAnimationFrame(id);
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
    dragActiveRef.current = false;
    setDragging(false);
    setOpenUI(false);
    const t = window.setTimeout(() => setMounted(false), SHEET_EXIT_MS);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!open && !mounted) return null;

  const panelTransform = openUI ? `translateY(${dragY}px)` : "translateY(100%)";

  const onGrabPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!openUI || e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragActiveRef.current = true;
    setDragging(true);
    dragStartY.current = e.clientY;
    dragStartOffset.current = dragYLatest.current;
  };

  const onGrabPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragActiveRef.current) return;
    const delta = e.clientY - dragStartY.current;
    const next = Math.max(0, dragStartOffset.current + delta);
    dragYLatest.current = next;
    setDragY(next);
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragActiveRef.current) return;
    dragActiveRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    setDragging(false);
    if (dragYLatest.current >= dismissThresholdPx()) {
      onClose();
    } else {
      setDragY(0);
    }
  };

  return (
    <div
      className="fixed inset-0 flex flex-col justify-end z-[var(--z-modal)]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className={`bike-bottom-sheet-backdrop ${openUI ? "bike-bottom-sheet-backdrop--open" : ""}`}
        aria-label="Close overlay"
        onClick={onClose}
      />
      <div
        className={`relative w-full mx-auto flex flex-col overflow-hidden bike-bottom-sheet-panel max-h-[70dvh] max-w-[var(--layout-journey-max-width)] bg-[var(--color-card-elevated-bg)] rounded-tl-[var(--radius-3xl)] rounded-tr-[var(--radius-3xl)] pt-[var(--space-3)] px-[var(--journey-inline-padding)] shadow-[var(--shadow-lg)] z-[1] ${dragging ? "bike-bottom-sheet-panel--dragging" : ""} ${footer ? "pb-0" : "pb-[var(--space-5)]"}`}
        style={{ transform: panelTransform }}
      >
        <div
          className="bike-bottom-sheet-grab-area flex w-full shrink-0 justify-center"
          style={{ marginBottom: "var(--space-4)" }}
          onPointerDown={onGrabPointerDown}
          onPointerMove={onGrabPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div className="bike-bottom-sheet-grab" aria-hidden />
        </div>
        <div className="bike-bottom-sheet-header shrink-0 mb-[var(--space-4)]">
          <Typography
            id={titleId}
            variant="heading-md"
            color="primary"
            weight="bold"
            as="h2"
            className="min-w-0 w-full"
          >
            {title}
          </Typography>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {children}
        </div>
        {footer ? (
          <div className="bike-bottom-sheet-footer shrink-0 pt-[var(--space-10)] pb-[var(--space-5)]">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
