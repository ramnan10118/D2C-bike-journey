import { type ReactNode, useEffect, useId, useState } from "react";
import { Typography } from "@acko/typography";
import { X } from "lucide-react";

/** Keep in sync with `--motion-duration-sheet` in `index.css`. */
const SHEET_EXIT_MS = 200;

export interface BottomSheetProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

export function BottomSheet({ title, open, onClose, children, footer }: BottomSheetProps) {
  const titleId = useId();
  /** Stays true during exit animation after `open` becomes false. */
  const [mounted, setMounted] = useState(false);
  const [openUI, setOpenUI] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setOpenUI(false);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setOpenUI(true));
      });
      return () => cancelAnimationFrame(id);
    }
    setOpenUI(false);
    const t = window.setTimeout(() => setMounted(false), SHEET_EXIT_MS);
    return () => window.clearTimeout(t);
  }, [open]);

  /* Render when open (first paint) OR while exit animation runs — avoids skipping enter when mounted was false */
  if (!open && !mounted) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col justify-end bike-bottom-sheet-root"
      style={{ zIndex: "var(--z-modal)" }}
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
        className={`relative w-full mx-auto flex flex-col overflow-hidden bike-bottom-sheet-panel max-h-[90dvh] ${openUI ? "bike-bottom-sheet-panel--open" : ""}`}
        style={{
          maxWidth: "var(--layout-mobile-max-width)",
          background: "var(--color-card-elevated-bg)",
          borderTopLeftRadius: "var(--radius-3xl)",
          borderTopRightRadius: "var(--radius-3xl)",
          paddingTop: "var(--space-5)",
          paddingLeft: "var(--journey-inline-padding)",
          paddingRight: "var(--journey-inline-padding)",
          paddingBottom: footer ? 0 : "var(--space-5)",
          boxShadow: "var(--shadow-lg)",
          zIndex: 1,
        }}
      >
        <div
          className="bike-bottom-sheet-header flex items-start justify-between gap-3 shrink-0"
          style={{ marginBottom: "var(--space-4)" }}
        >
          <Typography
            id={titleId}
            variant="heading-md"
            color="primary"
            weight="bold"
            as="h2"
            className="min-w-0 flex-1 pr-2"
          >
            {title}
          </Typography>
          <button
            type="button"
            className="bike-bottom-sheet-close"
            aria-label="Close"
            onClick={onClose}
          >
            <X size={22} strokeWidth={2} aria-hidden />
          </button>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
        {footer ? (
          <div
            style={{
              paddingTop: "var(--space-4)",
              paddingBottom: "var(--space-5)",
            }}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
