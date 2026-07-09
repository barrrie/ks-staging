# 07 — "The Rules" (a little game)

The signature interactive touch. It's a joke, a brand proof, and a filter all at once.

---

## The concept

Every community has a **Rules** box in the sidebar — Reddit made it iconic. Kind Stranger puts one on its site. It reads like a real subreddit's rules: numbered, deadpan, a little unhinged. Most rules are just funny. But **one or two are actually enforced** — and the primary CTA behaves like **AutoMod**: if you try to "post" (click Start a project / Get in touch) without following the enforced rule, your submission gets *removed*, with an AutoMod-style rejection.

Why it's more than a gag: the entire Kind Stranger thesis is *respect the room before you act — earn your place, don't barge in.* The Rules game makes the visitor **live that thesis** in the first thirty seconds. You literally cannot skip the room's norms and demand attention. That's the pitch, playable.

## Placement & look

- **Sticky right rail on desktop**, styled like a subreddit rules box: a bordered card, `THE RULES` in a mono column-header, a numbered list, purple accents (see `05`). Nods to the birthday site's left "Navigate" rail and the floating packing-list widget.
- **Mobile:** collapses to a pinned `📌 THE RULES` chip that expands a sheet. Don't let it cover content.
- Voice: dry, Reddit-automod deadpan. See `01` for tone. It should make a community person grin.

## The rules list (draft — ~7, quirky; most decorative, 1–2 enforced)

Build these as the default set; Barrie edits freely. Mark which are enforced in the markup.

1. **Lurk before you post.** *(ENFORCED — recommended, see below)* Read the room before you ask for anything.
2. **No cold pitches.** If it reads like a cold email, it dies in the queue.
3. **Contribute before you extract.** Add something before you take something.
4. **No astroturf.** We'll know. We always know.
5. **Be a real one.** Bots, spam, and "Dear Sir/Madam" get removed on sight.
6. **Respect the room.** Every community has norms. So does this one.
7. **Rule 7 is a secret.** *(the obligatory joke rule every good sidebar has)*

`[BARRIE: approve / rewrite the list — this is the fun part, make it yours.]`

## The enforced mechanic (how AutoMod works)

On click of any **primary CTA**, check compliance with the enforced rule(s):

- **Not compliant →** don't submit. Show an AutoMod-style rejection inline / as a toast styled like a removed Reddit comment:
  > **⚠ Removed by AutoMod**
  > *Rule 1: Lurk before you post.* You've been here 6 seconds. Read the room, then try again.
- **Compliant →** the button does a satisfying purple "clunk" (the offset-shadow press), then submits / unlocks, with a wink:
  > **✓ Approved by the community.** Nice. Now we can talk.

Keep the copy playful, never scolding. It's an inside joke the visitor is in on, not a lecture.

## Recommended enforced rule: **Rule 1 — "Lurk before you post."**

My pick, because it enacts the strongest pillar ("earn first, ask later") and is the most on-the-nose community behavior. Implementation options, easiest first:

- **Presence + scroll:** the CTA is "locked" until the visitor has actually engaged — scrolled past, say, the Approach/Method section, or been on the page more than a real beat (not a hard timer that feels broken — tie it to scroll depth so it feels earned). Click early → the Rule 1 removal. Once they've "lurked," it unlocks with the approval wink.
- Show the locked state honestly: the CTA can wear a tiny mono tag like `🔒 lurking…` that flips to `✓ ready` — so it's a discoverable game, not a broken button.

## Alternatives / other rules we could enforce (the brainstorm — pick with Barrie)

- **"Contribute before you extract."** The CTA unlocks only after the visitor leaves a note on the wall / upvotes something / interacts once. Enacts "add value first." (Higher friction — use only if the wall exists.)
- **"No cold pitches."** The `/start` message field is checked: ALL CAPS, "Dear Sir," or an obvious hard-sell opener → AutoMod removal ("This reads like a cold pitch. Rule 2. Try again like a human."). Great on the contact form specifically.
- **"Read the sidebar."** A simple `☑ I read the rules` that starts unchecked; clicking the CTA without it → "Removed: read the rules first (they're right there →)." Lowest-effort, most obvious.
- **"Be a real one."** A joke non-captcha ("Prove you're not a bot: which of these is a real subreddit?") — playful humanity check.

Mix is fine: e.g., **Rule 1 gates the homepage CTA** (lurk) and **"No cold pitches" gates the contact form**. Two moments, same bit.

## Non-negotiables (so the game never costs a real lead)

- **The email address is always an un-gated escape hatch.** The footer/`start` `hello@kindstrangerhq.com` mailto link is NEVER gated. Nobody who genuinely wants to reach Kind Stranger can be blocked by a joke. The game gates the *button*, not the *ability to make contact*.
- **Accessibility:** the gate must be satisfiable by keyboard-only and screen-reader users; the "lurk" unlock must trigger on keyboard scroll/navigation too, never mouse-only. Announce the AutoMod rejection via `aria-live="polite"`. Never trap focus. Honor `prefers-reduced-motion` (no bouncing removal toast).
- **Purely client-side.** No backend, no stored state needed. Reset on reload is fine.
- **Discoverable, not frustrating.** The locked state must look intentional (the `🔒 lurking…` tag), so a confused visitor reads it as a bit, not a bug. If someone clicks the removed CTA twice, the second message can get warmer/wink harder, not repeat identically.

## Build note for Claude Code

Small vanilla-JS module (`rules.js`): renders the rules rail from a config array (`{n, text, enforced}`), wires an `checkRules()` gate onto elements with `data-cta="primary"`, and swaps button state + fires the toast. Keep it under ~80 lines. The enforced rule(s) and copy live in that config so Barrie can tweak without touching logic.
