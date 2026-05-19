export type MoreDetailsFieldKey = "fullName" | "email" | "pincode";

export type MoreDetailsErrors = Partial<Record<MoreDetailsFieldKey, string>>;

export interface MoreDetailsFormValues {
  fullName: string;
  email: string;
  pincode: string;
}

/** Requires @ and at least one dot in the domain part (after @). */
export function isValidEmailFormat(email: string): boolean {
  const t = email.trim();
  const at = t.indexOf("@");
  if (at <= 0) return false;
  const domain = t.slice(at + 1);
  if (!domain.includes(".")) return false;
  return true;
}

export function validateMoreDetails(values: MoreDetailsFormValues): {
  ok: boolean;
  errors: MoreDetailsErrors;
} {
  const errors: MoreDetailsErrors = {};

  if (values.fullName.trim().length === 0) {
    errors.fullName = "Enter your full name";
  }

  const emailTrim = values.email.trim();
  if (emailTrim.length === 0) {
    errors.email = "Enter your email address";
  } else if (!isValidEmailFormat(values.email)) {
    errors.email = "Enter a valid email (include @ and a domain like .com)";
  }

  if (values.pincode.length < 6) {
    errors.pincode = "Enter a 6-digit pincode";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
  };
}
