"use client";

import type { ReactNode } from "react";

type Props = {
  /** Element id to scroll to (without #). */
  target: string;
  /** Optional plan to preselect in the demo form. */
  plan?: "light" | "core";
  className?: string;
  children: ReactNode;
};

/**
 * In-page CTA. Renders a real link (works without JS) and, with JS,
 * preselects a plan in the demo form and moves focus to the first field.
 */
export function ScrollButton({ target, plan, className, children }: Props) {
  return (
    <a
      href={`#${target}`}
      className={className}
      onClick={(e) => {
        const el = document.getElementById(target);
        if (!el) return;
        e.preventDefault();
        if (plan) window.dispatchEvent(new CustomEvent("loopleads:plan", { detail: plan }));
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        history.replaceState(null, "", `#${target}`);
        const focusable = el.querySelector<HTMLElement>("[data-autofocus]");
        if (focusable) window.setTimeout(() => focusable.focus({ preventScroll: true }), reduce ? 0 : 600);
      }}
    >
      {children}
    </a>
  );
}
