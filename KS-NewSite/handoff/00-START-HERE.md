# Kind Stranger website — build handoff pack

**For:** Claude Code (the builder)
**From:** Barrie (via strategy workshop)
**Domain:** kindstrangerhq.com (CNAME already in repo → GitHub Pages)
**Status:** v1 spec. Copy is drafted and buildable; a few items are flagged `[BARRIE]` for real data.

---

## What this site has to do

Move Kind Stranger from "the Reddit agency" up one level to **a community marketing agency** — for companies, organizations, and public figures alike, across the full spectrum from high-level strategy to boots-on-the-ground execution, built *with* the client. Reddit is the sharpest, most-proven specialty *inside* that discipline — the flagship, not the whole identity. The site should make a smart reader believe: *my buyers have stopped trusting ads; they trust communities; Kind Stranger knows how to earn a place there without being a shill.*

There is also a quiet second argument, woven in and **never named as a buzzword**: the same communities where buyers ask questions are increasingly where the *answers* get written — for humans and for the systems that now summarize the web. Showing up credibly compounds twice. (See `01` for exact language. Do not use the terms "AEO," "GEO," "answer engine," or "LLM optimization" anywhere on the site.)

## Audience

Anyone who needs to earn a real place in a community: companies (B2B startups are the roots, not the boundary), organizations and nonprofits, and public figures. Engagements range from "just need the strategy" to "come do it with us — boots on the ground." Secondary: people who already half-know Barrie and are checking out the shop. Write to a smart operator, not to peers. **Do not box the site into B2B-only.**

## How to use this pack

Read in order:

1. `01-positioning-messaging.md` — the argument, voice, and reusable copy blocks. **Read this first; everything else inherits from it.**
2. `02-information-architecture.md` — sitemap, nav, global components.
3. `03-homepage-copy.md` — homepage, section by section, with draft copy.
4. `04-page-specs.md` — every other page.
5. `05-design-direction.md` — the visual system (translated from Barrie's 40th birthday site → KS brand).
6. `06-build-notes.md` — stack, file structure, forms, SEO, deploy.
7. `07-the-rules-game.md` — the signature interactive touch: a subreddit-style "Rules" rail + an AutoMod-style CTA gate.

Draft copy is *real copy, ready to ship* — not lorem ipsum — but Barrie gets final edit. Anywhere marked `[BARRIE]` needs a real number, name, or asset before launch.

## Tech stack (recommended — see `06` for detail)

- Static site, dependency-light. The repo is already a static GitHub Pages site with a working CNAME. Keep it that way.
- **Eleventy (11ty)** for reusable header/footer/layout and easy case-study templating, output to static HTML. If Barrie would rather stay hand-authored plain HTML, that's a supported fallback — build multi-page HTML sharing one `style.css`. Pick 11ty unless told otherwise.
- One shared CSS file built from the existing `style.css` tokens. No CSS framework.
- Vanilla JS only, tiny. No React.
- Contact form via Formspree (or Basin). Analytics via Plausible.

## Build order

1. Design system + global layout (header, footer, tokens, core components) — `05`.
2. Homepage — `03`.
3. What We Do + the Reddit flagship page — `04`.
4. Approach, About, Start — `04`.
5. Work/case studies (placeholder-driven until `[BARRIE]` supplies receipts) — `04`.
6. SEO/meta, FAQ JSON-LD, form wiring, analytics — `06`.
7. "The Rules" game — the sidebar rail + AutoMod-style CTA gate — `07`.

## Locked decisions

- **Accent color: purple `#8806CE`** (the light-mode splash color). Single accent, both light and dark themes. See `05`.
- **No pricing anywhere.** No rates, tiers, sprint lengths, retainer figures, or "starting at $" — not on any page. Pricing is a conversation, never a page.
- **Whimsy is welcome — as costume, not just bones.** Carry the birthday site's playful personality (quirky floating widgets, easter eggs, dry-witted UI microcopy, a living wall), restyled in monochrome + purple. Playful *and* credible; legibility wins ties. See `05`.
- **"The Rules" game is in.** A subreddit-style Rules rail whose AutoMod-style gate makes visitors respect the room before the CTA works — enacting the whole thesis. Mechanic is locked; the *specific enforced rule* is Barrie's pick (recommended default: "Lurk before you post"). The mailto is never gated. See `07`.

## Open decisions (Barrie to confirm; sensible defaults chosen so you're not blocked)

- **Fractional CMO** — included as a soft, secondary service line ("Embedded / fractional CMO") on What We Do, *not* on the top nav. Easy to remove.
- **Case study data** — built with placeholders and a clearly-labeled fill-in list (`04`, Work). Do not invent client names, logos, or numbers.
- **Interactive "soul" elements** — pick two from `05` (terminal status-line + one more) and do them well.
