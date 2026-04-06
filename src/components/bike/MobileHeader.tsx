import { type ReactNode } from "react";
import { Button } from "@acko/button";
import { Typography } from "@acko/typography";
import { ChevronLeft } from "lucide-react";

export interface MobileHeaderProps {
  title: string;
  /** Journey back; omit on the entry screen until you wire navigation manually. */
  onBack?: () => void;
  /**
   * Show the back control when `onBack` is not set yet (same chrome as other steps).
   * Pair with `onBack` later, or pass only `onBack` — no need to keep `showBack`.
   */
  showBack?: boolean;
  subtitle?: ReactNode;
}

export function MobileHeader({ title, onBack, showBack, subtitle }: MobileHeaderProps) {
  const backUi = Boolean(onBack) || Boolean(showBack);
  const backEnabled = Boolean(onBack);

  return (
    <header>
      {/* Top nav + divider under nav (above title), per reference layout. */}
      <div style={{ paddingTop: "var(--space-4)" }}>
        <div className="flex items-center" style={{ minHeight: "var(--space-10)" }}>
          {backUi ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              iconOnly
              aria-label="Back"
              disabled={!backEnabled}
              onClick={onBack}
              className="mobile-header-back"
              iconLeft={<ChevronLeft size={24} strokeWidth={2} aria-hidden />}
            >
              Back
            </Button>
          ) : (
            <span style={{ width: "var(--space-10)" }} aria-hidden />
          )}
        </div>
        <div
          className="mobile-header-divider-bleed"
          role="presentation"
          style={{
            marginTop: "var(--space-2)",
            borderBottom: "var(--border-hairline) solid var(--color-border-subtle)",
          }}
        />
      </div>

      <Typography
        variant="heading-lg"
        color="primary"
        weight="bold"
        as="h1"
        style={{ marginTop: "var(--space-4)" }}
      >
        {title}
      </Typography>
      {subtitle ? (
        <div
          className="mobile-header-subtitle w-full min-w-0"
          style={{ marginTop: "calc(-3 * var(--scale-1))" }}
        >
          {subtitle}
        </div>
      ) : null}
    </header>
  );
}
