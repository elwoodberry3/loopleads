/** Shared demo-request validation (used by the form and the API route). */

export type DemoRequest = {
  firstName: string;
  businessName: string;
  email: string;
  phone: string;
  serviceType: string;
  plan: "unsure" | "light" | "core";
  marketingOptIn: boolean;
};

export type FieldErrors = Partial<Record<keyof DemoRequest, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

/** Formats a US number as (555) 010-1234 while typing. */
export function formatUsPhone(value: string) {
  let d = digitsOnly(value);
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/** E.164 for HubSpot, e.g. +15550101234. Returns "" if not a 10-digit US number. */
export function toE164(value: string) {
  let d = digitsOnly(value);
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  return d.length === 10 ? `+1${d}` : "";
}

const clean = (v: unknown, max = 120) => (typeof v === "string" ? v.trim().replace(/\s+/g, " ").slice(0, max) : "");

export function validateDemoRequest(input: Record<string, unknown>): {
  data: DemoRequest;
  errors: FieldErrors;
} {
  const plan = clean(input.plan, 10);
  const data: DemoRequest = {
    firstName: clean(input.firstName, 60),
    businessName: clean(input.businessName, 120),
    email: clean(input.email, 160).toLowerCase(),
    phone: clean(input.phone, 30),
    serviceType: clean(input.serviceType, 60),
    plan: plan === "light" || plan === "core" ? plan : "unsure",
    marketingOptIn: input.marketingOptIn === true || input.marketingOptIn === "on" || input.marketingOptIn === "true",
  };

  const errors: FieldErrors = {};
  if (!data.firstName) errors.firstName = "Enter your first name.";
  if (!data.businessName) errors.businessName = "Enter your business name.";
  if (!data.email) errors.email = "Enter your business email.";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Enter an email like name@yourbusiness.com.";
  if (!data.phone) errors.phone = "Enter your business phone number.";
  else if (!toE164(data.phone)) errors.phone = "Enter a 10-digit US phone number.";
  if (!data.serviceType) errors.serviceType = "Choose the type of service business you run.";

  return { data, errors };
}
