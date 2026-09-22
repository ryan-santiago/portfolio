# Content

Canonical copy for the site. Treat this file as the source of truth —
if copy changes in the code, update it here in the same change.

## Site-wide

- **Site name / logo wordmark**: `CodeRyan`
- **Contact email**: `ryan.santiago.ict@gmail.com`
  - Referenced from `src/lib/constants.ts` (`CONTACT_EMAIL`, `MAILTO_HREF`)
  - Used by: header `ChatBubbleIcon`, homepage "Get In Touch" button
  - Do not hardcode this email anywhere else — import from
    `src/lib/constants.ts`
- **Nav items** (in order): Home (`/`), Projects (`/projects`),
  About (`/about`)
- **Footer**: copyright line + "Tired of reading tech stacks? Take a
  quick break →" (plain text, not clickable) next to an icon row —
  `SnakeIconButton` (pixel-snake glyph) and `RaceToZeroIconButton`
  (bullseye glyph), each a bordered icon-only button that opens its own
  draggable retro game window — see `docs/architecture.md`. The row is
  written to hold more game icons later. The footer no longer repeats
  the contact email (it's already in the header and the Home hero); if
  that ever changes, don't add the email back here without removing the
  duplication elsewhere.
- **Race to Zero trash talk** (`src/components/race-to-zero/RaceToZeroGame.tsx`,
  `TEASE_LIGHT`/`TEASE_MEDIUM`/`TEASE_SHARP` arrays): final, verbatim
  copy, written to be light ribbing that gets a little more pointed as
  the remaining count drops — never actually mean, since it's just a
  mini-game. Add more lines to any tier freely; keep the tone consistent
  with the existing ones. Separately, `TEASE_PLAYER_AHEAD` is the
  encouraging line shown instead of the sharp tier when the player (not
  the computer) is the one about to win — keep that pool sincerely
  congratulatory, not backhanded, since the sharp tier already covers
  the "computer is winning" tone.

## Home (`/`)

Final, verbatim copy — do not paraphrase:

> Hey, I'm Ryan! 👋
>
> Tech Lead | Architect | Fullstack Developer
>
> I build beautiful, user-first websites, design solid architectures, and
> lead developer teams to the finish line. Based in the Philippines, I turn
> complex technical chaos into smooth, loveable user experiences. (And yes,
> I ensure our git histories stay clean too).

Buttons: **Get In Touch** (mailto, primary) · **Browse Projects** (links to
`/projects`, secondary)

Hero image: Ryan's real photo (`public/ryan-landing.jpg`), mirrored and
off-center in an editorial card layout — see `docs/design-system.md`.

## Projects (`/projects`)

Header matches the About page's intro pattern: a kicker line ("A look
at what I've shipped 🚀") and `DotHeading` ("Projects."). No tagline
paragraph beneath it (removed — the disclaimer callout right below
already carries the intro weight).

Below that, an "Architectural disclaimer" callout (dashed border,
monospace type, ⚠️ label) — final, verbatim copy, written with humor on
purpose:

> A couple of legacy projects below no longer run. They rely on
> retired frameworks, dead cloud providers, or deprecated APIs.
> Consider them archaeological sites from my time living on the
> bleeding edge. I've archived most, but saved a few iconic broken
> ones marked with ⛓️‍💥 — partly for nostalgia, partly as a monument to
> tech stack evolution.

Status: **placeholder data**, not final. Source of truth is
`src/data/projects.ts` — edit the array there directly; no other file
needs to change when real projects are added.

Each entry needs: `slug`, `title`, `description` (1–2 sentences),
`images` (string[] of paths under `public/` — **the first entry is used
as the card thumbnail**, all entries appear in the click-to-open carousel
modal), `techStack` (string[] of names — see `src/lib/tech-icons.ts` for
which names get an icon; unknown names still render as a plain text
badge), optional `liveUrl`, optional `sourceUrl`, optional `legacy`
(boolean — pays off the disclaimer above: renders a ⛓️‍💥 badge next to
the title, a grayscale thumbnail, and swaps the "Live site" link for
muted "Live site (offline)" text; `sourceUrl` still links out normally).

Currently 10 placeholder entries ("Placeholder Project One" through
"Ten") with generic descriptions and `#` links, all reusing the same
placeholder screenshot at `public/projects/placeholder-showcase-1.png`
(a "Good Food" restaurant-site mockup used purely as a stand-in) — the
last two (`placeholder-project-nine`, `placeholder-project-ten`) have
`legacy: true` so the disclaimer above has something to point at.
Replace with real projects, real links, real screenshots, and real
`legacy` flags per project.

## About (`/about`)

A 3-view page — `AboutMeView`, `ExperienceView`, `SkillsView`
(`src/components/about/`), each a full-screen section stacked in
`src/app/about/page.tsx` (`AboutMeView` uses
`min-h-[calc(100vh-4.5rem)]` to leave room for its bottom-pinned scroll
cue; the other two use plain `min-h-screen`). Status: **placeholder
content** in all three views, not final.

- **About Me**: a kicker line ("A little more about me 👋", matching the
  Home hero's greeting) + heading + one-line tagline (final-ish copy,
  but reads as a placeholder tone — revisit wording with Ryan), a "My
  Stack." row of highlight tags (`stackHighlights` in
  `src/data/skills.ts`), and a "Socials." 2×2 icon grid — Facebook,
  Instagram, LinkedIn, GitHub from `SOCIAL_LINKS` in
  `src/lib/socials.ts`, plus a "Based in the Philippines" location chip
  reusing copy already established on the Home page. Status:
  **placeholder `href`s** (`#`) on the social icons — swap in Ryan's
  real profile URLs before launch; no structural changes needed.
- **Experience**: interactive company list (click to switch) backed by
  `src/data/experience.ts`. Status: **real companies, mostly placeholder
  detail**. Each `ExperienceEntry` has a `company` and a `roles` array
  (most-recent-first) — a promotion within one company is multiple
  entries in that array, not multiple sidebar rows; the detail panel
  renders them as a small connected timeline. Currently:
  - **Questronix Corporation** (current employer): 3 roles reflecting
    Ryan's promotion history — Software Technical Team Lead (Jul 2023 —
    Present, real dates) → Technical Resource Manager (`period` is
    literally `"TODO: add dates"` — fill in before launch) → Fullstack
    Developer (same `TODO`). All three still have placeholder highlight
    bullets.
  - **Jeonsoft Corporation**: 1 role, Software Developer (Aug 2018 — Feb
    2021, real dates), placeholder highlights.
- **Skills**: 4-column category breakdown (Web Design, Frontend,
  Backend, Soft Skills) backed by `skillCategories` in
  `src/data/skills.ts`. The Frontend/Backend tags were derived from the
  stack tags already used in `src/data/projects.ts` — adjust to Ryan's
  actual skillset if it differs.

## Page metadata

Defined per-route via Next's `metadata` export:

- Root (`layout.tsx`): title `CodeRyan | Tech Lead, Architect & Fullstack
  Developer`, description summarizing Ryan's role.
- `/projects`: title `Projects | CodeRyan`
- `/about`: title `About | CodeRyan`
