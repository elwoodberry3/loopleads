"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { form as copy } from "@/lib/content";
import { formatUsPhone, validateDemoRequest, type DemoRequest, type FieldErrors } from "@/lib/lead";
import { CheckIcon } from "./Icons";

type Status = "idle" | "submitting" | "success" | "error";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export function DemoForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState<DemoRequest["plan"]>("unsure");
  const [sentTo, setSentTo] = useState("");
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    // Keep UTM params for the whole visit, even after in-page navigation.
    try {
      const params = new URLSearchParams(window.location.search);
      UTM_KEYS.forEach((k) => {
        const v = params.get(k);
        if (v) sessionStorage.setItem(k, v);
      });
    } catch {}
    const onPlan = (e: Event) => {
      const v = (e as CustomEvent<string>).detail;
      if (v === "light" || v === "core") setPlan(v);
    };
    window.addEventListener("loopleads:plan", onPlan);
    return () => window.removeEventListener("loopleads:plan", onPlan);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries()) as Record<string, unknown>;
    raw.marketingOptIn = fd.get("marketingOptIn") === "on";

    const { errors: found } = validateDemoRequest(raw);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("error");
      setMessage("Check the highlighted fields.");
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setMessage("");
    const ss = (k: string) => {
      try {
        return sessionStorage.getItem(k) ?? "";
      } catch {
        return "";
      }
    };

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...raw,
          startedAt: startedAt.current,
          meta: {
            pageUrl: window.location.href,
            referrer: document.referrer,
            watchedVideo: ss("ll_watched") === "1",
            ...Object.fromEntries(UTM_KEYS.map((k) => [k, ss(k)])),
          },
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: FieldErrors };
      if (!res.ok || !json.ok) {
        setErrors(json.errors ?? {});
        setStatus("error");
        setMessage(json.message ?? "Your request didn't go through. Try again.");
        return;
      }
      setSentTo(String(raw.email ?? ""));
      setStatus("success");
      (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: "demo_request_submitted", plan });
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch {
      setStatus("error");
      setMessage("Your request didn't go through. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div ref={resultRef} tabIndex={-1} className="rounded-[16px] bg-white p-7 text-navy-900 outline-none sm:p-9" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-orange-500 text-navy-900">
          <CheckIcon className="size-7" />
        </span>
        <h3 className="type-h2 mt-6 !text-[2rem]">{copy.successTitle}</h3>
        <p className="mt-3 text-lg leading-relaxed">
          {copy.successBody.split("{email}")[0]}
          <strong className="[overflow-wrap:anywhere]">{sentTo}</strong>
          {copy.successBody.split("{email}")[1]}
        </p>
      </div>
    );
  }

  const field = (name: keyof DemoRequest) => ({
    name,
    id: `f-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `f-${name}-err` : undefined,
  });
  const err = (name: keyof DemoRequest) =>
    errors[name] ? (
      <p id={`f-${name}-err`} className="mt-1.5 text-base font-semibold text-error-600">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative rounded-[16px] bg-white p-6 text-navy-900 sm:p-9">
      <h3 className="type-h3 !text-[1.6rem] leading-tight [font-stretch:110%]">{copy.headline}</h3>
      <p className="mt-2 text-base leading-relaxed text-slate-500">{copy.description}</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-firstName" className="field-label">
            First name
          </label>
          <input {...field("firstName")} data-autofocus autoComplete="given-name" className="field-input" required />
          {err("firstName")}
        </div>
        <div>
          <label htmlFor="f-businessName" className="field-label">
            Business name
          </label>
          <input {...field("businessName")} autoComplete="organization" className="field-input" required />
          {err("businessName")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-email" className="field-label">
            Business email
          </label>
          <input {...field("email")} type="email" inputMode="email" autoComplete="email" className="field-input" required />
          {err("email")}
        </div>
        <div>
          <label htmlFor="f-phone" className="field-label">
            Business phone number
          </label>
          <input
            {...field("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="(555) 010-1234"
            value={phone}
            onChange={(e) => setPhone(formatUsPhone(e.target.value))}
            className="field-input tabular-nums"
            required
          />
          {err("phone")}
        </div>
        <div>
          <label htmlFor="f-serviceType" className="field-label">
            Type of service business
          </label>
          <select {...field("serviceType")} defaultValue="Junk removal" className="field-input" required>
            {copy.serviceTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          {err("serviceType")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-plan" className="field-label">
            Which option are you curious about? <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <select
            {...field("plan")}
            value={plan}
            onChange={(e) => setPlan(e.target.value as DemoRequest["plan"])}
            className="field-input"
          >
            {copy.planOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-base leading-snug">
        <input type="checkbox" name="marketingOptIn" className="mt-0.5 size-5 shrink-0 accent-navy-900" />
        <span>Also send me occasional LoopLeads updates by email. You can unsubscribe any time.</span>
      </label>

      <button type="submit" className="btn btn-primary mt-7 w-full text-lg" disabled={status === "submitting"}>
        {status === "submitting" ? copy.submitting : copy.submit}
      </button>

      <div aria-live="assertive" className="min-h-0">
        {status === "error" && message && <p className="mt-4 text-base font-semibold text-error-600">{message}</p>}
      </div>

      <p className="mt-5 text-sm leading-relaxed text-ink-muted">{copy.privacy}</p>
    </form>
  );
}
