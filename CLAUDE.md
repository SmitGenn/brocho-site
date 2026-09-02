# Site 2 — Public-facing project page

Single evolving file: `site.html`. Read it and edit in place; don't rebuild
from scratch. See the parent folder's `CLAUDE.md` for team/project-wide
context — this file is Site 2-specific build state.

This project now lives in git (this repo, pushed to
`git@github.com:SmitGenn/brocho-site.git`). Commits replace the old
re-present-the-file-every-time pattern from the chat-based workflow. Never
`git commit`/`push` without an explicit go-ahead in that turn.

## Brand direction (locked in, don't re-litigate)

Sleek black/gunmetal/silver, minimalist, Mandalorian-esque brushed metal
with scratches/imperfections, not flat clean panels. No USMA crest/colors.

- Fonts: **Big Shoulders Display** (headlines), **Inter** (body), **IBM
  Plex Mono** (eyebrows/labels/captions).
- Colors: `#0a0b0d` base black, `#9a9ea3` brushed-hi silver accent, `#b7bac0`
  body text, `#6d7075` dim text, `rgba(255,255,255,0.08)` hairline dividers.
- One signature "wow" element per page — the giant hover-revealed leafhopper
  wireframe in the hero. Everything else stays plain/flat typography on
  purpose — don't re-add shine/glint effects outside the hero and the UV
  toggle stage without being asked.
- **No em dashes anywhere in the file** — visible copy, code comments, JS
  string literals alike. Use periods, commas, or a middot (`·`) for label
  separators (see `section-tag` spans) instead.
- **No AI-tell phrasing** — avoid contrastive "not X, it's Y" constructions,
  stock words (delve, leverage, robust, tapestry, crucial, testament, etc.),
  and don't let two sentences in different sections restate the same claim
  almost verbatim. Read copy back as plain text (strip tags) before
  considering a copy edit done.

## Content ground rules (confirmed with the user)

- **Defense framing**: name defense applications generally (signature
  reduction across the optical and radio spectrum), **no specific
  platforms** (HMMWV imagery / named hardware explicitly rejected).
- **ARL/DEVCOM POC names** (Josh Tyler, Sean Jackson from RAPID slides): off
  the public page by default, their institution's call not ours.
- **Personal contact info**: no personal cell numbers on the public page,
  even though the source conference-abstract doc had one. Use an
  institutional or role-based contact instead.
- Real photos: Wu et al. 2025 eLife paper is CC BY 4.0 (confirmed via
  elifesciences.org). Figure 2 (visible vs. UV leafhopper photos) used in
  Section 03 with credit + "CC BY 4.0" in the caption. The hero wireframe is
  hand-drawn, not traced from any photo.

## Build status (verified current as of 2026-08-21)

1. **Hero** — DONE. Hand-drawn leafhopper wireframe SVG, cursor-following
   spotlight reveal, flat matte-gunmetal canvas-drawn scratch texture on the
   headline, no shine/glint sweep.
2. **Why It Matters** — DONE. Plain typography. Two-column: editorial lede +
   fact-list (Predator-Independent / Fully Passive / Orientation & Weather
   Agnostic).
3. **The Vanishing (UV/visible toggle)** — DONE. Real Wu et al. 2025 Figure
   2 photos, cropped/upscaled/sharpened. Scan-line sweep (violet toward UV,
   neutral back to visible) synced with blur/glow crossfade, verified with
   headless Playwright captures of mid-transition frames.
4. **References** — DONE. Numbered list, 13 sources, inline
   `<sup><a href="#refN">` citation markers in body copy.
5. **Contact (Section 04)** — DONE. Two-column: roster left, stamped
   contact plate right.
   - Roster: **Current Team** (Gennaro M. Smith, EECS; Benjamin D. Garcia,
     Physics & Nuclear Eng.), **Research Advisors** (LTC Jacob W. Capps,
     Physics & Nuclear Eng.; LTC William K. North, EECS), **Early
     Contributors** (Elaine J. Joyce; Pierce A. Bazewicz, both Mechanical &
     Aerospace Eng.).
   - Carolyn N. Heckle intentionally removed (left the project early, on
     bad terms) — do not re-add.
   - Section intro deliberately says "Earlier contributors, among others,
     laid groundwork..." so the list doesn't read as exhaustive. That
     qualifier is load-bearing — don't tighten it back into an
     exhaustive-sounding list without checking first.
   - Institution block is just "USMA / West Point, NY 10996" — don't
     re-expand to the full name or re-add the three-department list, both
     were cut on request.
   - Contact email: `benjamin.garcia@westpoint.edu`, labeled "Point of
     Contact" (not "Research Advisor" — he's a cadet researcher, mislabeled
     once and fixed).
   - Attachments list (IEEE RAPID submission, HEART submission, RAPID 2026
     presentation) tagged (PDF/PPTX) but **no live hrefs yet** — no hosting
     set up. Wire up real links once hosting exists.

## Still to build (in page order)

6. **Process ribbon** — Biological Cue -> CAD Model -> CST Simulation ->
   3D Print/Test, stamped-plate segments, possibly doubling as in-page nav.
7. **Spec-plate stat block** — quantitative results (94% reflected-light
   reduction claim already used in Section 03's stat callout, sourced to
   Wang et al. 2024 PNAS [12] — double check that's the right citation
   before reusing the number elsewhere), particle geometry counts (12
   pentagons/20 hexagons), tested wavelength range.
8. **Rotatable unit-cell geometry** — stretch goal, drag-to-spin wireframe
   of the truncated-icosahedron unit cell. Lower priority.

## Process notes

- The user iterates fast and specifically — when something's named
  precisely ("get rid of ALL em-dashes", "Ben is physics and nuclear eng"),
  fix exactly that, don't take it as license to also rewrite nearby things.
- **Verify functionality with a real headless Playwright test** after any
  edit touching JS or crossfade/animation logic, not just a code read-back.
  Has caught real bugs twice (a doubled SVG layer, a stray photo-crop
  artifact only visible once screenshotted).
- When a request involves a real decision with more than one reasonable
  answer (which email to use, whose name goes where), ask via the
  option-picker rather than guessing, especially for anything public-facing
  or personnel-related. When a decision has a factual problem (e.g. picked
  option mismatches a role label), flag it plainly and fix it rather than
  applying it silently.
