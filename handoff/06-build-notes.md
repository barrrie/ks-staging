# 06 — Build notes (stack, structure, SEO, deploy)

## Stack

The repo is already a static GitHub Pages site (`CNAME` → kindstrangerhq.com, favicon, og-image, wordmark in place). Stay static and dependency-light.

**Recommended: Eleventy (11ty).** Reasons: reusable header/footer/layout partials across 7 pages, and case studies become single data files that render both a card and a detail page. Outputs plain static HTML — deploys to GitHub Pages unchanged. Low ceremony, no client-side framework.

**Fallback (if Barrie prefers no build step):** hand-authored multi-page HTML, all sharing one `style.css`. Totally fine for 7 pages; just means copy-pasting the header/footer. Default to 11ty unless told otherwise.

**Do not** introduce React, Tailwind, or a heavy CMS. Vanilla JS only, and very little of it.

## Suggested file structure (11ty)

```
/
├── src/
│   ├── _includes/
│   │   ├── base.njk            # <head>, header, footer, meta
│   │   ├── header.njk
│   │   └── footer.njk
│   ├── _data/
│   │   └── site.json           # nav, email, social, positioning line
│   ├── index.njk               # Home (03)
│   ├── what-we-do.njk          # (04)
│   ├── reddit.njk              # (04)
│   ├── approach.njk            # (04)
│   ├── about.njk               # (04)
│   ├── start.njk               # (04)
│   ├── work/
│   │   ├── index.njk           # case index
│   │   └── cases/*.md          # one file per case → card + detail (deferred until real)
│   └── assets/
│       ├── style.css           # built from existing tokens (05)
│       ├── main.js             # tiny: nav toggle, status-line, reduced-motion
│       └── img/                # logo-wordmark.png, favicon, og-image (reuse existing)
├── .eleventy.js
├── CNAME                        # keep — kindstrangerhq.com
└── package.json
```

Keep existing assets: `logo-wordmark.png`, `favicon.png/.svg`, `og-image.png`, `CNAME`. The current single-page `index.html`/`style.css` become the starting point for the design system, not something to preserve as-is.

## Forms

`/start` form → **Formspree** (or Basin). Simple POST, no backend. Fields per `04`. Add honeypot + basic spam guard. Confirmation state should be human ("Got it — you'll hear from a person, usually within a day."). `[BARRIE: Formspree account / endpoint.]`

## SEO & meta (this is also where the quiet second argument lives structurally)

- Per-page `<title>` + meta description + canonical. OG/Twitter tags on every page (reuse `og-image.png`; make page-specific where it helps).
- **Clean semantic HTML** — proper headings, one H1/page, real landmarks. This is what makes content quotable and easy to summarize (the point of pillar 4, without naming it).
- **FAQ blocks with FAQ `JSON-LD`** on `/reddit` and `/what-we-do` (use the objection-handling Q&As from `01`). Structured, quotable Q&A is the single most useful on-page move for being repeated/summarized elsewhere — do it, just don't label it as "AEO" anywhere.
- **`Organization` JSON-LD** on the homepage (name, url, logo, sameAs socials).
- Sitemap.xml + robots.txt. Descriptive alt text. Fast (it's static — keep it that way; no heavy fonts, no trackers beyond Plausible).
- Write copy in plain, declarative sentences that answer real questions — good for humans, and good for the thing we're not naming.

## Analytics

**Plausible** (privacy-first, no cookie banner needed). `[BARRIE: account.]` If Barrie prefers GA4, note the added cookie-consent overhead.

## Accessibility

Run the `design:accessibility-review` skill before launch. Baseline in `05`. Non-negotiables: focus-visible states, `prefers-reduced-motion`, AA contrast (watch the accent), labeled forms.

## Deploy

- GitHub Pages, `main` branch (or `gh-pages` if 11ty builds to `_site` — configure the Pages source accordingly, or add a simple GitHub Action to build 11ty and publish `_site`).
- Keep `CNAME`. Confirm HTTPS is on in Pages settings.
- `[BARRIE: confirm the GitHub repo + whether DNS for kindstrangerhq.com is already pointed at Pages.]`

## Definition of done (v1 launch)

- All 7 routes build and are navigable; nav + footer consistent.
- Homepage matches `03` flow; community marketing is the frame, Reddit a beat inside it.
- Design system from `05` applied consistently; monochrome + single accent; dark mode works.
- No `[BARRIE]` placeholders visible to users — either filled with real data or gracefully hidden (esp. case studies and stats — hide rather than fake).
- Meta/OG/JSON-LD in place; form submits; Plausible live; a11y pass done.
- Zero mention of AEO/AI-search vocabulary anywhere in the shipped copy.
