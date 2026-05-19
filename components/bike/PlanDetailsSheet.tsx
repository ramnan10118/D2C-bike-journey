"use client";

import { Typography } from "@acko/typography";
import { Check, X } from "lucide-react";
import type { PlanId } from "@/context/BikeJourneyContext";

type PlanDetailItem = { title: string; description: string };

const PLAN_DETAILS_COPY: Record<
  PlanId,
  {
    intro: string;
    covered: PlanDetailItem[];
    notCovered: PlanDetailItem[];
  }
> = {
  comprehensive: {
    intro:
      "Covers damage to your bike as well as damage your bike may cause to others or their property.",
    covered: [
      {
        title: "Accidents",
        description: "Covers bike repairs if your bike is damaged in an accident.",
      },
      {
        title: "Fire",
        description:
          "Covers bike damage caused by fire, self-ignition, explosion or lightning.",
      },
      {
        title: "Theft",
        description: "Covers bike theft.",
      },
      {
        title: "Calamities",
        description:
          "Covers bike damage caused by natural or man-made calamities such as earthquakes, riots, etc.",
      },
      {
        title: "Third-party injury or death",
        description:
          "Covers medical expenses and offers compensation to the third party if they are injured or die in an accident involving your bike.",
      },
      {
        title: "Third-party property",
        description: "Covers damage caused by your bike to third-party vehicles or property.",
      },
    ],
    notCovered: [
      {
        title: "Non-accidental damage",
        description:
          "Doesn’t cover natural wear and tear of parts like tyres, tubes, and engine.",
      },
      {
        title: "Illegal driving",
        description:
          "Doesn’t cover any expenses arising from violations of traffic laws, such as riding without a valid licence or under the influence of alcohol or drugs.",
      },
    ],
  },
  thirdparty: {
    intro: "Covers damage caused by your bike to others and their property.",
    covered: [
      {
        title: "Third-party injury/death",
        description:
          "Covers medical expenses and offers compensation to the third party if they are injured or die in an accident involving your bike.",
      },
      {
        title: "Third-party property",
        description: "Covers damage caused by your bike to third-party vehicles or property.",
      },
    ],
    notCovered: [
      {
        title: "Own bike damages",
        description: "Doesn’t cover damage to your bike.",
      },
      {
        title: "Unlawful use",
        description:
          "Doesn’t cover any expenses arising from violations of traffic laws, such as riding without a valid licence or under the influence of alcohol or drugs.",
      },
    ],
  },
};

function PlanDetailsRowPositive({ title, description }: PlanDetailItem) {
  return (
    <li className="plan-details-row">
      <span className="plan-details-row-icon plan-details-row-icon--positive" aria-hidden>
        <Check size={12} strokeWidth={3} />
      </span>
      <div className="min-w-0 flex-1 flex flex-col gap-[var(--space-1)]">
        <Typography variant="body-sm" color="primary" weight="bold" className="m-0">
          {title}
        </Typography>
        <Typography variant="body-sm" color="secondary" className="m-0">
          {description}
        </Typography>
      </div>
    </li>
  );
}

function PlanDetailsRowNegative({ title, description }: PlanDetailItem) {
  return (
    <li className="plan-details-row">
      <span className="plan-details-row-icon plan-details-row-icon--negative" aria-hidden>
        <X size={12} strokeWidth={3} />
      </span>
      <div className="min-w-0 flex-1 flex flex-col gap-[var(--space-1)]">
        <Typography variant="body-sm" color="primary" weight="bold" className="m-0">
          {title}
        </Typography>
        <Typography variant="body-sm" color="secondary" className="m-0">
          {description}
        </Typography>
      </div>
    </li>
  );
}

export function PlanDetailsSheetContent({ planId }: { planId: PlanId }) {
  const copy = PLAN_DETAILS_COPY[planId];

  return (
    <div className="bike-sheet-body plan-details-sheet">
      <Typography variant="body-md" color="secondary" className="m-0">
        {copy.intro}
      </Typography>

      <section className="plan-details-section" aria-labelledby="plan-details-covered-heading">
        <Typography
          id="plan-details-covered-heading"
          variant="heading-sm"
          color="primary"
          weight="bold"
          as="h3"
          style={{ margin: 0, marginBottom: "var(--space-3)" }}
        >
          What&apos;s covered
        </Typography>
        <ul className="plan-details-list">
          {copy.covered.map((item) => (
            <PlanDetailsRowPositive key={item.title} {...item} />
          ))}
        </ul>
      </section>

      <section className="plan-details-section" aria-labelledby="plan-details-not-covered-heading">
        <Typography
          id="plan-details-not-covered-heading"
          variant="heading-sm"
          weight="bold"
          as="h3"
          style={{
            margin: 0,
            marginBottom: "var(--space-3)",
            color: "var(--color-error)",
          }}
        >
          What&apos;s not covered
        </Typography>
        <ul className="plan-details-list">
          {copy.notCovered.map((item) => (
            <PlanDetailsRowNegative key={item.title} {...item} />
          ))}
        </ul>
      </section>
    </div>
  );
}
