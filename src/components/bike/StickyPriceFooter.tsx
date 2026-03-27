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
        paddingLeft: "var(--space-4)",
        paddingRight: "var(--space-4)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          {inclusiveGst ? (
            <>
              <div className="flex flex-wrap items-baseline gap-2">
                <Typography variant="heading-md" color="primary" weight="bold" as="span">
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
                  className="!px-0 !justify-start"
                  onClick={onPremiumBreakup}
                >
                  Premium breakup
                </Button>
              ) : null}
            </>
          ) : (
            <>
              <div className="flex flex-wrap items-baseline gap-2">
                <Typography variant="heading-md" color="primary" weight="bold" as="span">
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
                  className="!px-0 !justify-start"
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
          style={{ flexShrink: 0 }}
        >
          {ctaLabel}
        </Button>
      </div>
    </footer>
  );
}
