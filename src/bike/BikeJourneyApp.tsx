import { BottomSheet } from "../components/bike/BottomSheet";
import { useBikeJourney } from "../context/BikeJourneyContext";
import { CustomizeIdvSheetContent, CustomizeIdvSheetFooter } from "./screens/CustomizeIdvSheet";
import { EnterBikeDetails } from "./screens/EnterBikeDetails";
import { FindBikeSheetContent } from "./screens/FindBikeSheet";
import { MoreDetails } from "./screens/MoreDetails";
import { Pay } from "./screens/Pay";
import { PlanDetailsSheetContent, PlanDetailsSheetFooter } from "./screens/PlanDetailsSheet";
import { PremiumBreakupSheetContent, PremiumBreakupSheetFooter } from "./screens/PremiumBreakupSheet";
import { Review } from "./screens/Review";
import { SelectAddOns } from "./screens/SelectAddOns";
import { SelectPlan } from "./screens/SelectPlan";

export function BikeJourneyApp() {
  const { step, sheet, setSheet } = useBikeJourney();
  return (
    <div
      className="w-full mx-auto min-h-[100dvh] relative"
      style={{
        maxWidth: "var(--layout-journey-max-width)",
        background: "var(--color-card-elevated-bg)",
        paddingTop: "var(--space-4)",
        paddingBottom: "var(--space-4)",
      }}
    >
      {step === 1 && <EnterBikeDetails />}
      {step === 3 && <SelectPlan />}
      {step === 5 && <SelectAddOns />}
      {step === 6 && <MoreDetails />}
      {step === 8 && <Review />}
      {step === 9 && <Pay />}

      <BottomSheet open={sheet === "findBike"} title="Find your bike" onClose={() => setSheet(null)}>
        <FindBikeSheetContent />
      </BottomSheet>

      <BottomSheet
        open={sheet === "idv"}
        title="Customise your IDV"
        onClose={() => setSheet(null)}
        footer={<CustomizeIdvSheetFooter onOkay={() => setSheet(null)} />}
      >
        <CustomizeIdvSheetContent />
      </BottomSheet>

      <BottomSheet
        open={sheet === "premium"}
        title="Premium breakup"
        onClose={() => setSheet(null)}
        footer={<PremiumBreakupSheetFooter onOkay={() => setSheet(null)} />}
      >
        <PremiumBreakupSheetContent />
      </BottomSheet>

      <BottomSheet
        open={sheet === "planDetailsComprehensive"}
        title="Comprehensive plan"
        onClose={() => setSheet(null)}
        footer={<PlanDetailsSheetFooter onOkay={() => setSheet(null)} />}
      >
        <PlanDetailsSheetContent planId="comprehensive" />
      </BottomSheet>

      <BottomSheet
        open={sheet === "planDetailsThirdParty"}
        title="Third-party plan"
        onClose={() => setSheet(null)}
        footer={<PlanDetailsSheetFooter onOkay={() => setSheet(null)} />}
      >
        <PlanDetailsSheetContent planId="thirdparty" />
      </BottomSheet>
    </div>
  );
}
