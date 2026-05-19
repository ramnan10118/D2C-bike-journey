"use client";

import { ScrollArea } from "@acko/scroll-area";
import { TextInput } from "@acko/text-input";
import { Typography } from "@acko/typography";
import { Button } from "@acko/button";
import { Card } from "@acko/card";
import { Slider } from "@acko/slider";
import { Search, X } from "lucide-react";
import { useId, useState } from "react";
import { BottomSheet } from "./BottomSheet";
import { PlanDetailsSheetContent } from "./PlanDetailsSheet";
import { PremiumBreakupDetails } from "./PremiumBreakupDetails";
import { WhyComprehensiveContent, WhyThirdParty5YearContent } from "./WhySheets";
import {
  BIKE_RESULTS,
  IDV_MAX,
  IDV_MIN,
  useBikeJourney,
} from "@/context/BikeJourneyContext";
import { formatIdvShort } from "@/lib/format";

function FindBikeSheetContent() {
  const [q, setQ] = useState("");
  const resultsHeadingId = useId();
  const { setBikeBrandModel, setSheet } = useBikeJourney();

  const filtered = BIKE_RESULTS.filter((b) =>
    b.toLowerCase().includes(q.trim().toLowerCase())
  );

  return (
    <div className="bike-sheet-body find-bike-sheet-content min-h-0 flex-1 gap-[var(--space-5)]">
      <div className="find-bike-search-input shrink-0">
        <TextInput
          label="Search bikes"
          placeholder="Search your bike"
          value={q}
          onChange={setQ}
          type="text"
          autoComplete="off"
          iconLeft={
            <Search size={18} className="text-[var(--color-text-secondary)]" />
          }
          iconRight={
            q.trim().length > 0 ? (
              <button
                type="button"
                className="find-bike-search-clear"
                aria-label="Clear search"
                title="Clear"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setQ("");
                }}
              >
                <X size={18} strokeWidth={2} aria-hidden />
              </button>
            ) : undefined
          }
        />
      </div>

      <section
        className="flex min-h-0 flex-1 flex-col gap-[var(--space-2)]"
        aria-labelledby={resultsHeadingId}
      >
        <Typography
          id={resultsHeadingId}
          variant="label-sm"
          color="secondary"
          weight="semibold"
          as="h3"
          className="bike-sheet-section-heading shrink-0"
        >
          Top search results
        </Typography>

        <div className="bike-sheet-bleed-x bike-sheet-list-wrap flex-1 min-h-0">
          <ScrollArea
            maxHeight="min(320px, 50dvh)"
            orientation="vertical"
            className="min-h-0"
            aria-labelledby={resultsHeadingId}
          >
            {filtered.length === 0 ? (
              <div
                className="bike-sheet-empty flex flex-col gap-[var(--space-2)]"
                role="status"
              >
                <Typography variant="body-md" color="secondary" weight="medium">
                  No bikes match your search
                </Typography>
                <Typography variant="body-sm" color="secondary">
                  Try a different model name or spelling
                </Typography>
              </div>
            ) : (
              <ul className="bike-sheet-list" aria-label="Bike models">
                {filtered.map((name) => (
                  <li key={name}>
                    <button
                      type="button"
                      className="bike-sheet-list-row"
                      onClick={() => {
                        setBikeBrandModel(name);
                        setSheet(null);
                      }}
                    >
                      <span className="bike-sheet-list-row-inner">
                        <Typography
                          variant="body-md"
                          color="primary"
                          weight="medium"
                          className="min-w-0 text-left"
                        >
                          {name}
                        </Typography>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </ScrollArea>
        </div>
      </section>
    </div>
  );
}

function CustomizeIdvSheetContent() {
  const { idv, setIdv, bikeBrandModel } = useBikeJourney();

  return (
    <div className="flex flex-col gap-[var(--space-5)]">
      <Typography variant="body-md" color="primary">
        IDV (Insured Value) is the maximum amount ACKO will pay you if your bike
        is stolen or damaged beyond repair.
      </Typography>

      <Card variant="outline" padding="md">
        <div className="flex justify-between items-center mb-[var(--space-4)]">
          <Typography variant="label-sm" color="secondary">
            {formatIdvShort(IDV_MIN)}
          </Typography>
          <Typography variant="heading-sm" color="brand" weight="bold">
            IDV {formatIdvShort(idv)}
          </Typography>
          <Typography variant="label-sm" color="secondary">
            {formatIdvShort(IDV_MAX)}
          </Typography>
        </div>
        <Slider
          value={idv}
          onChange={setIdv}
          min={IDV_MIN}
          max={IDV_MAX}
          step={10}
          showValue={false}
          aria-label="Insured value"
        />
      </Card>

      <Card
        variant="outline"
        padding="md"
        style={{ background: "var(--color-primary-subtle)" }}
      >
        <Typography
          variant="heading-sm"
          color="primary"
          weight="bold"
          className="mb-[var(--space-2)]"
        >
          How to choose your bike&apos;s IDV?
        </Typography>
        <Typography variant="body-sm" color="primary">
          For your new {bikeBrandModel || "bike"}, we advise selecting an IDV of{" "}
          {formatIdvShort(Math.round(idv / 100) * 100)} or more, for maximum
          protection.
        </Typography>
      </Card>
    </div>
  );
}

export function BikeJourneySheets() {
  const { sheet, setSheet } = useBikeJourney();

  return (
    <>
      <BottomSheet
        open={sheet === "findBike"}
        title="Find your bike"
        onClose={() => setSheet(null)}
      >
        <FindBikeSheetContent />
      </BottomSheet>

      <BottomSheet
        open={sheet === "idv"}
        title="Customise your IDV"
        onClose={() => setSheet(null)}
        footer={
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setSheet(null)}
          >
            Okay
          </Button>
        }
      >
        <CustomizeIdvSheetContent />
      </BottomSheet>

      <BottomSheet
        open={sheet === "premium"}
        title="Premium breakup"
        onClose={() => setSheet(null)}
        footer={
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setSheet(null)}
          >
            OK
          </Button>
        }
      >
        <PremiumBreakupDetails />
      </BottomSheet>

      <BottomSheet
        open={sheet === "planDetailsComprehensive"}
        title="Comprehensive plan"
        onClose={() => setSheet(null)}
        footer={
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setSheet(null)}
          >
            OK
          </Button>
        }
      >
        <PlanDetailsSheetContent planId="comprehensive" />
      </BottomSheet>

      <BottomSheet
        open={sheet === "planDetailsThirdParty"}
        title="Third-party plan"
        onClose={() => setSheet(null)}
        footer={
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setSheet(null)}
          >
            OK
          </Button>
        }
      >
        <PlanDetailsSheetContent planId="thirdparty" />
      </BottomSheet>

      <BottomSheet
        open={sheet === "whyThirdParty5Year"}
        title="Why a 5-year Third-party coverage?"
        onClose={() => setSheet(null)}
        footer={
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setSheet(null)}
          >
            Okay
          </Button>
        }
      >
        <WhyThirdParty5YearContent />
      </BottomSheet>

      <BottomSheet
        open={sheet === "whyComprehensive"}
        title="Upgrade to a Comprehensive Plan for just ₹23 extra"
        onClose={() => setSheet(null)}
        footer={
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setSheet(null)}
          >
            Okay
          </Button>
        }
      >
        <WhyComprehensiveContent />
      </BottomSheet>
    </>
  );
}
