import { useState } from "react";
import { Field } from "@acko/field";
import { TextInput } from "@acko/text-input";
import { MobileHeader } from "../../components/bike/MobileHeader";
import { StickyPriceFooter } from "../../components/bike/StickyPriceFooter";
import { footerDisplayAmount, useBikeJourney } from "../../context/BikeJourneyContext";
import type { MoreDetailsErrors } from "../moreDetailsValidation";
import { validateMoreDetails } from "../moreDetailsValidation";
import { formatRupees } from "../format";

export function MoreDetails() {
  const {
    fullName,
    setFullName,
    email,
    setEmail,
    pincode,
    setPincode,
    gst,
    setGst,
    setSheet,
    goNext,
    goBack,
    plan,
    addons,
  } = useBikeJourney();

  const amt = footerDisplayAmount({ plan, addons });
  const [fieldErrors, setFieldErrors] = useState<MoreDetailsErrors>({});

  const handleContinue = () => {
    const { ok, errors } = validateMoreDetails({ fullName, email, pincode });
    setFieldErrors(errors);
    if (ok) {
      goNext();
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        paddingLeft: "var(--journey-inline-padding)",
        paddingRight: "var(--journey-inline-padding)",
        paddingBottom: "calc(var(--journey-sticky-footer-clearance) + env(safe-area-inset-bottom, 0px))",
        background: "var(--color-card-elevated-bg)",
      }}
    >
      <MobileHeader title="Just a few more details" onBack={goBack} />

      <div
        className="flex flex-col"
        style={{ gap: "var(--space-4)", marginTop: "var(--journey-header-content-gap)" }}
      >
        <Field>
          <TextInput
            label="Full Name"
            placeholder="Full Name"
            value={fullName}
            onChange={(v) => {
              setFullName(v);
              if (fieldErrors.fullName) {
                setFieldErrors((prev) => {
                  const next = { ...prev };
                  delete next.fullName;
                  return next;
                });
              }
            }}
            state={fieldErrors.fullName ? "error" : "default"}
            errorText={fieldErrors.fullName}
          />
        </Field>
        <Field>
          <TextInput
            label="Email"
            placeholder="Email"
            value={email}
            onChange={(v) => {
              setEmail(v);
              if (fieldErrors.email) {
                setFieldErrors((prev) => {
                  const next = { ...prev };
                  delete next.email;
                  return next;
                });
              }
            }}
            type="email"
            autoComplete="email"
            state={fieldErrors.email ? "error" : "default"}
            errorText={fieldErrors.email}
          />
        </Field>
        <Field>
          <TextInput
            label="Pincode"
            placeholder="Pincode"
            value={pincode}
            onChange={(v) => {
              setPincode(v.replace(/\D/g, "").slice(0, 6));
              if (fieldErrors.pincode) {
                setFieldErrors((prev) => {
                  const next = { ...prev };
                  delete next.pincode;
                  return next;
                });
              }
            }}
            type="text"
            maxLength={6}
            state={fieldErrors.pincode ? "error" : "default"}
            errorText={fieldErrors.pincode}
          />
        </Field>
        <Field>
          <TextInput
            label="GST number (optional)"
            placeholder="GST number (optional)"
            value={gst}
            onChange={setGst}
          />
        </Field>
      </div>

      <StickyPriceFooter
        amountLabel={formatRupees(amt)}
        gstNote="+ 18% GST"
        onPremiumBreakup={() => setSheet("premium")}
        ctaLabel="Continue"
        onCta={handleContinue}
      />
    </div>
  );
}
