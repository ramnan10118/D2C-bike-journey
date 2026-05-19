"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "bikeJourneyState";

type PersistedState = Omit<BikeJourneyState, "sheet">;

function loadPersistedState(): Partial<PersistedState> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<PersistedState>) : {};
  } catch {
    return {};
  }
}

function savePersistedState(state: BikeJourneyState): void {
  try {
    const { sheet: _sheet, ...rest } = state;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  } catch {}
}

export type OverlaySheet =
  | "findBike"
  | "idv"
  | "premium"
  | "planDetailsComprehensive"
  | "planDetailsThirdParty"
  | "whyThirdParty5Year"
  | "whyComprehensive"
  | null;
export type PlanId = "comprehensive" | "thirdparty";

export const IDV_MIN = 9540;
export const IDV_MAX = 17720;
export const IDV_DEFAULT = 13632;

export const BIKE_RESULTS = [
  "Honda CB Shine 125CC",
  "Honda Activa 110CC",
  "Honda Activa 5G 110CC",
  "Honda Dio 124CC",
  "Honda SP 125 125CC",
] as const;

export interface BikeJourneyState {
  sheet: OverlaySheet;
  bikeBrandModel: string;
  registrationYear: number;
  plan: PlanId;
  idv: number;
  addons: {
    zeroDep: boolean;
    pa: boolean;
    pillion: boolean;
    roadsideAssist: boolean;
    engineProtect: boolean;
    consumables: boolean;
  };
  fullName: string;
  email: string;
  pincode: string;
  gst: string;
}

const initial: BikeJourneyState = {
  sheet: null,
  bikeBrandModel: "",
  registrationYear: 2026,
  plan: "comprehensive",
  idv: IDV_DEFAULT,
  addons: {
    zeroDep: false,
    pa: false,
    pillion: false,
    roadsideAssist: false,
    engineProtect: false,
    consumables: false,
  },
  fullName: "",
  email: "",
  pincode: "",
  gst: "",
};

export const THIRD_PARTY_PREMIUM = 3851;
export const OWN_DAMAGE_PREMIUM = 173;
export const PLAN_COUPON_AMOUNT = 150;

export function netPremiumBeforeGst(plan: PlanId): number {
  if (plan === "comprehensive") {
    return THIRD_PARTY_PREMIUM + OWN_DAMAGE_PREMIUM - PLAN_COUPON_AMOUNT;
  }
  return THIRD_PARTY_PREMIUM;
}

export function addonTotal(addons: BikeJourneyState["addons"]): number {
  let t = 0;
  if (addons.zeroDep) t += 36;
  if (addons.pa) t += 350;
  if (addons.pillion) t += 100;
  if (addons.roadsideAssist) t += 150;
  if (addons.engineProtect) t += 200;
  if (addons.consumables) t += 75;
  return t;
}

export function footerDisplayAmount(
  state: Pick<BikeJourneyState, "plan" | "addons">
): number {
  return netPremiumBeforeGst(state.plan) + addonTotal(state.addons);
}

export function gstAmount(
  state: Pick<BikeJourneyState, "plan" | "addons">
): number {
  return Math.round(footerDisplayAmount(state) * 0.18);
}

export function totalInclGst(
  state: Pick<BikeJourneyState, "plan" | "addons">
): number {
  return footerDisplayAmount(state) + gstAmount(state);
}

interface BikeJourneyContextValue extends BikeJourneyState {
  setSheet: (sheet: OverlaySheet) => void;
  setBikeBrandModel: (v: string) => void;
  setPlan: (p: PlanId) => void;
  setIdv: (n: number) => void;
  setAddons: (a: Partial<BikeJourneyState["addons"]>) => void;
  setFullName: (v: string) => void;
  setEmail: (v: string) => void;
  setPincode: (v: string) => void;
  setGst: (v: string) => void;
}

const BikeJourneyContext = createContext<BikeJourneyContextValue | null>(null);

export function BikeJourneyProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BikeJourneyState>(initial);

  // Restore persisted state on mount (client-only; sessionStorage survives refresh)
  useEffect(() => {
    const persisted = loadPersistedState();
    if (Object.keys(persisted).length > 0) {
      setState((s) => ({ ...s, ...persisted, sheet: null }));
    }
  }, []);

  // Persist on every change, excluding ephemeral sheet state
  useEffect(() => {
    savePersistedState(state);
  }, [state]);

  const setSheet = useCallback((sheet: OverlaySheet) => {
    setState((s) => ({ ...s, sheet }));
  }, []);

  const setBikeBrandModel = useCallback((bikeBrandModel: string) => {
    setState((s) => ({ ...s, bikeBrandModel }));
  }, []);

  const setPlan = useCallback((plan: PlanId) => {
    setState((s) => ({ ...s, plan }));
  }, []);

  const setIdv = useCallback((idv: number) => {
    setState((s) => ({ ...s, idv }));
  }, []);

  const setAddons = useCallback((a: Partial<BikeJourneyState["addons"]>) => {
    setState((s) => ({ ...s, addons: { ...s.addons, ...a } }));
  }, []);

  const setFullName = useCallback((fullName: string) => {
    setState((s) => ({ ...s, fullName }));
  }, []);

  const setEmail = useCallback((email: string) => {
    setState((s) => ({ ...s, email }));
  }, []);

  const setPincode = useCallback((pincode: string) => {
    setState((s) => ({ ...s, pincode }));
  }, []);

  const setGst = useCallback((gst: string) => {
    setState((s) => ({ ...s, gst }));
  }, []);

  const value = useMemo<BikeJourneyContextValue>(
    () => ({
      ...state,
      setSheet,
      setBikeBrandModel,
      setPlan,
      setIdv,
      setAddons,
      setFullName,
      setEmail,
      setPincode,
      setGst,
    }),
    [
      state,
      setSheet,
      setBikeBrandModel,
      setPlan,
      setIdv,
      setAddons,
      setFullName,
      setEmail,
      setPincode,
      setGst,
    ]
  );

  return (
    <BikeJourneyContext.Provider value={value}>
      {children}
    </BikeJourneyContext.Provider>
  );
}

export function useBikeJourney(): BikeJourneyContextValue {
  const ctx = useContext(BikeJourneyContext);
  if (!ctx)
    throw new Error("useBikeJourney must be used within BikeJourneyProvider");
  return ctx;
}
