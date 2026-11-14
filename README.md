# LoopLeads — pilot VSL landing page

Missed-call lead recovery for small junk removal crews. This is the video sales letter (VSL) landing page used to validate the founding-customer pilot before the full platform launches at **loopleads.app**.

**Stack:** Next.js 16 (App Router) · Tailwind CSS 4 · Vercel · n8n · HubSpot · Resend

```
Visitor fills the demo form
        │
        ▼
/api/demo-request  (Next.js on Vercel)
  • validates fields, formats phone to E.164
  • blocks bots (honeypot, fill-time check, rate limit)
  • adds UTM params, page URL, "watched video" flag
        │  POST + x-loopleads-secret header
        ▼
n8n workflow  (n8n/loopleads-demo-request.workflow.json)
  1. Secret valid?          → 401 if not
  2. Build payloads         → escapes input, builds HubSpot body + both emails
  3. HubSpot: upsert contact (by email, lead status NEW)
  4. Resend: confirm to prospect
  5. Resend: alert the team
  6. Respond OK
```

Steps 3–5 keep going if one of them fails, so a HubSpot hiccup never costs you the alert email. Failed steps still show in n8n's execution log.

---

## Run it locally

```bash
npm install
cp .env.example .env.local     # leave N8N_WEBHOOK_URL empty to test the form without n8n
npm run dev                     # http://localhost:3000
```

With `N8N_WEBHOOK_URL` empty in dev, form submissions succeed and the lead is printed to the terminal instead of being sent. In production, an empty URL returns a clear "not accepting requests right now" error, so leads are never silently dropped.

## Deploy to Vercel

1. Import `elwoodberry3/loopleads` in Vercel (framework preset: Next.js, no build settings to change).
2. Add the environment variables from `.env.example`.
3. Add the `loopleads.app` domain under **Settings → Domains**.

## Set up n8n, HubSpot and Resend

**HubSpot**
1. Settings → Integrations → **Private Apps** → Create. Scopes: `crm.objects.contacts.read`, `crm.objects.contacts.write`.
2. Copy the access token.

**Resend**
1. Add and verify the `loopleads.app` domain (DNS records in Vercel or your registrar).
2. Create an API key with "Sending access".

**n8n**
1. Workflows → **Import from file** → `n8n/loopleads-demo-request.workflow.json`.
2. **HubSpot: upsert contact** → Credential → *HubSpot App Token* → paste the private app token.
3. **Resend: confirm to prospect** → Credential → *Header Auth* → Name `Authorization`, Value `Bearer re_xxx`. Select the same credential on **Resend: alert the team**.
4. **Build payloads** → edit the four constants at the top: `FROM`, `REPLY_TO`, `TEAM_TO`, colors.
5. **Secret valid?** → replace `REPLACE_WITH_N8N_WEBHOOK_SECRET` with your `N8N_WEBHOOK_SECRET`.
6. Activate the workflow, copy the **Production URL** from the Webhook node into Vercel as `N8N_WEBHOOK_URL`, then redeploy.

**What lands in HubSpot:** email, first name, company, phone (E.164) and lead status `NEW`. Service type, plan interest, video view, marketing opt-in and UTMs go into the contact's **Message** field, so no custom properties are needed for the pilot. To report on them later, create custom contact properties and map them in **Build payloads**.

## Add the video

Set `NEXT_PUBLIC_VSL_VIDEO_URL` to an `.mp4` (Vercel Blob or Mux recommended), a YouTube link or a Vimeo link, then redeploy. Nothing loads from the video host until the visitor presses play. Until then, the poster says "Video coming soon" and opens the transcript (the Advertisement #1 script).

## Edit the copy

All page words live in `lib/content.ts`, sourced from *Landing Page Copy v1* and the *Video Script*. Change text there; the components only handle layout.

## Project map

| Path | What it is |
| --- | --- |
| `app/page.tsx` | The 11 landing-page sections + JSON-LD (SoftwareApplication, FAQPage) |
| `app/api/demo-request/route.ts` | Form endpoint → n8n |
| `app/globals.css` | Design tokens from the LoopLeads Design Token System |
| `components/` | Logo, video player, hero call strip, missed-call demo, demo form |
| `lib/content.ts` | All copy |
| `lib/lead.ts` | Shared validation + phone formatting |
| `n8n/` | Importable n8n workflow |

## Before going live

- [ ] Publish a privacy policy page and link it next to the form's privacy note.
- [ ] Set the real `FROM`, `REPLY_TO` and `TEAM_TO` addresses in n8n.
- [ ] Send one test submission and confirm the HubSpot contact plus both emails arrive.
- [ ] Add analytics (e.g. Vercel Analytics or GA4). The form already pushes a `demo_request_submitted` event to `window.dataLayer` if one exists.
