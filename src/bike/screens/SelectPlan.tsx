import { useId } from "react";
import { Badge } from "@acko/badge";
import { Button } from "@acko/button";
import { Card } from "@acko/card";
import { Separator } from "@acko/separator";
import { Typography } from "@acko/typography";
import { Bike, Check } from "lucide-react";
import { InfoBanner } from "../../components/bike/InfoBanner";
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
  subtitle,
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
  /** One or two lines of supporting copy, shown below the title (not beside it). */
  subtitle: string;
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
          <Badge variant="solid" color="purple" size="md" textCase="sentence">
            Most popular
          </Badge>
        </div>
      ) : null}
      <span className="acko-radio-label-content plan-radio-card-main w-full min-w-0">
        <Typography variant="heading-sm" color="primary" weight="bold">
          {title}
        </Typography>
        <Typography variant="body-sm" color="secondary" style={{ marginTop: "var(--space-2)" }}>
          {subtitle}
        </Typography>

        <div
          className="flex flex-col"
          style={{ marginTop: "var(--space-4)", gap: "var(--space-3)" }}
        >
          <ul className="list-none p-0 m-0 flex flex-col" style={{ gap: "var(--space-3)" }}>
            {features.map((f) => (
              <li key={f} className="flex gap-2 items-start">
                <Check
                  size={18}
                  style={{
                    color: "var(--color-success-text)",
                    flexShrink: 0,
                    marginTop: "var(--space-1)",
                  }}
                  aria-hidden
                />
                <Typography variant="body-sm" color="primary">
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
            onClick={(e) => e.stopPropagation()}
          >
            More details
          </Button>
        </div>

        <div style={{ marginTop: "var(--space-4)" }}>
          <Separator decorative />
        </div>

        <div
          className="flex flex-wrap items-baseline gap-2"
          style={{ marginTop: "var(--space-4)" }}
        >
          <Typography variant="heading-md" color="primary" weight="bold">
            {price}
          </Typography>
          {strikethrough ? (
            <Typography
              variant="body-sm"
              color="secondary"
              style={{ textDecoration: "line-through" }}
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
    <div
      className="min-h-screen"
      style={{
        paddingLeft: "var(--space-4)",
        paddingRight: "var(--space-4)",
        paddingBottom: "calc(var(--space-28) + env(safe-area-inset-bottom, 0px))",
        background: "var(--color-card-elevated-bg)",
      }}
    >
      <MobileHeader
        title="Select plan"
        onBack={goBack}
        subtitle={
          <Typography variant="body-sm" color="secondary" as="p">
            All plans include 5-year Third-party coverage.{" "}
            <Button type="button" variant="link" size="sm" className="!inline !p-0">
              learn more
            </Button>
          </Typography>
        }
      />

      <div className="flex flex-col" style={{ gap: "var(--space-3)", marginTop: "var(--space-4)" }}>
        <Card variant="outline" padding="md">
          <div className="flex items-center justify-between gap-3">
            <Typography variant="body-md" color="primary" weight="bold">
              {bikeBrandModel || "Your bike"}
            </Typography>
            <Button type="button" variant="link" size="sm" onClick={() => setSheet("findBike")}>
              Edit
            </Button>
          </div>
        </Card>

        <Card variant="outline" padding="md">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <Bike size={20} style={{ color: "var(--color-text-secondary)", flexShrink: 0 }} />
              <div>
                <Typography variant="body-sm" color="secondary">
                  IDV (Insured value)
                </Typography>
                <Typography variant="body-md" color="primary" weight="bold">
                  {formatRupees(idv)}
                </Typography>
              </div>
            </div>
            <Button type="button" variant="link" size="sm" onClick={() => setSheet("idv")}>
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
                subtitle="1-year Own Damage + 5-year Third-party"
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
                subtitle="5-year third party"
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

        <InfoBanner />
      </div>

      <StickyPriceFooter
        amountLabel={formatRupees(amt)}
        gstNote="+ 18% GST"
        onPremiumBreakup={() => setSheet("premium")}
        ctaLabel="Continue"
        onCta={() => goNext()}
      />
    </div>
  );
}
