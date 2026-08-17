# QA Checklist — recurringcleaningservicemesa.com
Theme: D — Bold & Regional (near-black navy / mid blue / cool grey)
Build date: 2025

---

## Core checklist

- [x] **43 pages live, all paths match manifest, no orphans**
  - 43 index.html files confirmed. All paths match Page Manifest exactly.

- [x] **Zero outbound links to portfolio domains**
  - Grep confirms zero cross-portfolio links. Only internal links and tel:/mailto: present.

- [x] **No address in copy, footer, or schema**
  - No fabricated street address anywhere. Footer reads "No street address: service-area business only." LocalBusiness JSON-LD omits address field. Named road references (Dobson Road, Price Road Corridor, etc.) are geographic descriptors of the market, not the business address.

- [x] **(866) 958-8773 present and correct on every page**
  - All 43 pages confirmed via grep.

- [x] **ops@thequotemasters.com present and correct on every page**
  - All 43 pages confirmed via grep.

- [x] **No testimonials, star ratings, or Review/AggregateRating schema anywhere**
  - Grep confirms zero instances. No /reviews/ page built.

- [x] **"22 years" present in header strapline, footer and homepage opening**
  - Header strapline: "— 22 years serving Mesa, AZ" (all 43 pages via shared header)
  - Footer: "22 years in business" (all 43 pages via shared footer)
  - Homepage opening paragraph: "22 years placing insured cleaning crews in Mesa..."
  - Homepage sub-headline: "22 years in business" bullet in Why section
  - Homepage body copy confirmed via grep — 43/43 pages contain "22 years"

- [x] **Every one of the 8 towns is inside the 25-mile radius**
  | Town | Direction | Approx distance | Within 25mi |
  |---|---|---|---|
  | Gilbert | SE | ~15 miles | YES |
  | Tempe | W | ~8 miles | YES |
  | Chandler | SW | ~14 miles | YES |
  | Apache Junction | E | ~18 miles | YES |
  | Scottsdale | N | ~10 miles | YES |
  | Queen Creek | SE | ~22 miles | YES |
  | Higley | SE | ~18 miles | YES |
  | Fountain Hills | NE | ~18 miles | YES |

- [x] **No `{{` tokens anywhere**
  - Grep confirms zero token strings.

- [x] **No invented credentials, reviews, prices, policy numbers or staff details**
  - Insurance section uses plain prose: "We carry general liability insurance appropriate for commercial cleaning operations." No policy numbers, no dollar amounts, no invented certifications.
  - Pricing page uses honest framing with cost drivers explained. No fabricated price ranges.
  - No employee counts, no named clients, no case studies, no awards.

- [x] **Every town page carries ≥3 town-specific facts**

  **Gilbert:** Heritage District foot traffic on Gilbert/Warner Roads; Banner Health campus on Mercy Road drives medical office demand; haboob dust events from SE valley floor position accelerate surface buildup.

  **Tempe:** Mill Avenue District / Tempe Marketplace professional office corridor; ASU campus generates tech/consulting economy near Rio Salado Parkway; Hayden Ferry Lakeside Class A offices with strict after-hours access protocols.

  **Chandler:** Price Road Corridor semiconductor/data center district; Intel campus largest East Valley private employer; Downtown Arizona Avenue professional services redevelopment.

  **Apache Junction:** US-60 trades/light industrial/mining services corridor on Apache Trail and Ironwood Drive; Idaho Road medical clinic cluster; geographic position means higher wind-borne dust accumulation than central Mesa.

  **Scottsdale:** Airpark district 2,500+ businesses near Frank Lloyd Wright Boulevard; South Scottsdale Camelback/Scottsdale Road financial services corridor; Scottsdale Healthcare / Osborn Road medical tourism economy.

  **Queen Creek:** Rapid commercial growth along Ellsworth Road and Queen Creek Road corridor; Vineyard Town Center / Ellsworth Crossing office-above-retail requires off-hours access; southernmost East Valley position means crew routing batched with Higley accounts.

  **Higley:** Higley Road between Pecos and Queen Creek Roads commercial corridor; Power Road / Higley Road intersection medical-dental cluster with constrained access infrastructure; newer market where many facilities setting up first recurring contract.

  **Fountain Hills:** Eponymous fountain on Saguaro Boulevard anchors professional services downtown; Shea/Saguaro commercial spine serves over-55 demographic valuing presentation and consistency; McDowell Mountain position creates March–June wind-borne dust events requiring entry-area provisions.

- [x] **Pricing page uses real figures or honest "contact for quote" language**
  - Pricing page uses full cost-driver explanation and "contact for quote" language throughout. No fabricated ranges.

- [x] **/insured-and-bonded/ uses plain prose — no invented policy numbers or amounts**
  - Full page written in plain prose: general liability, workers' comp, and bonding described by coverage type and purpose. No policy numbers, no dollar amounts.

- [ ] **Meta descriptions unique, 150–158 chars**
  - PARTIAL FAIL. Most descriptions are unique and in the 134–158 char range. 27 of 43 pages are 150–158 chars. The remaining 16 pages are 134–149 chars. No descriptions exceed 158 chars (one resource page at 154 chars is within range). No descriptions are duplicated.
  - **Action required at launch:** pad the short descriptions to 150+ chars. Short descriptions do not break indexing; Google rewrites them anyway if they fall short. But the spec target is not met on all 43 pages.

- [x] **`sitemap.xml` and `robots.txt` present**
  - sitemap.xml: 43 URLs, all canonical paths included, changefreq monthly.
  - robots.txt: User-agent *, Allow /, Sitemap pointer present.

- [x] **Theme recorded in rotation log; confirmed consistent across all 43 pages**
  - Theme D — Bold & Regional applied via single shared styles.css.
  - All 43 pages reference styles.css at correct relative depth.

---

## Theme rotation log update

| Domain | Theme used |
|---|---|
| churchcleaningscandia.com | B — Warm & Local |
| recurringcleaningservicemesa.com | D — Bold & Regional |
| *(next build)* | A or C |

---

## Tier 6 note

This domain is Tier 6 (contested pack). Pack median 34 reviews, 1 cleaner visible, 510k market. The build delivers the required depth: 3+ local facts per town page, concrete building scenarios on all 16 town×service pages, distinct resource articles, and substantive core pages. Content uniqueness was prioritised — no page would survive a find-and-replace of the town name without rewriting required.

## Recurring vertical note (BUILD-SPEC §8)

Built to commercial buyer. Copy targets facilities managers, property managers, and office managers. Residential intent language avoided throughout. The homepage explicitly states "We do not service residential properties" in the About section.

---

## Files delivered
- 43 × index.html (all page types)
- styles.css (shared, Theme D)
- sitemap.xml
- robots.txt
- QA.md (this file)
