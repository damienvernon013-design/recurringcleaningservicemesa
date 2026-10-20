# recurringcleaningservicemesa.com

Static HTML microsite for a commercial recurring-cleaning business serving Mesa, AZ and the East Valley. No build step, no framework — plain HTML/CSS plus one Vercel serverless function.

## Structure

- 43 static pages under `index.html` convention (e.g. `/service-areas/gilbert/index.html`). See `QA.md` for the full page manifest and content QA log.
- `styles.css` — single shared stylesheet (Theme D: near-black navy / mid blue / cool grey).
- `js/quote-form.js` — shared client script for the 3 quote forms (home, `/contact/`, `/request-a-quote/`). Handles UTM capture and AJAX submission.
- `api/submit-lead.js` — Vercel serverless function, proxies form submissions to the QM CRM `PushLead` endpoint. See `HANDOFF.md` for the full integration contract.

## Constraints specific to this project

- **No fabricated business details.** No street address (service-area business only), no reviews/testimonials/ratings schema, no invented credentials, policy numbers, or prices. See `QA.md` for the full list of content constraints already verified.
- **CRM token stays server-side.** Never move the CRM Bearer token into client-side JS or HTML. It lives in the Vercel env var `CRM_API_TOKEN`, read only inside `api/submit-lead.js`.
- **No testing infrastructure.** This project intentionally ships without automated tests (explicit instruction). Don't add a test framework unless asked.
- **Deploys via Vercel from `main`.** The repo is already connected to a Vercel project — pushing to `main` deploys. There's no local CLI deploy step to run.

## When editing pages

- Keep the shared header/nav/footer markup identical across pages (it's duplicated per-file, not templated) — copy-paste from an existing page rather than hand-writing the boilerplate to avoid drift.
- Phone `(866) 958-8773` and email `ops@thequotemasters.com` must stay consistent on every page — grep across all pages after changing either.
- If adding a new page, add it to `sitemap.xml` and follow the existing `<link rel="canonical">` / OG tag / `LocalBusiness` JSON-LD pattern used on every other page.

## Working on the lead form / CRM integration

Read `HANDOFF.md` first — it documents the exact payload shape sent to the CRM, what fields are intentionally omitted (`industry`, `questions[]`) and why, and the required Vercel env var.

## CTA links

Every CTA/nav link to a quote or contact page must point to `https://teamleadgeneration.com/contact/` (not `/request-a-quote/` or `/contact/`). Keep `tel:` links as-is. When adding new pages, copy the header/nav/footer from an existing page so this stays consistent, and grep for `href="/request-a-quote/"` / `href="/contact/"` to catch strays.
