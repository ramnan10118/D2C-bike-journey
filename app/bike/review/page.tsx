"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Accordion } from "@acko/accordion";
import type { AccordionItem } from "@acko/accordion";
import { Button } from "@acko/button";
import { Typography } from "@acko/typography";
import { Bike, IndianRupee, Shield, User } from "lucide-react";
import { PremiumBreakupDetails } from "@/components/bike/PremiumBreakupDetails";
import { MobileHeader } from "@/components/bike/MobileHeader";
import { StickyPriceFooter } from "@/components/bike/StickyPriceFooter";
import { totalInclGst, useBikeJourney } from "@/context/BikeJourneyContext";
import { formatPolicyDate, formatRupees } from "@/lib/format";

function Kv({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-[var(--space-4)]">
      <Typography variant="body-sm" color="secondary">
        {label}
      </Typography>
      <Typography variant="body-md" color="primary" weight="semibold" className="text-right">
        {value}
      </Typography>
    </div>
  );
}

export default function ReviewPage() {
  const router = useRouter();
  const {
    bikeBrandModel,
    registrationYear,
    plan,
    idv,
    fullName,
    email,
    addons,
    setSheet,
  } = useBikeJourney();

  const policyStart = formatPolicyDate(new Date());
  const planLabel =
    plan === "comprehensive" ? "Bike Bundled Plan" : "Third-party Plan";

  const reviewAccordionItems = useMemo((): AccordionItem[] => {
    const totalLabel = formatRupees(totalInclGst({ plan, addons }));
    return [
      {
        value: "bike",
        trigger: (
          <div className="review-accordion-trigger-main flex min-w-0 flex-1 items-start gap-[var(--space-2)]">
            <Bike
              size={20}
              className="review-accordion-trigger-icon shrink-0"
              style={{ color: "var(--color-text-secondary)" }}
            />
            <div className="min-w-0 flex-1">
              <Typography variant="body-md" color="primary" weight="semibold">
                Bike details
              </Typography>
              <Typography
                variant="body-sm"
                color="secondary"
                className="review-accordion-summary mt-0.5 block"
              >
                {bikeBrandModel}
              </Typography>
            </div>
          </div>
        ),
        content: (
          <div className="review-accordion-panel">
            <div className="flex flex-col gap-[var(--space-3)]">
              <Kv label="Brand & model" value={bikeBrandModel} />
              <Kv label="Registration year" value={String(registrationYear)} />
            </div>
            <div className="review-accordion-edit">
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={() => router.push("/bike/details")}
              >
                Edit details
              </Button>
            </div>
          </div>
        ),
      },
      {
        value: "owner",
        trigger: (
          <div className="review-accordion-trigger-main flex min-w-0 flex-1 items-start gap-[var(--space-2)]">
            <User
              size={20}
              className="review-accordion-trigger-icon shrink-0"
              style={{ color: "var(--color-text-secondary)" }}
            />
            <div className="min-w-0 flex-1">
              <Typography variant="body-md" color="primary" weight="semibold">
                Bike owner details
              </Typography>
              <Typography
                variant="body-sm"
                color="secondary"
                className="review-accordion-summary mt-0.5 block"
              >
                {fullName}
              </Typography>
            </div>
          </div>
        ),
        content: (
          <div className="review-accordion-panel">
            <div className="flex flex-col gap-[var(--space-3)]">
              <Kv label="Full name" value={fullName} />
              <Kv label="Email" value={email} />
            </div>
            <div className="review-accordion-edit">
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={() => router.push("/bike/more-details")}
              >
                Edit details
              </Button>
            </div>
          </div>
        ),
      },
      {
        value: "plan",
        trigger: (
          <div className="review-accordion-trigger-main flex min-w-0 flex-1 items-start gap-[var(--space-2)]">
            <Shield
              size={20}
              className="review-accordion-trigger-icon shrink-0"
              style={{ color: "var(--color-text-secondary)" }}
            />
            <div className="min-w-0 flex-1">
              <Typography variant="body-md" color="primary" weight="semibold">
                Plan details
              </Typography>
              <Typography
                variant="body-sm"
                color="secondary"
                className="review-accordion-summary mt-0.5 block"
              >
                {planLabel}
              </Typography>
            </div>
          </div>
        ),
        content: (
          <div className="review-accordion-panel">
            <div className="flex flex-col gap-[var(--space-3)]">
              <Kv label="Selected plan" value={planLabel} />
              <Kv label="Third Party plan tenure" value="5 year" />
              <Kv
                label="Own Damage plan tenure"
                value={plan === "comprehensive" ? "1 year" : "—"}
              />
              <Kv label="Insured value" value={formatRupees(idv)} />
              <Kv label="Policy start date" value={policyStart} />
            </div>
            <div className="review-accordion-edit">
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={() => router.push("/bike/plan")}
              >
                Edit details
              </Button>
            </div>
          </div>
        ),
      },
      {
        value: "premium",
        trigger: (
          <div className="review-accordion-trigger-main flex min-w-0 flex-1 items-start gap-[var(--space-2)]">
            <IndianRupee
              size={20}
              className="review-accordion-trigger-icon shrink-0"
              style={{ color: "var(--color-text-secondary)" }}
            />
            <div className="min-w-0 flex-1">
              <Typography variant="body-md" color="primary" weight="semibold">
                Premium breakup
              </Typography>
              <Typography
                variant="body-sm"
                color="secondary"
                className="review-accordion-summary mt-0.5 block"
              >
                {totalLabel} incl. GST
              </Typography>
            </div>
          </div>
        ),
        content: <PremiumBreakupDetails variant="review" />,
      },
    ];
  }, [
    addons,
    bikeBrandModel,
    email,
    fullName,
    idv,
    plan,
    planLabel,
    policyStart,
    registrationYear,
    router,
  ]);

  return (
    <div className="min-h-screen px-[var(--journey-inline-padding)] pb-[calc(var(--journey-sticky-footer-clearance)+env(safe-area-inset-bottom,0px))] bg-[var(--color-card-elevated-bg)]">
      <MobileHeader
        title="Review your details"
        onBack={() => router.push("/bike/more-details")}
      />

      <div className="flex flex-col w-full mt-[var(--journey-header-content-gap)] gap-[var(--space-3)]">
        <Accordion
          className="review-accordion"
          type="single"
          defaultValue="plan"
          items={reviewAccordionItems}
        />
      </div>

      <StickyPriceFooter
        amountLabel={formatRupees(totalInclGst({ plan, addons }))}
        gstNote="(Incl. GST)"
        inclusiveGst
        onPremiumBreakup={() => setSheet("premium")}
        ctaLabel="Pay now"
        onCta={() => router.push("/bike/pay")}
      />
    </div>
  );
}
