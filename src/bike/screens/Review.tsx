import { Accordion } from "@acko/accordion";
import { Button } from "@acko/button";
import { Typography } from "@acko/typography";
import { Bike, Shield, User } from "lucide-react";
import { InfoBanner } from "../../components/bike/InfoBanner";
import { MobileHeader } from "../../components/bike/MobileHeader";
import { StickyPriceFooter } from "../../components/bike/StickyPriceFooter";
import {
  TOTAL_INCL_GST,
  useBikeJourney,
} from "../../context/BikeJourneyContext";
import { formatPolicyDate, formatRupees } from "../format";

function Kv({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <Typography variant="body-sm" color="secondary">{label}</Typography>
      <Typography variant="body-md" color="primary" weight="semibold" className="text-right">
        {value}
      </Typography>
    </div>
  );
}

export function Review() {
  const {
    bikeBrandModel,
    registrationYear,
    plan,
    idv,
    fullName,
    email,
    setStep,
    setSheet,
    goNext,
    goBack,
  } = useBikeJourney();

  const policyStart = formatPolicyDate(new Date());
  const planLabel =
    plan === "comprehensive" ? "Bike Bundled Plan" : "Third-party Plan";

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
      <MobileHeader title="Review your details" onBack={goBack} />

      <div style={{ marginTop: "var(--journey-header-content-gap)" }}>
        <Accordion
          type="multiple"
          defaultValue={["bike", "plan", "owner"]}
          items={[
            {
              value: "bike",
              trigger: (
                <div className="flex justify-between items-center gap-2 w-full pr-2">
                  <span className="flex items-start justify-start gap-2 min-w-0">
                    <Bike size={20} style={{ color: "var(--color-text-secondary)" }} />
                    <Typography variant="body-md" color="primary" weight="bold">
                      Bike details
                    </Typography>
                  </span>
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStep(1);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              ),
              content: (
                <div className="flex flex-col" style={{ gap: "var(--space-3)", paddingBottom: "var(--space-2)" }}>
                  <Kv label="Brand & model" value={bikeBrandModel} />
                  <Kv label="Registration year" value={String(registrationYear)} />
                </div>
              ),
            },
            {
              value: "plan",
              trigger: (
                <div className="flex justify-between items-center gap-2 w-full pr-2">
                  <span className="flex items-start justify-start gap-2 min-w-0">
                    <Shield size={20} style={{ color: "var(--color-text-secondary)" }} />
                    <Typography variant="body-md" color="primary" weight="bold">
                      Plan details
                    </Typography>
                  </span>
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStep(3);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              ),
              content: (
                <div className="flex flex-col" style={{ gap: "var(--space-3)", paddingBottom: "var(--space-2)" }}>
                  <Kv label="Selected plan" value={planLabel} />
                  <Kv label="Third Party plan tenure" value="5 year" />
                  <Kv label="Own Damage plan tenure" value={plan === "comprehensive" ? "1 year" : "—"} />
                  <Kv label="Insured value" value={formatRupees(idv)} />
                  <Kv label="Policy start date" value={policyStart} />
                </div>
              ),
            },
            {
              value: "owner",
              trigger: (
                <div className="flex justify-between items-center gap-2 w-full pr-2">
                  <span className="flex items-start justify-start gap-2 min-w-0">
                    <User size={20} style={{ color: "var(--color-text-secondary)" }} />
                    <Typography variant="body-md" color="primary" weight="bold">
                      Bike owner details
                    </Typography>
                  </span>
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStep(6);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              ),
              content: (
                <div className="flex flex-col" style={{ gap: "var(--space-3)", paddingBottom: "var(--space-2)" }}>
                  <Kv label="Full name" value={fullName} />
                  <Kv label="Email" value={email} />
                </div>
              ),
            },
          ]}
        />
      </div>

      <div style={{ marginTop: "var(--space-4)" }}>
        <InfoBanner />
      </div>

      <StickyPriceFooter
        amountLabel={formatRupees(TOTAL_INCL_GST)}
        gstNote="(Incl. GST)"
        inclusiveGst
        onPremiumBreakup={() => setSheet("premium")}
        ctaLabel="Pay now"
        onCta={() => goNext()}
      />
    </div>
  );
}
