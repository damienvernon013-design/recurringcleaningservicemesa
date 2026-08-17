# Handoff — recurringcleaningservicemesa.com

Static microsite, 43 pages, no build step. Deploys on Vercel (repo already connected — push to `main` to deploy).

## What's in this repo

- 43 `index.html` pages (home, core pages, 8 town pages × 3 variants each, resources, services) + shared `styles.css`.
- `api/submit-lead.js` — Vercel serverless function that proxies lead form submissions to the QM CRM (`PushLead`). Keeps the CRM Bearer token server-side only.
- `js/quote-form.js` — client script used by the three quote forms (`/`, `/contact/`, `/request-a-quote/`). Captures UTM params from the URL, persists them in `localStorage` so they survive multi-page sessions, and submits the form via `fetch` to `/api/submit-lead` instead of a plain HTML POST.
- `vercel.json` — clean URLs / trailing slash config.

## Contact form / CRM integration

- Forms POST as JSON to `/api/submit-lead` (same-origin serverless function), not directly to the CRM — the CRM requires a Bearer token that must never reach the browser.
- The function reads `CRM_API_TOKEN` from the Vercel project's environment variables and forwards to `https://thequotemasters.com/crm_api/api.php?action=push_lead`.
- **Required env var in Vercel:** `CRM_API_TOKEN` — set this in Project Settings → Environment Variables (Production + Preview) before launch. Without it, submissions fail with a 500.
- Fields sent: `customer` (name split into first/last, company, phone, email, notes), `zip`, `number_of_quotes: "1"`, `utm_source`.
- `industry` and `questions[]` (CRM question/answer ID mapping) are intentionally **not sent** — QM did not supply the actual industry code or question/answer IDs for this vertical, and the API doc's example values looked like documentation placeholders, not real config. Sending guessed IDs risked corrupting CRM data. Confirm the correct `industry` code and `questions[]` mapping with QM, then add them to `api/submit-lead.js`.
- Server-side validation: name, company, and phone (10+ digits) are required; zip is validated against a 5-digit pattern before being sent (blank if invalid).

## UTM tracking

- `js/quote-form.js` reads `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` from the landing URL's query string on page load.
- If present, they're saved to `localStorage` (`qm_utm`) so a visitor who lands on a campaign URL, then browses to another page before converting, still gets attributed correctly.
- On submit, `utm_source` is sent as-is if present; otherwise it falls back to `utm_medium/utm_campaign` joined, so paid/organic traffic without an explicit `utm_source` param still carries some attribution. If none of the UTM params are present, an empty string is sent (per the CRM's documented optional field).

## Testing status

- **No automated tests exist and none were added** — per instruction, this was a no-testing build.
- Manual verification still needed before launch:
  - Submit each of the 3 forms locally against a `vercel dev` instance with `CRM_API_TOKEN` set, confirm a 200 and that the lead lands in the CRM.
  - Submit with a UTM query string on the landing page, then navigate to a different page, then submit — confirm `utm_source` is still populated.
  - Submit with missing/invalid required fields, confirm the API rejects with 400 and the form shows the fallback "call us" message.

## Deployment

- Repo is already connected to Vercel — pushing to `main` triggers a deploy. No CLI steps needed here.
- Before going live, set `CRM_API_TOKEN` in Vercel env vars (see above). This is the only manual step required post-push.

## Status: READY TO LAUNCH

All placeholder/token scans came back clean (no `{{` tokens, no lorem ipsum, no TODO/TBD markers). Contact form, request-a-quote form, and homepage quote form are wired to the CRM proxy with UTM capture. `CRM_API_TOKEN` has been set in Vercel. Follow up with QM on the correct `industry`/`questions[]` values if that data should be captured going forward.
