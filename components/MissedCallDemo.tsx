"use client";

import { useState } from "react";
import { demo } from "@/lib/content";
import { MailIcon, MissedIcon } from "./Icons";

/** Section 04 — the before/after toggle with the owner alert rendered as a work-order ticket. */
export function MissedCallDemo() {
  const [mode, setMode] = useState<"without" | "with">("with");

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-6">
        <div role="group" aria-label="Compare what happens" className="inline-flex rounded-[12px] bg-neutral-200 p-1.5">
          {(
            [
              ["without", "Without a recovery process", "Without"],
              ["with", "With LoopLeads", "With LoopLeads"],
            ] as const
          ).map(([value, label, short]) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
              className={`min-h-12 rounded-[9px] px-4 text-base font-bold transition-colors sm:px-5 ${
                mode === value ? "bg-navy-900 text-white" : "text-slate-500 hover:text-navy-900"
              }`}
            >
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{short}</span>
            </button>
          ))}
        </div>

        <div aria-live="polite" className="mt-8">
          {mode === "without" ? (
            <p className="measure text-xl leading-relaxed text-slate-500">{demo.without}</p>
          ) : (
            <ol className="space-y-5">
              {demo.withSteps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-navy-900 font-display text-base font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-lg leading-snug">{step}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <div className="lg:col-span-6">
        <div className="rounded-[18px] bg-neutral-200 p-4 sm:p-7">
          {mode === "without" ? (
            <div className="space-y-3" aria-label="Your phone's call log">
              <p className="px-1 text-base font-bold text-slate-500">Your phone, after the job</p>
              {["2:14 PM", "11:52 AM", "10:08 AM"].map((t) => (
                <div key={t} className="flex items-center justify-between rounded-[10px] bg-white px-4 py-3.5">
                  <span className="flex items-center gap-3">
                    <MissedIcon className="size-5 text-error-600" />
                    <span>
                      <span className="block font-bold">Unknown number</span>
                      <span className="block text-sm text-ink-muted">Missed call. No message.</span>
                    </span>
                  </span>
                  <span className="text-sm text-ink-muted">{t}</span>
                </div>
              ))}
              <p className="px-1 pt-2 text-base text-slate-500">Who wanted what? You'll have to call everyone back to find out.</p>
            </div>
          ) : (
            <div className="space-y-5">
              <figure className="rounded-[12px] bg-navy-900 p-5 text-white">
                <figcaption className="text-sm font-semibold text-ivory-500">What the caller hears</figcaption>
                <blockquote className="mt-2 text-lg leading-snug">“{demo.greeting}”</blockquote>
              </figure>

              <article className="ticket" aria-label="Example owner email alert">
                <header className="flex items-center justify-between gap-3 rounded-t-[6px] bg-orange-500 px-5 py-3 text-navy-900">
                  <span className="flex items-center gap-2 font-display text-base font-extrabold [font-stretch:112%] sm:text-lg">
                    <MailIcon className="size-5" />
                    New customer inquiry
                  </span>
                  <span className="whitespace-nowrap text-sm font-bold">{demo.alert.time}</span>
                </header>
                <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 px-5 py-5 text-base">
                  <dt className="text-ink-muted">Business</dt>
                  <dd className="font-bold">{demo.alert.business}</dd>
                  <dt className="text-ink-muted">Caller</dt>
                  <dd className="font-bold tabular-nums">{demo.alert.caller}</dd>
                  <dt className="text-ink-muted">Time</dt>
                  <dd className="font-bold tabular-nums">{demo.alert.time}</dd>
                  <dt className="text-ink-muted">Inquiry</dt>
                  <dd className="font-bold">{demo.alert.inquiry}</dd>
                </dl>
                <div className="ticket-perf" aria-hidden />
                <p className="flex items-center justify-between gap-3 px-5 pb-5 pt-2 text-base">
                  <span className="text-ink-muted">Next step</span>
                  <span className="rounded-full bg-navy-900 px-3 py-1 text-sm font-bold text-white">{demo.alert.next}</span>
                </p>
              </article>
              <p className="text-sm italic text-ink-muted">{demo.disclaimer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
