# 02 — Information architecture

## Sitemap

```
/                     Home
/what-we-do           Community marketing overview + the service set
/reddit               Reddit growth — the flagship solution (own page for depth + search)
/approach             How we work — the "kind stranger" method, anti-shill principles
/work                 Case studies index  (→ /work/[slug] later, once receipts exist)
/about                Barrie + why community
/start                Contact / start a project
```

Seven routes. Everything a buyer needs, nothing to get lost in. `/work/[slug]` detail pages are deferred until there's real case-study content — the index can hold summary cards in the meantime.

### Why `/reddit` gets its own page

It's the flagship and the highest-intent search term. A dedicated page lets Reddit go deep (the hard-won expertise, the receipts) **without** making the homepage or top-level identity "the Reddit agency." It sits *under* What We Do in the hierarchy, not above it. This is the structural move that lets community marketing be the headline and Reddit be the proof.

## Top navigation

Left: **Kind Stranger** wordmark (logo-wordmark.png), links home.
Right, in order: `What we do` · `Approach` · `Work` · `About` · **Start a project** (button — the brutalist offset-shadow style from the birthday site / existing splash).

- `Reddit` is **not** in the top nav. It's reached from within What We Do and the homepage flagship band. This is deliberate — keeps community marketing as the frame.
- Fractional CMO is **not** in the top nav (see `00` open decisions). It lives as a section on What We Do.
- Mobile: hamburger → the same links stacked; "Start a project" stays visible/prominent.
- Sticky header, thin. Keep the terminal/label aesthetic (see `05`).

## Footer

- Wordmark + one-line positioning ("Community marketing, built with you.")
- Nav repeat (all 7 routes, Reddit included here since footer is fine for depth).
- Contact: hello@kindstrangerhq.com
- Social: `[BARRIE: LinkedIn, X, the Kind Stranger Reddit presence if public]`
- Small print: © Kind Stranger. No cookie-banner clutter (use Plausible, no consent needed).
- Optional dry one-liner easter-egg in the footer, in keeping with the voice (`[BARRIE]` to approve).

## Global components (build once, reuse everywhere) — full specs in `05`

- **Column-header label** — the terminal-style section eyebrow ("Navigate," "The Weekend," "The Wall" on the birthday site). KS uses these as section labels: e.g. `WHAT WE DO`, `THE METHOD`, `RECEIPTS`.
- **Bordered card w/ offset shadow** — the primary content unit (capability cards, case cards, resource cards).
- **Brutalist button** — offset hard shadow, translate-on-press. Already in `style.css`. Primary CTA style.
- **Tag / chip** — uppercase mono label (birthday `event-tag` → KS capability/flag tags like `FLAGSHIP`, `RETAINER`, `STRATEGY`).
- **Link card** — the birthday `map-link-card` pattern (icon · text · arrow) for resources and case links.
- **Section band** — full-width alternating background for rhythm (white / light-gray), monochrome.
- **Footer + header** — shared layout partials.

## Page purpose in one line each

- **Home** — make the argument, show the offer, prove it, invite the conversation. One scroll, top to bottom.
- **What we do** — community marketing as the umbrella; the service set beneath it; where Reddit and embedded work fit.
- **Reddit** — flagship depth + receipts; the "we do the hardest version of this" proof.
- **Approach** — the method and the anti-shill principles; de-risks hiring us.
- **Work** — proof. Case cards, metrics, logos (when real).
- **About** — Barrie, the origin of the community thesis, why "kind stranger."
- **Start** — low-friction contact; "talk to a person" energy.
