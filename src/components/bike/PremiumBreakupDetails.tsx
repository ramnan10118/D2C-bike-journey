import { Typography } from "@acko/typography";
import { clsx } from "clsx";
import { ADDON_BREAKUP_LINES } from "../../bike/addonBreakup";
import { formatRupees } from "../../bike/format";
import {
  footerDisplayAmount,
  gstAmount,
  OWN_DAMAGE_PREMIUM,
  PLAN_COUPON_AMOUNT,
  THIRD_PARTY_PREMIUM,
  totalInclGst,
  useBikeJourney,
} from "../../context/BikeJourneyContext";

function Row({
  left,
  right,
  tone = "primary",
  noDividerBelow = false,
}: {
  left: string;
  right: string;
  tone?: "primary" | "brand" | "success";
  noDividerBelow?: boolean;
}) {
  const color =
    tone === "brand" ? "brand" : tone === "success" ? "success" : "primary";
  return (
    <div
      className={clsx("bike-sheet-kv-row premium-breakup-row", noDividerBelow && "bike-sheet-kv-row--no-divider-below")}
    >
      <Typography variant="body-md" color={color} weight="medium" className="min-w-0 flex-1">
        {left}
      </Typography>
      <Typography variant="body-md" color={color} weight="semibold" className="shrink-0 text-right tabular-nums">
        {right}
      </Typography>
    </div>
  );
}

export function PremiumBreakupDetails() {
  const { plan, addons } = useBikeJourney();

  const selectedAddons = ADDON_BREAKUP_LINES.filter((line) => addons[line.key]);
  const net = footerDisplayAmount({ plan, addons });
  const gst = gstAmount({ plan, addons });
  const total = totalInclGst({ plan, addons });

  return (
    <div className="bike-sheet-body bike-sheet-breakup premium-breakup-details">
      <>
        <div className="bike-sheet-bleed-x bike-sheet-breakup-bleed flex flex-col">
          <Row left="Third-party Premium (5 years)" right={formatRupees(THIRD_PARTY_PREMIUM)} />
          {plan === "comprehensive" ? (
            <>
              <Row left="Own Damage premium (1 year)" right={formatRupees(OWN_DAMAGE_PREMIUM)} noDividerBelow />
              <Row left="BIKE150 coupon" right={`- ${formatRupees(PLAN_COUPON_AMOUNT)}`} tone="success" />
            </>
          ) : null}
          {selectedAddons.length > 0 ? (
            <>
              <div className="premium-breakup-addon-heading">
                <Typography variant="body-md" color="primary" weight="bold">
                  Add-on
                </Typography>
              </div>
              <div className="premium-breakup-addon-list">
                {selectedAddons.map((line) => (
                  <Row key={line.key} left={line.label} right={formatRupees(line.price)} />
                ))}
              </div>
            </>
          ) : null}
        </div>

        <div className="bike-sheet-bleed-x premium-breakup-net-gst flex flex-col">
          <Row left="Net premium" right={formatRupees(net)} noDividerBelow />
          <Row left="18% GST" right={formatRupees(gst)} />
        </div>

        <section className="bike-sheet-bleed-x premium-breakup-grand-total" aria-label="Total including GST">
          <div className="flex justify-between gap-4 items-baseline">
            <div className="min-w-0">
              <Typography variant="heading-sm" color="primary" weight="bold" as="span">
                Total
              </Typography>
              <Typography variant="caption" color="secondary" as="span" style={{ marginLeft: "var(--space-1)" }}>
                (Including GST)
              </Typography>
            </div>
            <Typography variant="heading-sm" color="primary" weight="bold" className="shrink-0 tabular-nums">
              {formatRupees(total)}
            </Typography>
          </div>
        </section>
      </>
    </div>
  );
}
