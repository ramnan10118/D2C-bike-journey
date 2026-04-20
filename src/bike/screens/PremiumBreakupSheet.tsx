import { Button } from "@acko/button";
import { PremiumBreakupDetails } from "../../components/bike/PremiumBreakupDetails";

export function PremiumBreakupSheetContent() {
  return <PremiumBreakupDetails />;
}

export function PremiumBreakupSheetFooter({ onOkay }: { onOkay: () => void }) {
  return (
    <Button type="button" variant="primary" size="lg" fullWidth onClick={onOkay}>
      OK
    </Button>
  );
}
