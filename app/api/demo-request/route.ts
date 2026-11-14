import { NextResponse } from "next/server";
import { toE164, validateDemoRequest } from "@/lib/lead";

/**
 * POST /api/demo-request
 *
 * Validates the demo form, filters obvious bots, then forwards the lead to the
 * n8n webhook. n8n owns the rest of the pipeline:
 *   1. Upsert the contact in HubSpot
 *   2. Send the prospect a confirmation email via Resend
 *   3. Send the LoopLeads team an internal "new demo request" email via Resend
 *
 * Env:
 *   N8N_WEBHOOK_URL     Production URL of the n8n Webhook node
 *   N8N_WEBHOOK_SECRET  Shared secret, checked by the workflow's first IF node
 */

export const runtime = "nodejs";

const MIN_FILL_MS = 2500; // humans don't finish five fields in under 2.5s
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>(); // best-effort, per serverless instance

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "We couldn't read that request. Refresh the page and try again." }, { status: 400 });
  }

  // Honeypot + timing trap: pretend success so bots learn nothing.
  const startedAt = Number(body.startedAt);
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }
  if (Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests from this connection. Wait a few minutes and try again." },
      { status: 429 },
    );
  }

  const { data, errors } = validateDemoRequest(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, message: "Check the highlighted fields.", errors }, { status: 422 });
  }

  const meta = (typeof body.meta === "object" && body.meta !== null ? body.meta : {}) as Record<string, unknown>;
  const str = (v: unknown, max = 300) => (typeof v === "string" ? v.slice(0, max) : "");

  const payload = {
    event: "demo_request.created",
    submittedAt: new Date().toISOString(),
    lead: { ...data, phoneE164: toE164(data.phone) },
    source: {
      site: "loopleads.app",
      form: "vsl-demo-request",
      pageUrl: str(meta.pageUrl),
      referrer: str(meta.referrer),
      utm: {
        source: str(meta.utm_source, 100),
        medium: str(meta.utm_medium, 100),
        campaign: str(meta.utm_campaign, 100),
        term: str(meta.utm_term, 100),
        content: str(meta.utm_content, 100),
      },
      watchedVideo: meta.watchedVideo === true,
    },
  };

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[demo-request] N8N_WEBHOOK_URL not set — dev mode, lead not forwarded:", payload);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[demo-request] N8N_WEBHOOK_URL is not configured");
    return NextResponse.json(
      { ok: false, message: "Demo requests aren't being accepted right now. Try again shortly." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-loopleads-secret": process.env.N8N_WEBHOOK_SECRET ?? "",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12_000),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[demo-request] n8n responded", res.status, await res.text().catch(() => ""));
      throw new Error(`n8n ${res.status}`);
    }
  } catch (err) {
    console.error("[demo-request] forward failed", err);
    return NextResponse.json(
      { ok: false, message: "Your request didn't go through. Check your connection and select “Show me the demo” again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
