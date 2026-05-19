"use client";

import { BikeJourneyProvider } from "@/context/BikeJourneyContext";
import { BikeJourneySheets } from "./BikeJourneySheets";

export function BikeJourneyClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BikeJourneyProvider>
      <div className="w-full mx-auto min-h-dvh relative pt-[var(--space-4)] pb-[var(--space-4)] max-w-[var(--layout-journey-max-width)] bg-[var(--color-card-elevated-bg)]">
        {children}
        <BikeJourneySheets />
      </div>
    </BikeJourneyProvider>
  );
}
