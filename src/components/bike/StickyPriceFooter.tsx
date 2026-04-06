import { Button } from "@acko/button";
import { Typography } from "@acko/typography";

export interface StickyPriceFooterProps {
  amountLabel: string;
  gstNote: string;
  showPremiumLink?: boolean;
  onPremiumBreakup?: () => void;
  ctaLabel: string;
  onCta: () => void;
  ctaDisabled?: boolean;
  /** When true, show single-line total with (Incl. GST) like review screen */
  inclusiveGst?: boolean;
}

export function StickyPriceFooter({
  amountLabel,
  gstNote,
  showPremiumLink = true,
  onPremiumBreakup,
  ctaLabel,
  onCta,
  ctaDisabled,
  inclusiveGst,
}: StickyPriceFooterProps) {
  return (
    <footer
      className="fixed left-0 right-0 bottom-0 mx-auto w-full"
      style={{
        maxWidth: "var(--layout-mobile-max-width)",
        zIndex: "var(--z-sticky)",
        background: "var(--color-card-elevated-bg)",
        borderTop: "var(--border-hairline) solid var(--color-border-subtle)",
        paddingTop: "var(--space-4)",
        paddingBottom: "calc(var(--space-4) + env(safe-area-inset-bottom, 0px))",
        paddingLeft: "var(--journey-inline-padding)",
        paddingRight: "var(--journey-inline-padding)",
        boxShadow: "var(--shadow-md)",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto",
        alignItems: "end",
        columnGap: "var(--space-3)",
      }}
    >
      <div className="min-w-0 flex flex-col" style={{ gap: "4px" }}>
        {inclusiveGst ? (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <Typography
                variant="heading-lg"
                color="primary"
                weight="bold"
                as="span"
                style={{ fontSize: "24px", lineHeight: 1.2 }}
              >
                {amountLabel}
              </Typography>
              <Typography variant="caption" color="secondary" as="span">
                {gstNote}
              </Typography>
            </div>
            {showPremiumLink && onPremiumBreakup ? (
              <Button
                type="button"
                variant="link"
                size="sm"
                className="!px-0 !justify-start !mt-0 !min-h-0 self-start"
                style={{ height: 20, minHeight: 20 }}
                onClick={onPremiumBreakup}
              >
                Premium breakup
              </Button>
            ) : null}
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <Typography
                variant="heading-lg"
                color="primary"
                weight="bold"
                as="span"
                style={{ fontSize: "24px", lineHeight: 1.2 }}
              >
                {amountLabel}
              </Typography>
              <Typography variant="body-sm" color="secondary" as="span">
                {gstNote}
              </Typography>
            </div>
            {showPremiumLink && onPremiumBreakup ? (
              <Button
                type="button"
                variant="link"
                size="sm"
                className="!px-0 !justify-start !mt-0 !min-h-0 self-start"
                style={{ height: 20, minHeight: 20 }}
                onClick={onPremiumBreakup}
              >
                Premium breakup
              </Button>
            ) : null}
          </>
        )}
      </div>
      <Button
        type="button"
        variant="primary"
        size="lg"
        disabled={ctaDisabled}
        onClick={onCta}
        style={{
          flexShrink: 0,
          paddingLeft: "var(--space-12)",
          paddingRight: "var(--space-12)",
        }}
      >
        {ctaLabel}
      </Button>
    </footer>
  );
}
