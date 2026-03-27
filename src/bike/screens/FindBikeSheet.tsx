import { Button } from "@acko/button";
import { ScrollArea } from "@acko/scroll-area";
import { Separator } from "@acko/separator";
import { TextInput } from "@acko/text-input";
import { Typography } from "@acko/typography";
import { Search } from "lucide-react";
import { useState } from "react";
import { BIKE_RESULTS, useBikeJourney } from "../../context/BikeJourneyContext";

export function FindBikeSheetContent() {
  const [q, setQ] = useState("");
  const { setBikeBrandModel, setSheet } = useBikeJourney();

  const filtered = BIKE_RESULTS.filter((b) =>
    b.toLowerCase().includes(q.trim().toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-0" style={{ gap: "var(--space-4)" }}>
      <TextInput
        label="Search"
        placeholder="Search your Bike"
        value={q}
        onChange={setQ}
        type="search"
        iconLeft={<Search size={18} style={{ color: "var(--color-text-secondary)" }} />}
      />
      <Typography variant="label-sm" color="secondary" weight="medium">
        TOP SEARCH RESULTS
      </Typography>
      <ScrollArea maxHeight={320} orientation="vertical">
        <div role="list">
          {filtered.map((name, i) => (
            <div key={name}>
              {i > 0 ? <Separator className="my-0" /> : null}
              <Button
                type="button"
                variant="ghost"
                fullWidth
                className="!justify-start !rounded-none"
                style={{ paddingTop: "var(--space-3)", paddingBottom: "var(--space-3)" }}
                onClick={() => {
                  setBikeBrandModel(name);
                  setSheet(null);
                }}
              >
                <Typography variant="body-md" color="primary" weight="medium">
                  {name}
                </Typography>
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
