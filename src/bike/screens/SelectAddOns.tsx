import { useState, type ReactNode } from "react";
import { Badge } from "@acko/badge";
import { Checkbox } from "@acko/checkbox";
import { Typography } from "@acko/typography";
import { Check } from "lucide-react";
import { InfoBanner } from "../../components/bike/InfoBanner";
import { MobileHeader } from "../../components/bike/MobileHeader";
import { StickyPriceFooter } from "../../components/bike/StickyPriceFooter";
import {
  footerDisplayAmount,
  useBikeJourney,
  type BikeJourneyState,
} from "../../context/BikeJourneyContext";
import { formatRupees } from "../format";

const ZERO_DEP_TITLE = "Zero Depreciation Cover";
const ZERO_DEP_PRICE = 36;

const ZERO_DEP_POINTERS = [
  "Covers the full cost of bike parts if they are replaced during a claim.",
  "You won't have to pay any depreciation charges on replaced parts.",
] as const;

function PopularBadge() {
  return (
    <Badge variant="solid" color="purple" size="md" textCase="sentence">
      Popular in your city
    </Badge>
  );
}

type AddonKey = keyof BikeJourneyState["addons"];

/** One strip layout for every add-on: optional badge row on top, then checkbox + title (structure 2). */
const ADDON_DEFINITIONS: Array<{
  key: AddonKey;
  title: string;
  price: number;
  pointers: readonly string[];
  stripEnd?: ReactNode;
}> = [
  {
    key: "zeroDep",
    title: ZERO_DEP_TITLE,
    price: ZERO_DEP_PRICE,
    pointers: ZERO_DEP_POINTERS,
    stripEnd: <PopularBadge />,
  },
  {
    key: "pa",
    title: "Personal Accident Cover",
    price: 350,
    pointers: [
      "Coverage up to ₹15 lakh for the owner.",
      "Financial protection against accidental injury or death while riding.",
    ],
  },
  {
    key: "pillion",
    title: "Pillion Rider Cover",
    price: 100,
    pointers: [
      "Protection for the person riding with you on the bike.",
      "Covers injury liability for the pillion passenger.",
    ],
  },
  {
    key: "roadsideAssist",
    title: "Roadside Assistance",
    price: 150,
    pointers: [
      "Towing, flat tyre, and battery help when you're stranded.",
      "On-site assistance where available in your area.",
    ],
  },
  {
    key: "engineProtect",
    title: "Engine Protection Cover",
    price: 200,
    pointers: [
      "Covers water ingression damage to the engine.",
      "Oil leakage damage to engine parts included.",
    ],
  },
  {
    key: "consumables",
    title: "Consumables Cover",
    price: 75,
    pointers: [
      "Engine oil, nuts, bolts, and similar consumables in a claim.",
      "Labour-related small parts often excluded from standard cover.",
    ],
  },
];

function AddonPointerList({ lines }: { lines: readonly string[] }) {
  return (
    <ul className="addon-pointer-list">
      {lines.map((line) => (
        <li key={line} className="plan-radio-card-pointer-item">
          <Check className="plan-radio-card-pointer-icon" size={18} strokeWidth={2} aria-hidden />
          <Typography variant="body-sm" color="primary" weight="medium" style={{ margin: 0 }}>
            {line}
          </Typography>
        </li>
      ))}
    </ul>
  );
}

function AddOnCheckboxCard({
  title,
  pointers,
  price,
  selected,
  onToggle,
  stripEnd,
}: {
  title: string;
  pointers: readonly string[];
  price: number;
  selected: boolean;
  onToggle: (next: boolean) => void;
  /** Optional badge row above checkbox + title (structure 2). */
  stripEnd?: ReactNode;
}) {
  const checkboxEl = (
    <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
      <Checkbox
        checked={selected}
        onChange={onToggle}
        size="md"
        aria-label={`${title}, ${formatRupees(price)}`}
      />
    </div>
  );

  const titleEl = (
    <Typography
      variant="heading-sm"
      color={selected ? "brand" : "primary"}
      weight="bold"
      className="min-w-0 leading-tight"
      as="div"
    >
      {title}
    </Typography>
  );

  const badgeRow = stripEnd ? (
    <div className="flex w-full min-w-0 justify-start">
      <div className="max-w-[min(100%,14rem)] min-w-0 shrink-0">{stripEnd}</div>
    </div>
  ) : null;

  const stripInner = (
    <div
      className="flex min-h-0 w-full min-w-0 flex-1 flex-col"
      style={{ gap: "var(--space-2)" }}
    >
      {badgeRow}
      <div className="flex w-full min-w-0 items-start" style={{ gap: "var(--space-3)" }}>
        <div className="flex shrink-0 items-center self-start pt-0.5">{checkboxEl}</div>
        <div className="min-w-0 flex-1">{titleEl}</div>
      </div>
    </div>
  );

  return (
    <div
      className={`addon-select-card addon-select-card--strip ${selected ? "addon-select-card--selected" : ""}`}
      onClick={() => onToggle(!selected)}
    >
      <div className="addon-strip flex w-full min-w-0 items-start">
        {stripInner}
      </div>

      <div className="addon-strip-body">
        <AddonPointerList lines={pointers} />
        <div className="addon-strip-price-row">
          <Typography
            variant="heading-md"
            color="primary"
            weight="bold"
            as="div"
            style={{
              fontSize: "var(--font-heading-md-size)",
              lineHeight: "var(--font-heading-md-line)",
            }}
          >
            {formatRupees(price)}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export function SelectAddOns() {
  const { addons, setAddons, setSheet, goNext, goBack, plan } = useBikeJourney();
  const amt = footerDisplayAmount({ plan, addons });

  const [addonBumpTick, setAddonBumpTick] = useState(0);

  const handleAddonToggle = (key: AddonKey, next: boolean) => {
    setAddons({ [key]: next });
    setAddonBumpTick((n) => n + 1);
  };

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
      <MobileHeader
        title="Select add-ons"
        onBack={goBack}
        subtitle="Add-ons are valid for 1 year. Learn more"
        onLearnMore={() => {}}
      />

      <div
        className="flex w-full flex-col items-stretch"
        style={{ gap: "var(--space-3)", marginTop: "var(--journey-header-content-gap)" }}
      >
        {ADDON_DEFINITIONS.map((a) => (
          <AddOnCheckboxCard
            key={a.key}
            title={a.title}
            pointers={a.pointers}
            price={a.price}
            selected={addons[a.key]}
            onToggle={(next) => handleAddonToggle(a.key, next)}
            stripEnd={a.stripEnd}
          />
        ))}

        <InfoBanner />
      </div>

      <StickyPriceFooter
        amountLabel={formatRupees(amt)}
        gstNote="+ 18% GST"
        onPremiumBreakup={() => setSheet("premium")}
        ctaLabel="Continue"
        onCta={() => goNext()}
        planBumpTick={addonBumpTick}
      />
    </div>
  );
}
