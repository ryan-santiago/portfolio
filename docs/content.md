# Content

Canonical copy for the site. Treat this file as the source of truth —
if copy changes in the code, update it here in the same change.

## Site-wide

- **Site name / logo wordmark**: `CodeRyan`
- **Contact email**: `ryan.santiago.ict@gmail.com`
  - Referenced from `src/lib/constants.ts` (`CONTACT_EMAIL`, `MAILTO_HREF`)
  - Used by: header `ChatBubbleIcon`, homepage "Get In Touch" button,
    footer email link
  - Do not hardcode this email anywhere else — import from
    `src/lib/constants.ts`
- **Nav items** (in order): Home (`/`), Projects (`/projects`),
  About (`/about`)

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

Hero image: circular placeholder (see `docs/design-system.md`) — **TODO:
replace with Ryan's real photo** when available.

## Projects (`/projects`)

Status: **placeholder data**, not final. Source of truth is
`src/data/projects.ts` — edit the array there directly; no other file
needs to change when real projects are added.

Each entry needs: `slug`, `title`, `description` (1–2 sentences),
`images` (string[] of paths under `public/` — **the first entry is used
as the card thumbnail**, all entries appear in the click-to-open carousel
modal), `techStack` (string[] of names — see `src/lib/tech-icons.ts` for
which names get an icon; unknown names still render as a plain text
badge), optional `liveUrl`, optional `sourceUrl`.

Currently contains 3 placeholder entries ("Placeholder Project One/Two/
Three") with generic descriptions and `#` links, all reusing the same
placeholder screenshot at `public/projects/placeholder-showcase-1.png`
(a "Good Food" restaurant-site mockup used purely as a stand-in) —
replace with real projects, real links, and real screenshots per
project.

## About (`/about`)

A 3-view page — `AboutMeView`, `ExperienceView`, `SkillsView`
(`src/components/about/`), each a `min-h-screen` section stacked in
`src/app/about/page.tsx`. Status: **placeholder content** in all three
views, not final.

- **About Me**: heading + one-line tagline (final-ish copy, but reads as
  a placeholder tone — revisit wording with Ryan), a "My Stack." row of
  highlight tags (`stackHighlights` in `src/data/skills.ts`), and a
  "Keep Scrolling." card — a clickable wayfinding prompt (bouncing arrow
  + "There's more below") that smooth-scrolls to the Experience section.
  This replaced an earlier "My Special Place." location placeholder that
  didn't carry its weight — no bio facts needed here.
- **Experience**: interactive company list (click to switch) backed by
  `src/data/experience.ts` — currently 3 placeholder companies with
  placeholder role/period/highlight bullets. Replace with Ryan's real
  work history; no structural changes should be needed, just edit the
  array.
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
