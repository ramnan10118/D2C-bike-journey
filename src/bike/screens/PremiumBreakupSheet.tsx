import { Button } from "@acko/button";
import { Separator } from "@acko/separator";
import { Typography } from "@acko/typography";
import { formatRupees } from "../format";

function Row({
  left,
  right,
  tone = "primary",
}: {
  left: string;
  right: string;
  tone?: "primary" | "brand";
}) {
  return (
    <div className="flex justify-between gap-4 items-start">
      <Typography variant="body-sm" color={tone} className="flex-1">
        {left}
      </Typography>
      <Typography variant="body-sm" color={tone} weight="semibold" className="shrink-0">
        {right}
      </Typography>
    </div>
  );
}

export function PremiumBreakupSheetContent() {
  return (
    <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
      <Row left="Third-party Premium (5 years)" right={formatRupees(3851)} />
      <Separator decorative />
      <Row left="Own Damage premium (1 year)" right={formatRupees(173)} />
      <Separator decorative />
      <Row left="Discount" right={`- ${formatRupees(150)}`} tone="brand" />
      <Separator decorative />
      <div className="flex justify-between gap-4 items-baseline">
        <Typography variant="body-md" color="primary" weight="bold">
          Net premium
        </Typography>
        <Typography variant="body-md" color="primary" weight="bold">
          {formatRupees(3874)}
        </Typography>
      </div>
      <Typography variant="caption" color="secondary">
        (Additional 18% GST will be applicable)
      </Typography>
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
