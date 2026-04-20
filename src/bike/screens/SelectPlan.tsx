import { useId } from "react";
import { Badge } from "@acko/badge";
import { Button } from "@acko/button";
import { Card } from "@acko/card";
import { Separator } from "@acko/separator";
import { Typography } from "@acko/typography";
import { Check } from "lucide-react";
import { MobileHeader } from "../../components/bike/MobileHeader";
import { StickyPriceFooter } from "../../components/bike/StickyPriceFooter";
import { footerDisplayAmount, useBikeJourney, type PlanId } from "../../context/BikeJourneyContext";
import { formatRupees } from "../format";

function PlanRadioCard({
  groupName,
  value,
  plan,
  setPlan,
  showHighlightBadge,
  title,
  tenurePointers,
  features,
  price,
  strikethrough,
}: {
  groupName: string;
  value: PlanId;
  plan: PlanId;
  setPlan: (p: PlanId) => void;
  /** “Most popular” pill above the title (inside the card). */
  showHighlightBadge?: boolean;
  title: string;
  /** Short tenure lines below the title (same checkmark style as features). */
  tenurePointers: string[];
  features: string[];
  price: string;
  strikethrough?: string;
}) {
  const inputId = useId();
  const selected = plan === value;

  return (
    <label
      htmlFor={inputId}
      className={`plan-radio-card plan-radio-card--plan-grid acko-radio-card-item acko-radio-md w-full min-w-0 ${
        showHighlightBadge ? "plan-radio-card--has-badge" : ""
      } ${selected ? "acko-radio-item-selected" : ""}`}
    >
      <input
        id={inputId}
        type="radio"
        name={groupName}
        className="acko-radio-native"
        value={value}
        checked={selected}
        onChange={() => setPlan(value)}
      />
      <span className="acko-radio-circle plan-radio-card-radio" aria-hidden="true">
        {selected ? <span className="acko-radio-dot" /> : null}
      </span>
      {showHighlightBadge ? (
        <div className="plan-radio-card-badge-slot">
          <span className="plan-radio-card-most-popular-shimmer">
            <Badge
              variant="solid"
              color="purple"
              size="md"
              textCase="sentence"
              className="plan-radio-card-most-popular-badge"
            >
              Most popular
            </Badge>
          </span>
        </div>
      ) : null}
      <div className="plan-radio-card-title min-w-0">
        <Typography
          variant="heading-sm"
          color={selected ? "brand" : "primary"}
          weight="bold"
          style={{
            fontSize: "var(--font-heading-sm-size)",
            lineHeight: "var(--font-heading-sm-line)",
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
      </div>
      <span className="acko-radio-label-content plan-radio-card-main w-full min-w-0">
        <div className="flex flex-col" style={{ gap: "var(--space-1)" }}>
          <ul className="plan-radio-card-pointer-list">
            {tenurePointers.map((line) => (
              <li key={`t-${line}`} className="plan-radio-card-pointer-item">
                <Check className="plan-radio-card-pointer-icon" size={18} strokeWidth={2} aria-hidden />
                <Typography variant="body-sm" color="primary" weight="medium" style={{ margin: 0 }}>
                  {line}
                </Typography>
              </li>
            ))}
            {features.map((f) => (
              <li key={`f-${f}`} className="plan-radio-card-pointer-item">
                <Check className="plan-radio-card-pointer-icon" size={18} strokeWidth={2} aria-hidden />
                <Typography variant="body-sm" color="primary" weight="medium" style={{ margin: 0 }}>
                  {f}
                </Typography>
              </li>
            ))}
          </ul>
          <Button
            type="button"
            variant="link"
            size="sm"
            className="!px-0 !justify-start self-start"
            style={{ marginTop: "var(--space-1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            More details
          </Button>
        </div>

        <div style={{ marginTop: "calc(var(--space-4) - var(--space-1))" }}>
          <Separator decorative />
        </div>

        <div
          className="flex flex-nowrap justify-start items-center gap-2"
          style={{ marginTop: "var(--space-4)" }}
        >
          <Typography
            variant="heading-md"
            color="primary"
            weight="bold"
            style={{ fontSize: "var(--font-heading-md-size)", lineHeight: "var(--font-heading-md-line)" }}
          >
            {price}
          </Typography>
          {strikethrough ? (
            <Typography
              variant="body-md"
              color="secondary"
              style={{
                textDecoration: "line-through",
                fontSize: "var(--font-body-md-size)",
                lineHeight: "var(--font-body-md-line)",
              }}
            >
              {strikethrough}
            </Typography>
          ) : null}
        </div>
      </span>
    </label>
  );
}

export function SelectPlan() {
  const planGroupName = useId();
  const {
    bikeBrandModel,
    plan,
    setPlan,
    idv,
    addons,
    setSheet,
    goNext,
    goBack,
  } = useBikeJourney();

  const amt = footerDisplayAmount({ plan, addons });

  return (
    <>
      <div
        className="min-h-screen"
        style={{
          paddingLeft: "var(--journey-inline-padding)",
          paddingRight: "var(--journey-inline-padding)",
          paddingBottom: "calc(var(--journey-sticky-footer-clearance) + env(safe-area-inset-bottom, 0px))",
          background: "var(--color-card-elevated-bg)",
        }}
      >
      <MobileHeader
        title="Select plan"
        onBack={goBack}
        subtitle={`All plans include 5-year Third-party\u00A0coverage. Learn more`}
        onLearnMore={() => {}}
      />

      {/* Gap below header: --journey-header-content-gap in index.css */}
      <div
        className="flex flex-col w-full items-stretch"
        style={{ gap: "var(--space-3)", marginTop: "var(--journey-header-content-gap)" }}
      >
        <Card
          variant="outline"
          padding="none"
          style={{
            paddingLeft: "var(--space-5)",
            paddingRight: "var(--space-5)",
            paddingTop: "var(--space-4)",
            paddingBottom: "var(--space-4)",
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col items-start min-w-0">
              <Typography
                variant="body-sm"
                color="secondary"
                weight="medium"
                style={{
                  margin: 0,
                  fontSize: "var(--font-body-sm-size)",
                  lineHeight: "var(--font-body-sm-line)",
                }}
              >
                Bike details
              </Typography>
              <Typography
                variant="body-md"
                color="primary"
                style={{
                  marginTop: "var(--space-1)",
                  fontSize: "var(--font-body-md-size)",
                  lineHeight: "var(--font-body-md-line)",
                  fontWeight: 800,
                }}
              >
                {bikeBrandModel || "Your bike"}
              </Typography>
            </div>
            <Button type="button" variant="link" size="sm" className="shrink-0" onClick={() => setSheet("findBike")}>
              Edit
            </Button>
          </div>
        </Card>

        <Card
          variant="outline"
          padding="none"
          style={{
            paddingLeft: "var(--space-5)",
            paddingRight: "var(--space-5)",
            paddingTop: "var(--space-4)",
            paddingBottom: "var(--space-4)",
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col items-start min-w-0">
              <Typography
                variant="body-sm"
                color="secondary"
                weight="medium"
                style={{
                  margin: 0,
                  fontSize: "var(--font-body-sm-size)",
                  lineHeight: "var(--font-body-sm-line)",
                }}
              >
                IDV (Insured value)
              </Typography>
              <Typography
                variant="body-md"
                color="primary"
                style={{
                  marginTop: "var(--space-1)",
                  fontSize: "var(--font-body-md-size)",
                  lineHeight: "var(--font-body-md-line)",
                  fontWeight: 800,
                }}
              >
                {formatRupees(idv)}
              </Typography>
            </div>
            <Button type="button" variant="link" size="sm" className="shrink-0" onClick={() => setSheet("idv")}>
              Edit
            </Button>
          </div>
        </Card>

        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          <div
            className="acko-radio-group acko-radio-md"
            role="radiogroup"
            aria-labelledby={`${planGroupName}-plan-label`}
          >
            <span id={`${planGroupName}-plan-label`} className="sr-only">
              Insurance plan
            </span>
            <div className="acko-radio-options acko-radio-vertical flex flex-col" style={{ gap: "var(--space-4)" }}>
              <PlanRadioCard
                groupName={planGroupName}
                value="comprehensive"
                plan={plan}
                setPlan={setPlan}
                showHighlightBadge
                title="Comprehensive Plan"
                tenurePointers={["1-year Own Damage", "5-year Third-party"]}
                features={[
                  "Covers damage to your bike",
                  "Covers damage caused by your bike to others and their property",
                ]}
                price={formatRupees(3874)}
                strikethrough={formatRupees(4024)}
              />
              <PlanRadioCard
                groupName={planGroupName}
                value="thirdparty"
                plan={plan}
                setPlan={setPlan}
                title="Third-party Plan"
                tenurePointers={["Third-party liability", "5-year coverage"]}
                features={[
                  "Covers damage caused by your bike to others and their property",
                  "Does not cover damage to your bike",
                ]}
                price={formatRupees(3851)}
              />
            </div>
          </div>
        </div>

        <Card
          variant="demoted"
          padding="md"
          style={{ background: "var(--color-warning-subtle)" }}
        >
          <Typography variant="body-sm" color="primary">
            7 out of 10 customers choose Comprehensive Plan over Third-party plan{" "}
            <Button type="button" variant="link" size="sm" className="!inline !p-0">
              See why
            </Button>
          </Typography>
        </Card>
      </div>
      </div>

      <StickyPriceFooter
        amountLabel={formatRupees(amt)}
        gstNote="+ 18% GST"
        onPremiumBreakup={() => setSheet("premium")}
        ctaLabel="Continue"
        onCta={() => goNext()}
      />
    </>
  );
}
