import type { BikeJourneyState } from "../context/BikeJourneyContext";

export type AddonKey = keyof BikeJourneyState["addons"];

export const ADDON_BREAKUP_LINES: Array<{ key: AddonKey; label: string; price: number }> = [
  { key: "zeroDep", label: "Zero Depreciation Cover (1 year)", price: 36 },
  { key: "pa", label: "Personal Accident Cover (1 year)", price: 350 },
  { key: "pillion", label: "Pillion Rider Cover (1 year)", price: 100 },
  { key: "roadsideAssist", label: "Roadside Assistance (1 year)", price: 150 },
  { key: "engineProtect", label: "Engine Protection Cover (1 year)", price: 200 },
  { key: "consumables", label: "Consumables Cover (1 year)", price: 75 },
];
