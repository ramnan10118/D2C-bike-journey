"use client";

import { useRouter } from "next/navigation";
import { Typography } from "@acko/typography";
import { MobileHeader } from "@/components/bike/MobileHeader";
import { StickyPriceFooter } from "@/components/bike/StickyPriceFooter";
import { totalInclGst, useBikeJourney } from "@/context/BikeJourneyContext";
import { formatRupees } from "@/lib/format";

export default function PayPage() {
  const router = useRouter();
  const { setSheet, plan, addons } = useBikeJourney();

  return (
    <div className="min-h-screen px-[var(--journey-inline-padding)] pb-[calc(var(--journey-sticky-footer-clearance)+env(safe-area-inset-bottom,0px))] bg-[var(--color-card-elevated-bg)]">
      <MobileHeader title="Pay" onBack={() => router.push("/bike/review")} />

      <div className="mt-[var(--journey-header-content-gap)]">
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
