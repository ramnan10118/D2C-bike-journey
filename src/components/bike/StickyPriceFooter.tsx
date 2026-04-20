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

/** Slightly larger than heading-lg for sticky total (journey tokens in index.css :root) */
const amountTypographyStyle = {
  fontSize: "var(--journey-sticky-footer-amount-size)",
  lineHeight: "var(--journey-sticky-footer-amount-line)",
} as const;

const glassPadding = {
  paddingLeft: "var(--space-5)",
  paddingRight: "var(--space-5)",
  paddingTop: "var(--space-5)",
  paddingBottom: "var(--space-5)",
} as const;

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
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[var(--z-sticky)] mx-auto box-border w-full max-w-[var(--layout-journey-max-width)]"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div
        className="bike-sticky-price-footer-glass pointer-events-auto min-w-0"
        style={{
          ...glassPadding,
        }}
      >
        <div className="bike-sticky-price-footer-glass-inner flex min-w-0 items-center justify-between"
          style={{ gap: "var(--space-3)" }}
        >
          <div className="min-w-0 flex flex-col" style={{ gap: "var(--space-1)" }}>
            {inclusiveGst ? (
              <>
                <div className="flex flex-wrap items-baseline" style={{ gap: "var(--space-2)" }}>
                  <Typography
                    variant="heading-lg"
                    color="primary"
                    weight="bold"
                    as="span"
                    style={amountTypographyStyle}
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
                    style={{ minHeight: "var(--space-5)", height: "var(--space-5)" }}
                    onClick={onPremiumBreakup}
                  >
                    Premium breakup
                  </Button>
                ) : null}
              </>
            ) : (
              <>
                <div className="flex flex-wrap items-baseline" style={{ gap: "var(--space-2)" }}>
                  <Typography
                    variant="heading-lg"
                    color="primary"
                    weight="bold"
                    as="span"
                    style={amountTypographyStyle}
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
                    style={{ minHeight: "var(--space-5)", height: "var(--space-5)" }}
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
            size="md"
            disabled={ctaDisabled}
            onClick={onCta}
            style={{
              flexShrink: 0,
              paddingLeft: "var(--space-8)",
              paddingRight: "var(--space-8)",
            }}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </footer>
  );
}
