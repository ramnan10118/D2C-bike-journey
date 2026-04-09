import { useId } from "react";
import { Button } from "@acko/button";
import { Typography } from "@acko/typography";
import { MobileHeader } from "../../components/bike/MobileHeader";
import { useBikeJourney } from "../../context/BikeJourneyContext";

export function EnterBikeDetails() {
  const { bikeBrandModel, setSheet, goNext, sheet } = useBikeJourney();
  const labelId = useId();
  const isFindBikeOpen = sheet === "findBike";

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

      <div style={{ marginTop: "var(--journey-header-content-gap)", flex: 1 }}>
        {/* Same shell as @acko/dropdown trigger — tap opens bottom sheet instead of popover menu */}
        <div className="acko-dropdown w-full">
          <span id={labelId} className="sr-only">
            Brand and model
          </span>
          <button
            type="button"
            className={[
              "acko-dropdown-trigger acko-dropdown-trigger-md",
              isFindBikeOpen ? "acko-dropdown-trigger-open" : "",
              bikeBrandModel ? "acko-dropdown-trigger-filled" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-labelledby={labelId}
            aria-haspopup="dialog"
            aria-expanded={isFindBikeOpen}
            onClick={() => setSheet("findBike")}
          >
            <span
              className={
                bikeBrandModel ? "acko-dropdown-value" : "acko-dropdown-value acko-dropdown-placeholder"
              }
            >
              {bikeBrandModel || "Select brand & model"}
            </span>
            <span
              className={["acko-dropdown-chevron", isFindBikeOpen ? "acko-dropdown-chevron-open" : ""]
                .filter(Boolean)
                .join(" ")}
              aria-hidden
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </button>
        </div>
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
        <div className="w-full" style={{ marginTop: "var(--space-3)", textAlign: "center" }}>
          <Typography variant="caption" color="secondary" as="span">
            By proceeding, you agree to{" "}
          </Typography>
          <Button type="button" variant="link" size="xs" className="!inline !p-0 align-baseline">
            Terms & Conditions
          </Button>
        </div>
      </footer>
    </div>
  );
}
