import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type JourneyStep = 1 | 3 | 5 | 6 | 8 | 9;
export type OverlaySheet = "findBike" | "idv" | "premium" | null;
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
  step: JourneyStep;
  sheet: OverlaySheet;
  bikeBrandModel: string;
  registrationYear: number;
  /** Defaults to comprehensive; user can switch on Select plan (step 3). */
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
  step: 1,
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

/** Net premium before GST (matches premium breakup net line). */
export function netPremiumBeforeGst(plan: PlanId): number {
  if (plan === "comprehensive") return 3874;
  return 3851;
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

/** Display total for footers (net + addons; coupon baked into plan net on comprehensive). */
export function footerDisplayAmount(state: Pick<BikeJourneyState, "plan" | "addons">): number {
  return netPremiumBeforeGst(state.plan) + addonTotal(state.addons);
}

/** Review / pay: incl. GST (demo fixed to match design). */
export const TOTAL_INCL_GST = 4571;

interface BikeJourneyContextValue extends BikeJourneyState {
  setSheet: (sheet: OverlaySheet) => void;
  setStep: (step: JourneyStep) => void;
  setBikeBrandModel: (v: string) => void;
  setPlan: (p: PlanId) => void;
  setIdv: (n: number) => void;
  setAddons: (a: Partial<BikeJourneyState["addons"]>) => void;
  setFullName: (v: string) => void;
  setEmail: (v: string) => void;
  setPincode: (v: string) => void;
  setGst: (v: string) => void;
  goNext: () => void;
  goBack: () => void;
}

const BikeJourneyContext = createContext<BikeJourneyContextValue | null>(null);

export function BikeJourneyProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BikeJourneyState>(initial);

  const setSheet = useCallback((sheet: OverlaySheet) => {
    setState((s) => ({ ...s, sheet }));
  }, []);

  const setStep = useCallback((step: JourneyStep) => {
    setState((s) => ({ ...s, step }));
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

  const goNext = useCallback(() => {
    setState((s) => {
      const { step } = s;
      if (step === 1) return { ...s, step: 3 as JourneyStep };
      if (step === 3) return { ...s, step: 5 as JourneyStep };
      if (step === 5) return { ...s, step: 6 as JourneyStep };
      if (step === 6) return { ...s, step: 8 as JourneyStep };
      if (step === 8) return { ...s, step: 9 as JourneyStep };
      return s;
    });
  }, []);

  const goBack = useCallback(() => {
    setState((s) => {
      const { step } = s;
      if (step === 9) return { ...s, step: 8 };
      if (step === 8) return { ...s, step: 6 };
      if (step === 6) return { ...s, step: 5 };
      if (step === 5) return { ...s, step: 3 };
      if (step === 3) return { ...s, step: 1 };
      return s;
    });
  }, []);

  const value = useMemo<BikeJourneyContextValue>(
    () => ({
      ...state,
      setSheet,
      setStep,
      setBikeBrandModel,
      setPlan,
      setIdv,
      setAddons,
      setFullName,
      setEmail,
      setPincode,
      setGst,
      goNext,
      goBack,
    }),
    [
      state,
      setSheet,
      setStep,
      setBikeBrandModel,
      setPlan,
      setIdv,
      setAddons,
      setFullName,
      setEmail,
      setPincode,
      setGst,
      goNext,
      goBack,
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
  if (!ctx) throw new Error("useBikeJourney must be used within BikeJourneyProvider");
  return ctx;
}
