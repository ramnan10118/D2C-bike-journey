import { Button } from "@acko/button";
import { Typography } from "@acko/typography";
import { clsx } from "clsx";
import { formatRupees } from "../format";

function Row({
  left,
  right,
  tone = "primary",
  noDividerBelow = false,
}: {
  left: string;
  right: string;
  tone?: "primary" | "brand";
  /** When true, no hairline under this row (e.g. before Discount when grouped with line above). */
  noDividerBelow?: boolean;
}) {
  return (
    <div
      className={clsx("bike-sheet-kv-row", noDividerBelow && "bike-sheet-kv-row--no-divider-below")}
    >
      <Typography variant="body-md" color={tone} weight="medium" className="min-w-0 flex-1">
        {left}
      </Typography>
      <Typography variant="body-md" color={tone} weight="semibold" className="shrink-0 text-right tabular-nums">
        {right}
      </Typography>
    </div>
  );
}

export function PremiumBreakupSheetContent() {
  return (
    <div className="bike-sheet-body bike-sheet-breakup">
      <div className="bike-sheet-bleed-x bike-sheet-breakup-bleed flex flex-col">
        <Row left="Third-party Premium (5 years)" right={formatRupees(3851)} />
        <Row left="Own Damage premium (1 year)" right={formatRupees(173)} noDividerBelow />
        <Row left="Discount" right={`- ${formatRupees(150)}`} tone="brand" />
      </div>

      <section className="bike-sheet-breakup-total" aria-label="Net premium summary">
        <div className="flex justify-between gap-4 items-baseline">
          <Typography variant="heading-sm" color="primary" weight="bold" as="p" className="min-w-0">
            Net premium
          </Typography>
          <Typography variant="heading-sm" color="primary" weight="bold" className="shrink-0 tabular-nums">
            {formatRupees(3874)}
          </Typography>
        </div>
        <Typography variant="caption" color="secondary" as="p">
          (Additional 18% GST will be applicable)
        </Typography>
      </section>
    </div>
  );
}

export function PremiumBreakupSheetFooter({ onOkay }: { onOkay: () => void }) {
  return (
    <Button type="button" variant="primary" size="lg" fullWidth onClick={onOkay}>
      OK
    </Button>
  );
}
