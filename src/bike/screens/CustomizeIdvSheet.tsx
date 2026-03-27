import { Button } from "@acko/button";
import { Card } from "@acko/card";
import { Slider } from "@acko/slider";
import { Typography } from "@acko/typography";
import { IDV_MAX, IDV_MIN, useBikeJourney } from "../../context/BikeJourneyContext";
import { formatIdvShort } from "../format";

export function CustomizeIdvSheetContent() {
  const { idv, setIdv, bikeBrandModel } = useBikeJourney();

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
      <Typography variant="body-md" color="primary">
        IDV (Insured Value) is the maximum amount ACKO will pay you if your bike is stolen or damaged
        beyond repair.
      </Typography>

      <Card variant="outline" padding="md">
        <div className="flex justify-between items-center" style={{ marginBottom: "var(--space-4)" }}>
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
        <Typography variant="heading-sm" color="primary" weight="bold" style={{ marginBottom: "var(--space-2)" }}>
          How to choose your bike&apos;s IDV?
        </Typography>
        <Typography variant="body-sm" color="primary">
          For your new {bikeBrandModel || "bike"}, we advise selecting an IDV of {formatIdvShort(Math.round(idv / 100) * 100)} or more, for maximum protection.
        </Typography>
      </Card>
    </div>
  );
}

export function CustomizeIdvSheetFooter({ onOkay }: { onOkay: () => void }) {
  return (
    <Button type="button" variant="primary" size="lg" fullWidth onClick={onOkay}>
      Okay
    </Button>
  );
}
