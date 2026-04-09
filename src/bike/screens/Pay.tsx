import { Typography } from "@acko/typography";
import { MobileHeader } from "../../components/bike/MobileHeader";
import { StickyPriceFooter } from "../../components/bike/StickyPriceFooter";
import {
  totalInclGst,
  useBikeJourney,
} from "../../context/BikeJourneyContext";
import { formatRupees } from "../format";

export function Pay() {
  const { setSheet, goBack, plan, addons } = useBikeJourney();

  return (
    <div
      className="min-h-screen"
      style={{
        paddingLeft: "var(--journey-inline-padding)",
        paddingRight: "var(--journey-inline-padding)",
        paddingBottom: "calc(var(--journey-sticky-footer-clearance) + env(safe-area-inset-bottom, 0px))",
        background: "var(--color-card-elevated-bg)",
      }}
    >
      <MobileHeader title="Pay" onBack={goBack} />

      <div style={{ marginTop: "var(--journey-header-content-gap)" }}>
        <Typography variant="body-md" color="primary">
          You&apos;re all set. Complete payment to issue your policy.
        </Typography>
      </div>

      <StickyPriceFooter
        amountLabel={formatRupees(totalInclGst({ plan, addons }))}
        gstNote="(Incl. GST)"
        inclusiveGst
        onPremiumBreakup={() => setSheet("premium")}
        ctaLabel="Pay now"
        onCta={() => {}}
      />
    </div>
  );
}
