"use client";

import { Typography } from "@acko/typography";
import { clsx } from "clsx";
import { ADDON_BREAKUP_LINES } from "@/lib/addonBreakup";
import { formatRupees } from "@/lib/format";
import {
  footerDisplayAmount,
  gstAmount,
  OWN_DAMAGE_PREMIUM,
  PLAN_COUPON_AMOUNT,
  THIRD_PARTY_PREMIUM,
  totalInclGst,
  useBikeJourney,
} from "@/context/BikeJourneyContext";

function Row({
  left,
  right,
  tone = "primary",
  noDividerBelow = false,
  variant = "sheet",
}: {
  left: string;
  right: string;
  tone?: "primary" | "brand" | "success";
  noDividerBelow?: boolean;
  variant?: "sheet" | "review";
}) {
  const color =
    tone === "brand" ? "brand" : tone === "success" ? "success" : "primary";

  if (variant === "review") {
    const leftColor =
      tone === "brand" ? "brand" : tone === "success" ? "success" : "secondary";
    return (
      <div
        className={clsx(
          "bike-sheet-kv-row premium-breakup-row",
          noDividerBelow && "bike-sheet-kv-row--no-divider-below"
        )}
      >
        <Typography variant="body-sm" color={leftColor} className="min-w-0 flex-1">
          {left}
        </Typography>
        <Typography
          variant="body-md"
          color={color}
          weight="semibold"
          className="shrink-0 text-right tabular-nums"
        >
          {right}
        </Typography>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "bike-sheet-kv-row premium-breakup-row",
        noDividerBelow && "bike-sheet-kv-row--no-divider-below"
      )}
    >
      <Typography
        variant="body-md"
        color={color}
        weight="medium"
        className="min-w-0 flex-1"
      >
        {left}
      </Typography>
      <Typography
        variant="body-md"
        color={color}
        weight="semibold"
        className="shrink-0 text-right tabular-nums"
      >
        {right}
      </Typography>
    </div>
  );
}

export interface PremiumBreakupDetailsProps {
  /** `"sheet"` — bottom sheet (default). `"review"` — compact rows to match Review `Kv` typography. */
  variant?: "sheet" | "review";
}

export function PremiumBreakupDetails({ variant = "sheet" }: PremiumBreakupDetailsProps) {
  const { plan, addons } = useBikeJourney();

  const selectedAddons = ADDON_BREAKUP_LINES.filter((line) => addons[line.key]);
  const net = footerDisplayAmount({ plan, addons });
  const gst = gstAmount({ plan, addons });
  const total = totalInclGst({ plan, addons });

  const isReview = variant === "review";

  const rootClass = clsx(
    "bike-sheet-body bike-sheet-breakup premium-breakup-details",
    isReview && "review-premium-breakup"
  );

  return (
    <div className={rootClass}>
      <>
        <div className="bike-sheet-bleed-x bike-sheet-breakup-bleed flex flex-col">
          <Row
            variant={variant}
            left="Third-party Premium (5 years)"
            right={formatRupees(THIRD_PARTY_PREMIUM)}
          />
          {plan === "comprehensive" ? (
            <>
              <Row
                variant={variant}
                left="Own Damage premium (1 year)"
                right={formatRupees(OWN_DAMAGE_PREMIUM)}
                noDividerBelow
              />
              <Row
                variant={variant}
                left="BIKE150 coupon"
                right={`- ${formatRupees(PLAN_COUPON_AMOUNT)}`}
                tone="success"
              />
            </>
          ) : null}
          {selectedAddons.length > 0 ? (
            <>
              <div className="premium-breakup-addon-heading">
                {isReview ? (
                  <Typography variant="body-sm" color="primary" weight="semibold">
                    Add-on
                  </Typography>
                ) : (
                  <Typography variant="body-md" color="primary" weight="bold">
                    Add-on
                  </Typography>
                )}
              </div>
              <div className="premium-breakup-addon-list">
                {selectedAddons.map((line) => (
                  <Row
                    key={line.key}
                    variant={variant}
                    left={line.label}
                    right={formatRupees(line.price)}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>

        <div className="bike-sheet-bleed-x premium-breakup-net-gst flex flex-col">
          <Row variant={variant} left="Net premium" right={formatRupees(net)} noDividerBelow />
          <Row variant={variant} left="18% GST" right={formatRupees(gst)} />
        </div>

        <section
          className={clsx(
            "bike-sheet-bleed-x premium-breakup-grand-total",
            isReview && "premium-breakup-grand-total--review"
          )}
          aria-label="Total including GST"
        >
          {isReview ? (
            <div className="flex justify-between gap-[var(--space-4)] items-baseline">
              <div className="min-w-0">
                <Typography variant="body-md" color="primary" weight="semibold" as="span">
                  Total
                </Typography>
                <Typography
                  variant="caption"
                  color="secondary"
                  as="span"
                  className="ml-[var(--space-1)]"
                >
                  (Including GST)
                </Typography>
              </div>
              <Typography
                variant="body-md"
                color="primary"
                weight="semibold"
                className="shrink-0 tabular-nums"
              >
                {formatRupees(total)}
              </Typography>
            </div>
          ) : (
            <div className="flex justify-between gap-[var(--space-4)] items-baseline">
              <div className="min-w-0">
                <Typography
                  variant="heading-sm"
                  color="primary"
                  weight="bold"
                  as="span"
                >
                  Total
                </Typography>
                <Typography
                  variant="caption"
                  color="secondary"
                  as="span"
                  className="ml-[var(--space-1)]"
                >
                  (Including GST)
                </Typography>
              </div>
              <Typography
                variant="heading-sm"
                color="primary"
                weight="bold"
                className="shrink-0 tabular-nums"
              >
                {formatRupees(total)}
              </Typography>
            </div>
          )}
        </section>
      </>
    </div>
  );
}
