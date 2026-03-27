import { Badge } from "@acko/badge";
import { Button } from "@acko/button";
import { Card, CardContent } from "@acko/card";
import { Separator } from "@acko/separator";
import { Typography } from "@acko/typography";
import { Bike, Shield, UserCircle } from "lucide-react";
import { InfoBanner } from "../../components/bike/InfoBanner";
import { MobileHeader } from "../../components/bike/MobileHeader";
import { StickyPriceFooter } from "../../components/bike/StickyPriceFooter";
import { footerDisplayAmount, useBikeJourney } from "../../context/BikeJourneyContext";
import { formatRupees } from "../format";

const ADDONS = [
  {
    key: "zeroDep" as const,
    title: "Zero Depreciation Cover",
    desc: (
      <>
        Get the <Typography variant="body-sm" color="primary" weight="bold" as="span">full cost of bike parts</Typography>{" "}
        without depreciation deduction.
      </>
    ),
    price: 12,
    icon: Bike,
    badge: null as string | null,
  },
  {
    key: "pa" as const,
    title: "Personal Accident Cover",
    desc: (
      <>
        Coverage up to{" "}
        <Typography variant="body-sm" color="primary" weight="bold" as="span">
          ₹15 lakh
        </Typography>{" "}
        for the owner.
      </>
    ),
    price: 350,
    icon: Shield,
    badge: "Mandatory by law",
  },
  {
    key: "pillion" as const,
    title: "Pillion Rider Cover",
    desc: "Protection for the person riding with you.",
    price: 100,
    icon: UserCircle,
    badge: null as string | null,
  },
];

export function SelectAddOns() {
  const { addons, setAddons, setSheet, goNext, goBack, plan } = useBikeJourney();
  const amt = footerDisplayAmount({ plan, addons });

  return (
    <div
      className="min-h-screen"
      style={{
        paddingLeft: "var(--space-4)",
        paddingRight: "var(--space-4)",
        paddingBottom: "calc(var(--space-28) + env(safe-area-inset-bottom, 0px))",
        background: "var(--color-card-elevated-bg)",
      }}
    >
      <MobileHeader
        title="Select add-ons"
        onBack={goBack}
        subtitle={
          <Typography variant="body-sm" color="secondary" as="p">
            Add-ons are valid for{" "}
            <Typography variant="body-sm" color="secondary" weight="bold" as="span">
              1 year
            </Typography>
          </Typography>
        }
      />

      <div className="flex flex-col" style={{ gap: "var(--space-4)", marginTop: "var(--space-4)" }}>
        {ADDONS.map((a) => {
          const Icon = a.icon;
          const on = addons[a.key];
          return (
            <div key={a.key} className="relative">
              {a.badge ? (
                <div className="absolute top-3 right-3 z-10">
                  <Badge variant="solid" color="orange" size="sm" textCase="sentence">
                    {a.badge}
                  </Badge>
                </div>
              ) : null}
              <Card variant="outline" padding="md">
                <CardContent className="flex flex-col" style={{ gap: "var(--space-3)" }}>
                  <div className="flex gap-3">
                    <div
                      className="shrink-0 flex items-center justify-center"
                      style={{
                        width: "var(--space-12)",
                        height: "var(--space-12)",
                        borderRadius: "var(--radius-lg)",
                        background: "var(--color-card-demoted-bg)",
                      }}
                    >
                      <Icon size={24} style={{ color: "var(--color-text-secondary)" }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Typography variant="heading-sm" color="primary" weight="bold">
                        {a.title}
                      </Typography>
                      <div style={{ marginTop: "var(--space-2)" }}>
                        <Typography variant="body-sm" color="secondary" as="div">
                          {a.desc}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <Separator decorative className="border-dashed" />
                  <div className="flex items-center justify-between gap-3">
                    <Typography variant="body-sm" color="primary" as="div">
                      {a.title} @{" "}
                      <Typography variant="body-sm" color="primary" weight="bold" as="span">
                        {formatRupees(a.price)}
                      </Typography>
                    </Typography>
                    <Button
                      type="button"
                      variant={on ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setAddons({ [a.key]: !on })}
                    >
                      {on ? "Added" : "Add"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}

        <InfoBanner />
      </div>

      <StickyPriceFooter
        amountLabel={formatRupees(amt)}
        gstNote="+ 18% GST"
        onPremiumBreakup={() => setSheet("premium")}
        ctaLabel="Continue"
        onCta={() => goNext()}
      />
    </div>
  );
}
