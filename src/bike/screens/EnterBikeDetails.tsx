import { Button } from "@acko/button";
import { Card } from "@acko/card";
import { Typography } from "@acko/typography";
import { ChevronDown } from "lucide-react";
import { MobileHeader } from "../../components/bike/MobileHeader";
import { useBikeJourney } from "../../context/BikeJourneyContext";

export function EnterBikeDetails() {
  const { bikeBrandModel, setSheet, goNext } = useBikeJourney();

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        paddingLeft: "var(--journey-inline-padding)",
        paddingRight: "var(--journey-inline-padding)",
        paddingBottom: "calc(var(--journey-sticky-footer-clearance) + env(safe-area-inset-bottom, 0px))",
        background: "var(--color-card-elevated-bg)",
      }}
    >
      <MobileHeader title="Enter your bike details" showBack />

      <div style={{ marginTop: "var(--space-6)", flex: 1 }}>
        <button
          type="button"
          className="w-full text-left border-0 bg-transparent p-0 cursor-pointer"
          onClick={() => setSheet("findBike")}
        >
          <Card variant="outline" padding="md" className="w-full">
            <div className="flex items-center justify-between gap-3">
              <Typography
                variant="body-md"
                color={bikeBrandModel ? "primary" : "secondary"}
              >
                {bikeBrandModel || "Select brand & model"}
              </Typography>
              <ChevronDown
                size={20}
                style={{ color: "var(--color-text-secondary)", flexShrink: 0 }}
                aria-hidden
              />
            </div>
          </Card>
        </button>
      </div>

      <footer
        className="fixed left-0 right-0 bottom-0 mx-auto w-full"
        style={{
          maxWidth: "var(--layout-mobile-max-width)",
          zIndex: "var(--z-sticky)",
          background: "var(--color-card-elevated-bg)",
          borderTop: "var(--border-hairline) solid var(--color-border-subtle)",
          paddingTop: "var(--space-4)",
          paddingBottom: "calc(var(--space-4) + env(safe-area-inset-bottom, 0px))",
          paddingLeft: "var(--journey-inline-padding)",
          paddingRight: "var(--journey-inline-padding)",
        }}
      >
        <Button
          type="button"
          variant="primary"
          size="lg"
          fullWidth
          disabled={!bikeBrandModel}
          onClick={() => goNext()}
        >
          View plans
        </Button>
        <Typography
          variant="caption"
          color="secondary"
          align="center"
          style={{ marginTop: "var(--space-3)" }}
        >
          By proceeding, you agree to{" "}
          <Button type="button" variant="link" size="xs" className="!inline !p-0">
            Terms & Conditions
          </Button>
        </Typography>
      </footer>
    </div>
  );
}
