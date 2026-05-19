"use client";

import { useState, useMemo } from "react";
import { Bike, IndianRupee, Shield, User, Check } from "lucide-react";
import { Typography } from "@acko/typography";
import { Button } from "@acko/button";
import { Accordion } from "@acko/accordion";
import type { AccordionItem } from "@acko/accordion";
import { Card } from "@acko/card";
import { Separator } from "@acko/separator";

import { BottomSheet } from "@/components/bike/BottomSheet";
import { MobileHeader } from "@/components/bike/MobileHeader";
import { PlanDetailsSheetContent } from "@/components/bike/PlanDetailsSheet";
import { PremiumBreakupDetails } from "@/components/bike/PremiumBreakupDetails";
import { BikeJourneyProvider } from "@/context/BikeJourneyContext";
import { formatRupees } from "@/lib/format";

/* ─── Shared layout helpers ────────────────────────────────────── */

function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`mx-auto w-full max-w-[390px] rounded-[28px] border border-[var(--color-border-subtle)] bg-[var(--color-card-elevated-bg)] overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

function VariantLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="label-sm"
      color="secondary"
      weight="semibold"
      as="p"
      className="mb-2 uppercase tracking-widest"
    >
      {children}
    </Typography>
  );
}

function ShowcaseSection({
  id,
  name,
  pkg,
  description,
  children,
}: {
  id: string;
  name: string;
  pkg: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16 flex flex-col gap-5">
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <Typography variant="heading-md" color="primary" weight="bold" as="h2">
            {name}
          </Typography>
          <code className="text-xs font-mono bg-[var(--color-primary-subtle)] text-[var(--color-brand)] px-2 py-1 rounded-md">
            {pkg}
          </code>
        </div>
        <Typography variant="body-sm" color="secondary">
          {description}
        </Typography>
      </div>
      {children}
      <Separator decorative className="mt-4" />
    </section>
  );
}

/* ─── 1. BottomSheet ───────────────────────────────────────────── */

function BottomSheetSection() {
  const [active, setActive] = useState<"basic" | "footer" | "coverage" | null>(null);

  return (
    <ShowcaseSection
      id="bottom-sheet"
      name="BottomSheet"
      pkg="@acko/bottom-sheet"
      description="Mobile bottom sheet with drag-to-dismiss, pointer-captured drag handle, backdrop fade, and optional sticky footer slot."
    >
      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="ghost" size="md" onClick={() => setActive("basic")}>
          Open basic sheet
        </Button>
        <Button type="button" variant="ghost" size="md" onClick={() => setActive("footer")}>
          With footer CTA
        </Button>
        <Button type="button" variant="ghost" size="md" onClick={() => setActive("coverage")}>
          With coverage content
        </Button>
      </div>

      <BottomSheet
        open={active === "basic"}
        title="Basic bottom sheet"
        onClose={() => setActive(null)}
      >
        <div className="flex flex-col gap-4 py-2">
          <Typography variant="body-md" color="primary">
            Drag down or tap the backdrop to close. Works on touch and pointer devices.
          </Typography>
          <Typography variant="body-sm" color="secondary">
            Accepts any ReactNode as children — fully content-agnostic.
          </Typography>
        </div>
      </BottomSheet>

      <BottomSheet
        open={active === "footer"}
        title="Sheet with footer"
        onClose={() => setActive(null)}
        footer={
          <Button type="button" variant="primary" size="lg" fullWidth onClick={() => setActive(null)}>
            Confirm
          </Button>
        }
      >
        <div className="flex flex-col gap-4 py-2">
          <Typography variant="body-md" color="primary">
            The content area scrolls independently. The footer CTA is pinned to the bottom and
            never scrolls away.
          </Typography>
        </div>
      </BottomSheet>

      <BottomSheet
        open={active === "coverage"}
        title="Comprehensive plan"
        onClose={() => setActive(null)}
        footer={
          <Button type="button" variant="primary" size="lg" fullWidth onClick={() => setActive(null)}>
            OK
          </Button>
        }
      >
        <PlanDetailsSheetContent planId="comprehensive" />
      </BottomSheet>
    </ShowcaseSection>
  );
}

/* ─── 2. MobileHeader ──────────────────────────────────────────── */

function MobileHeaderSection() {
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);

  return (
    <ShowcaseSection
      id="mobile-header"
      name="MobileHeader"
      pkg="@acko/page-header"
      description='Journey page header: back chevron, h1 title, optional subtitle with an inline "Learn more" link that fires a callback or follows an href.'
    >
      {/* Title is clipped — font size TBD. Only the nav bar is shown. */}
      <div className="flex flex-col gap-6">
        <div>
          <VariantLabel>No back button</VariantLabel>
          <PhoneFrame>
            <div className="px-[var(--space-5)] overflow-hidden" style={{ height: "65px" }}>
              <MobileHeader title="Enter your bike details" />
            </div>
          </PhoneFrame>
        </div>

        <div>
          <VariantLabel>With back button</VariantLabel>
          <PhoneFrame>
            <div className="px-[var(--space-5)] overflow-hidden" style={{ height: "65px" }}>
              <MobileHeader title="Select add-ons" onBack={() => {}} />
            </div>
          </PhoneFrame>
        </div>

        <div>
          <VariantLabel>With subtitle + learn more link</VariantLabel>
          <PhoneFrame>
            <div className="px-[var(--space-5)] overflow-hidden" style={{ height: "65px" }}>
              <MobileHeader
                title="Select plan"
                onBack={() => {}}
                subtitle="All plans include 5-year Third-party coverage. Learn more"
                onLearnMore={() => setLearnMoreOpen(true)}
              />
            </div>
          </PhoneFrame>
        </div>
      </div>

      <BottomSheet
        open={learnMoreOpen}
        title="Why 5-year Third-party coverage?"
        onClose={() => setLearnMoreOpen(false)}
        footer={
          <Button type="button" variant="primary" size="lg" fullWidth onClick={() => setLearnMoreOpen(false)}>
            Got it
          </Button>
        }
      >
        <Typography variant="body-md" color="primary">
          Effective September 2018, IRDAI mandates a 5-year Third-party plan for all new bikes.
        </Typography>
      </BottomSheet>
    </ShowcaseSection>
  );
}

/* ─── 3. StickyPriceFooter ─────────────────────────────────────── */

function StickyPriceFooterSection() {
  const [inclusiveGst, setInclusiveGst] = useState(false);
  const [breakupOpen, setBreakupOpen] = useState(false);
  const amount = formatRupees(inclusiveGst ? 4571 : 3874);
  const gstNote = inclusiveGst ? "(Incl. GST)" : "+ 18% GST";

  return (
    <ShowcaseSection
      id="sticky-footer"
      name="StickyPriceFooter"
      pkg="@acko/sticky-footer"
      description="Liquid-glass fixed pill footer: price amount, GST note, premium breakup link, CTA. Supports exclusive (+18% GST) and inclusive (Incl. GST) display modes."
    >
      <div className="flex gap-3 flex-wrap">
        <Button
          type="button"
          variant={!inclusiveGst ? "primary" : "ghost"}
          size="sm"
          onClick={() => setInclusiveGst(false)}
        >
          + 18% GST
        </Button>
        <Button
          type="button"
          variant={inclusiveGst ? "primary" : "ghost"}
          size="sm"
          onClick={() => setInclusiveGst(true)}
        >
          Incl. GST
        </Button>
      </div>

      {/* Non-fixed preview — glass pill floats over simulated page content */}
      <PhoneFrame>
        <div className="relative">
          {/* Simulated page content — gives the backdrop-filter something to blur */}
          <div className="bg-[var(--color-card-elevated-bg)] px-5 pt-4 pb-32 flex flex-col gap-0">
            <Typography variant="label-sm" color="secondary" weight="semibold" className="mb-3 uppercase tracking-widest">
              Selected plan
            </Typography>
            {[
              { label: "Comprehensive Plan (1yr OD + 5yr TP)", value: "₹3,874" },
              { label: "Zero Depreciation Cover", value: "₹36" },
              { label: "Personal Accident Cover", value: "₹350" },
              { label: "Roadside Assistance", value: "₹150" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center py-3 border-b border-[var(--color-border-subtle)]"
              >
                <Typography variant="body-sm" color="secondary">{label}</Typography>
                <Typography variant="body-sm" color="primary" weight="semibold">{value}</Typography>
              </div>
            ))}
          </div>

          {/* Glass pill — absolute over the content */}
          <div className="absolute bottom-0 left-0 right-0 px-[var(--journey-inline-padding)] pb-4">
            <div className="bike-sticky-price-footer-glass w-full pointer-events-auto min-w-0 px-[var(--space-5)] py-[var(--space-5)]">
            <div className="flex min-w-0 items-center justify-between gap-[var(--space-3)]">
              <div className="min-w-0 flex flex-col gap-[var(--space-1)]">
                <div className="flex flex-wrap items-baseline gap-[var(--space-2)]">
                  <Typography
                    variant="heading-lg"
                    color="primary"
                    weight="bold"
                    as="span"
                    style={{
                      fontSize: "var(--journey-sticky-footer-amount-size)",
                      lineHeight: "var(--journey-sticky-footer-amount-line)",
                    }}
                  >
                    {amount}
                  </Typography>
                  <Typography
                    variant={inclusiveGst ? "caption" : "body-sm"}
                    color="secondary"
                    as="span"
                  >
                    {gstNote}
                  </Typography>
                </div>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="!px-0 !justify-start !mt-0 !min-h-0 self-start"
                  style={{ minHeight: "var(--space-5)", height: "var(--space-5)" }}
                  onClick={() => setBreakupOpen(true)}
                >
                  Premium breakup
                </Button>
              </div>
              <Button
                type="button"
                variant="primary"
                size="md"
                className="shrink-0"
                style={{ paddingLeft: "var(--space-8)", paddingRight: "var(--space-8)" }}
              >
                Continue
              </Button>
            </div>
          </div>
          </div>{/* end glass pill */}
        </div>{/* end relative */}
      </PhoneFrame>

      <BottomSheet
        open={breakupOpen}
        title="Premium breakup"
        onClose={() => setBreakupOpen(false)}
        footer={
          <Button type="button" variant="primary" size="lg" fullWidth onClick={() => setBreakupOpen(false)}>
            OK
          </Button>
        }
      >
        <PremiumBreakupDetails />
      </BottomSheet>
    </ShowcaseSection>
  );
}

/* ─── 4. FeatureList ───────────────────────────────────────────── */

const DEMO_FEATURES = [
  "Covers damage to your bike in an accident",
  "Covers theft, fire, and natural calamities",
  "Third-party liability for injury and property",
  "5-year Third-party coverage included",
];

function FeatureListSection() {
  return (
    <ShowcaseSection
      id="feature-list"
      name="FeatureList"
      pkg="@acko/feature-list"
      description="Bulleted check-icon list for plan features, add-on benefits, and coverage summaries. Used on plan cards and add-on cards across all product journeys."
    >
      <PhoneFrame className="p-5">
        <ul className="plan-radio-card-pointer-list">
          {DEMO_FEATURES.map((feature) => (
            <li key={feature} className="plan-radio-card-pointer-item">
              <Check
                className="plan-radio-card-pointer-icon"
                size={18}
                strokeWidth={2}
                aria-hidden
              />
              <Typography variant="body-sm" color="primary" weight="medium" className="m-0">
                {feature}
              </Typography>
            </li>
          ))}
        </ul>
      </PhoneFrame>
    </ShowcaseSection>
  );
}

/* ─── 5. InfoCard ──────────────────────────────────────────────── */

function InfoCardSection() {
  return (
    <ShowcaseSection
      id="info-card"
      name="InfoCard"
      pkg="@acko/info-card"
      description="Label + bold value + optional Edit link. Used on plan selection and review screens to display editable summary rows."
    >
      <PhoneFrame className="p-5">
        <div className="flex flex-col gap-3">
          <Card variant="outline" padding="none">
            <div className="flex items-start justify-between gap-[var(--space-3)] px-[var(--space-5)] py-[var(--space-4)]">
              <div className="flex flex-col items-start min-w-0">
                <Typography
                  variant="body-sm"
                  color="secondary"
                  weight="medium"
                  className="m-0"
                >
                  Bike details
                </Typography>
                <Typography
                  variant="body-md"
                  color="primary"
                  style={{ marginTop: "var(--space-1)", fontWeight: 800 }}
                >
                  Honda Activa 110CC
                </Typography>
              </div>
              <Button type="button" variant="link" size="sm" className="shrink-0">
                Edit
              </Button>
            </div>
          </Card>

          <Card variant="outline" padding="none">
            <div className="flex items-start justify-between gap-[var(--space-3)] px-[var(--space-5)] py-[var(--space-4)]">
              <div className="flex flex-col items-start min-w-0">
                <Typography
                  variant="body-sm"
                  color="secondary"
                  weight="medium"
                  className="m-0"
                >
                  IDV (Insured value)
                </Typography>
                <Typography
                  variant="body-md"
                  color="primary"
                  style={{ marginTop: "var(--space-1)", fontWeight: 800 }}
                >
                  {formatRupees(13632)}
                </Typography>
              </div>
              <Button type="button" variant="link" size="sm" className="shrink-0">
                Edit
              </Button>
            </div>
          </Card>
        </div>
      </PhoneFrame>
    </ShowcaseSection>
  );
}

/* ─── 6. CoverageDetails ───────────────────────────────────────── */

function CoverageDetailsSection() {
  const [planId, setPlanId] = useState<"comprehensive" | "thirdparty">("comprehensive");

  return (
    <ShowcaseSection
      id="coverage-details"
      name="CoverageDetails"
      pkg="@acko/coverage-details"
      description={`Full covered / not-covered sheet content: intro → "What's covered" section → "What's not covered" section. Layout and headings are fixed; data is passed as props.`}
    >
      <div className="flex gap-3">
        <Button
          type="button"
          variant={planId === "comprehensive" ? "primary" : "ghost"}
          size="sm"
          onClick={() => setPlanId("comprehensive")}
        >
          Comprehensive
        </Button>
        <Button
          type="button"
          variant={planId === "thirdparty" ? "primary" : "ghost"}
          size="sm"
          onClick={() => setPlanId("thirdparty")}
        >
          Third-party
        </Button>
      </div>

      <PhoneFrame className="p-5 max-h-[560px] overflow-y-auto">
        <PlanDetailsSheetContent planId={planId} />
      </PhoneFrame>
    </ShowcaseSection>
  );
}

/* ─── Kv helper for ReviewAccordion ───────────────────────────── */

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

/* ─── 7. ReviewAccordion ───────────────────────────────────────── */

function ReviewAccordionSection() {
  const items = useMemo(
    (): AccordionItem[] => [
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
                Honda Activa 110CC
              </Typography>
            </div>
          </div>
        ),
        content: (
          <div className="review-accordion-panel">
            <div className="flex flex-col gap-[var(--space-3)]">
              <Kv label="Brand & model" value="Honda Activa 110CC" />
              <Kv label="Registration year" value="2024" />
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
                Ramnan Arumugam
              </Typography>
            </div>
          </div>
        ),
        content: (
          <div className="review-accordion-panel">
            <div className="flex flex-col gap-[var(--space-3)]">
              <Kv label="Full name" value="Ramnan Arumugam" />
              <Kv label="Email" value="ramnan.arumugam@acko.tech" />
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
                Bike Bundled Plan
              </Typography>
            </div>
          </div>
        ),
        content: (
          <div className="review-accordion-panel">
            <div className="flex flex-col gap-[var(--space-3)]">
              <Kv label="Selected plan" value="Bike Bundled Plan" />
              <Kv label="Third Party tenure" value="5 years" />
              <Kv label="Own Damage tenure" value="1 year" />
              <Kv label="Insured value" value={formatRupees(13632)} />
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
                {formatRupees(4571)} incl. GST
              </Typography>
            </div>
          </div>
        ),
        content: <PremiumBreakupDetails variant="review" />,
      },
    ],
    []
  );

  return (
    <ShowcaseSection
      id="review-accordion"
      name="ReviewAccordion"
      pkg="@acko/review-accordion"
      description="Accordion with icon + heading + collapsible summary trigger. Summary hides when the item expands. Used on all review / confirmation screens."
    >
      <PhoneFrame className="p-5">
        <Accordion
          className="review-accordion"
          type="single"
          defaultValue="plan"
          items={items}
        />
      </PhoneFrame>
    </ShowcaseSection>
  );
}

/* ─── Nav ──────────────────────────────────────────────────────── */

const NAV = [
  { id: "bottom-sheet", label: "BottomSheet" },
  { id: "mobile-header", label: "MobileHeader" },
  { id: "sticky-footer", label: "StickyFooter" },
  { id: "feature-list", label: "FeatureList" },
  { id: "info-card", label: "InfoCard" },
  { id: "coverage-details", label: "CoverageDetails" },
  { id: "review-accordion", label: "ReviewAccordion" },
];

/* ─── Page ─────────────────────────────────────────────────────── */

export default function ComponentsPage() {
  return (
    <BikeJourneyProvider>
      <div className="min-h-screen bg-[var(--color-surface)]">
        {/* Header */}
        <div className="bg-[var(--color-card-elevated-bg)] border-b border-[var(--color-border-subtle)] px-6 py-5">
          <Typography variant="heading-lg" color="primary" weight="bold" as="h1">
            Component Candidates
          </Typography>
          <Typography variant="body-md" color="secondary" className="mt-1">
            7 patterns from the D2C bike journey proposed for{" "}
            <code className="font-mono text-sm">@acko/*</code> registry
          </Typography>
        </div>

        {/* Sticky nav */}
        <nav
          className="sticky top-0 z-10 bg-[var(--color-card-elevated-bg)] border-b border-[var(--color-border-subtle)] px-4 py-3 overflow-x-auto"
          aria-label="Component sections"
        >
          <div className="flex gap-2 min-w-max">
            {NAV.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="shrink-0 px-3 py-1.5 rounded-full text-sm font-medium bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-text-primary)] transition-colors no-underline"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* Sections */}
        <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col gap-16">
          <BottomSheetSection />
          <MobileHeaderSection />
          <StickyPriceFooterSection />
          <FeatureListSection />
          <InfoCardSection />
          <CoverageDetailsSection />
          <ReviewAccordionSection />
        </div>
      </div>
    </BikeJourneyProvider>
  );
}
