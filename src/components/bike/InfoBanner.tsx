import { Alert } from "@acko/alert";

export function InfoBanner() {
  return (
    <div style={{ marginBottom: "var(--space-3)" }}>
      <Alert variant="warning" title="">
        New GST changes won&apos;t affect bike insurance prices
      </Alert>
    </div>
  );
}
