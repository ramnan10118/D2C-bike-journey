import { Typography } from "@acko/typography";
import { MobileHeader } from "../../components/bike/MobileHeader";
import { StickyPriceFooter } from "../../components/bike/StickyPriceFooter";
import {
  TOTAL_INCL_GST,
  useBikeJourney,
} from "../../context/BikeJourneyContext";
import { formatRupees } from "../format";

export function Pay() {
  const { setSheet, goBack } = useBikeJourney();

  return (
    <div
      className="min-h-screen"
      style={{
        paddingLeft: "var(--space-4)",
        paddingRight: "var(--space-4)",
        paddingBottom: "calc(var(--space-28) + env(safe-area-inset-bottom, 0px))",
        background: "var(--color-card-elevated-bg)",
      }}
    >
      <MobileHeader title="Pay" onBack={goBack} />

      <div style={{ marginTop: "var(--space-6)" }}>
        <Typography variant="body-md" color="primary">
          You&apos;re all set. Complete payment to issue your policy.
        </Typography>
      </div>

      <StickyPriceFooter
        amountLabel={formatRupees(TOTAL_INCL_GST)}
        gstNote="(Incl. GST)"
        inclusiveGst
        onPremiumBreakup={() => setSheet("premium")}
        ctaLabel="Pay now"
        onCta={() => {}}
      />
    </div>
  );
}
