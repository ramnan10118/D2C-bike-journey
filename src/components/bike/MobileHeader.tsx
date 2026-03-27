import { type ReactNode } from "react";
import { Button } from "@acko/button";
import { Typography } from "@acko/typography";
import { ChevronLeft } from "lucide-react";

export interface MobileHeaderProps {
  title: string;
  onBack?: () => void;
  subtitle?: ReactNode;
}

export function MobileHeader({ title, onBack, subtitle }: MobileHeaderProps) {
  return (
    <header
      style={{
        paddingTop: "var(--space-4)",
        paddingBottom: "var(--space-4)",
        borderBottom: "var(--border-hairline) solid var(--color-border-subtle)",
      }}
    >
      <div className="flex items-center gap-2">
        {onBack ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            iconOnly
            aria-label="Back"
            onClick={onBack}
          >
            <ChevronLeft size={22} strokeWidth={2} />
          </Button>
        ) : (
          <span style={{ width: "var(--space-10)" }} aria-hidden />
        )}
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
        <div style={{ marginTop: "var(--space-2)" }}>{subtitle}</div>
      ) : null}
    </header>
  );
}
