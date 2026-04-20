import { ScrollArea } from "@acko/scroll-area";
import { TextInput } from "@acko/text-input";
import { Typography } from "@acko/typography";
import { Search, X } from "lucide-react";
import { useId, useState } from "react";
import { BIKE_RESULTS, useBikeJourney } from "../../context/BikeJourneyContext";

export function FindBikeSheetContent() {
  const [q, setQ] = useState("");
  const resultsHeadingId = useId();
  const { setBikeBrandModel, setSheet } = useBikeJourney();

  const filtered = BIKE_RESULTS.filter((b) =>
    b.toLowerCase().includes(q.trim().toLowerCase())
  );

  return (
    <div
      className="bike-sheet-body find-bike-sheet-content min-h-0 flex-1"
      style={{ gap: "var(--space-5)" }}
    >
      <div className="find-bike-search-input shrink-0">
        <TextInput
          label="Search bikes"
          placeholder="Search your bike"
          value={q}
          onChange={setQ}
          type="text"
          autoComplete="off"
          iconLeft={<Search size={18} style={{ color: "var(--color-text-secondary)" }} />}
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
        className="flex min-h-0 flex-1 flex-col"
        style={{ gap: "var(--space-2)" }}
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
              <div className="bike-sheet-empty flex flex-col" style={{ gap: "var(--space-2)" }} role="status">
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
                        <Typography variant="body-md" color="primary" weight="medium" className="min-w-0 text-left">
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
