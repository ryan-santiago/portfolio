# Design System

Source of truth for colors, typography, spacing, and component patterns.
If a design decision changes during implementation, update this file in
the same change so it never drifts from the code.

## Colors

Defined as CSS custom properties in `src/app/globals.css` and exposed as
Tailwind utility classes via the `@theme inline` block (Tailwind v4's
CSS-first config — there is no `tailwind.config.ts`).

| Token | Hex | CSS variable | Tailwind classes | Usage |
|---|---|---|---|---|
| Charcoal | `#2E2E2E` | `--color-charcoal` | `text-charcoal`, `bg-charcoal`, `border-charcoal` | Primary text, headings, primary button fill |
| Charcoal (soft) | `#4A4A4A` | `--color-charcoal-soft` | `text-charcoal-soft`, `bg-charcoal-soft` | Body/secondary text, primary button hover |
| Muted Blue (accent) | `#4A90E2` | `--color-accent` | `text-accent`, `bg-accent`, `border-accent` | Highlighted headline word, active nav link, links, icon accents |
| Accent (dark) | `#3A73B8` | `--color-accent-dark` | `text-accent-dark` | Hover state on accent-colored links |
| Surface | `#FAFAFA` | `--color-surface` | `bg-surface` | Page background |
| Surface (alt) | `#F0F2F5` | `--color-surface-alt` | `bg-surface-alt` | Card fills, secondary button hover, image placeholder fill |
| Border | `#E2E5EA` | `--color-border` | `border-border` | Card borders, header/footer dividers |
| Grid line | `rgba(46,46,46,0.06)` | `--color-grid-line` | *(plain CSS only, no Tailwind class)* | Site-wide background grid on `body` |

**Light theme only.** There is no dark mode toggle and no
`prefers-color-scheme` handling in this build — the default Next.js
template's dark-mode block was intentionally removed.

## Background

Every page shares a subtle 40×40px grid, set once on `body` in
`globals.css` (`background-image` of two 1px `linear-gradient` lines,
`background-size: 40px 40px`, colored with `--color-grid-line`) rather
than per-page — it sits behind all content automatically, including
through the translucent header. Kept intentionally faint (6% charcoal);
if it ever needs to stand out more, raise the alpha in
`--color-grid-line` rather than switching to a heavier line color.

The grid fades along a `135deg` diagonal — invisible at the top-left,
fully visible at the bottom-right — via a third `background-image`
layer: a `var(--color-surface)`-to-transparent gradient painted on top
of the grid lines, with `color-mix()` stops deliberately uneven (25% /
48% / 68%, not an even 0/50/100 split) so the crossover doesn't land on
the geometric center. All three background layers use
`background-attachment: fixed`, so the fade is anchored to the
*viewport*, not the document — it looks identical at any scroll
position rather than stretching across each page's full (very
different) scroll height. If the diagonal ever needs adjusting, change
the gradient's stop percentages together (they interact) rather than
just the angle.

## Typography

**Plus Jakarta Sans**, loaded via `next/font/google` in
`src/app/layout.tsx`, weights 400–800, exposed as the `font-sans` Tailwind
family (mapped through `--font-plus-jakarta-sans`).

| Weight | Used for |
|---|---|
| 800 / 700 (extrabold/bold) | Hero H1, page H1s, logo wordmark |
| 600 (semibold) | Buttons, active nav link, greeting text |
| 500 (medium) | Inactive nav links |
| 400 (normal) | Body copy |

Type scale in practice: hero H1 `text-4xl md:text-5xl`, page H1
`text-4xl`, body copy `text-lg`, nav/footer `text-sm`–`text-base`.

## Spacing & layout

- Max content width: `max-w-6xl`, centered with `mx-auto`, `px-6` side
  padding (`px-4` on the smallest mobile widths for the header).
- Section vertical rhythm: `py-20` for page sections (hero, Projects,
  About).
- Grid gaps: `gap-12` for two-column hero/about layouts, `gap-6` for the
  projects card grid.

## Component patterns

- **Buttons** (`src/components/ui/Button.tsx`): two variants, both
  `rounded-full px-6 py-3 font-semibold`.
  - `primary`: `bg-charcoal text-white`, hover `bg-charcoal-soft` — used
    for "Get In Touch".
  - `secondary`: transparent with `border border-charcoal text-charcoal`,
    hover `bg-surface-alt` — used for "Browse Projects".
- **Editorial portrait card** (`src/components/home/HeroImage.tsx`): an
  `aspect-4/5 rounded-4xl` photo card (`public/ryan-landing.jpg` via
  `next/image` with `fill` + `object-cover`), with a second
  `border-2 border-accent/40` card of the same shape offset
  `-bottom-4 -right-4` behind it for a layered look. The photo is
  mirrored (`-scale-x-100`) and cropped off-center
  (`object-[85%_15%]`) — deliberately not a centered circular avatar —
  so the subject sits toward one side of the frame with visual weight
  leaning toward the text column instead of dead center.
- **Cards** (`ProjectCard.tsx`): `rounded-2xl border border-border
  bg-surface-alt`, `aspect-video` thumbnail (`images[0]`, `object-cover`,
  slight `scale-105` on hover) above a `p-6` content block. The whole
  card is a `div[role="button"]` (not a native `<button>`, so the
  "Live site"/"Source" links can be nested safely) that opens
  `ProjectModal`.
- **Tech badge** (`TechBadge.tsx`): `rounded-full border border-border
  bg-surface px-3 py-1 text-xs` with an optional icon from
  `TECH_ICONS` (`src/lib/tech-icons.ts`, backed by `react-icons`) —
  falls back to a plain text badge for names with no icon mapped.
  Shared between `ProjectCard` and `ProjectModal`.
- **Legacy project treatment** (`ProjectCard.tsx` + `ProjectModal.tsx`,
  gated on `project.legacy`): thumbnail gets `grayscale`, a `⛓️‍💥` badge
  appears next to the title (`title="Retired — no longer runs"` for a
  tooltip), and the "Live site" link is replaced with muted, non-clickable
  "Live site (offline)" text — `sourceUrl` is left as a normal link since
  the code can still exist after the deployment dies. Keep this pair of
  files in sync if you touch one.
- **Image carousel modal / lightbox** (`ProjectModal.tsx`): fixed
  full-screen `bg-charcoal/70 backdrop-blur-sm` overlay behind a
  `max-w-3xl rounded-2xl bg-surface` panel. An `aspect-video` track of
  `images` slides via `translateX` (`transition-transform
  duration-300`), with `bg-charcoal/60` circular prev/next/close
  buttons and dot indicators overlaid on the image (prev/next/dots
  hidden when there's only one image). The same title/description/tech
  badges/links from the card repeat below the carousel.
- **Icon button** (`ChatBubbleIcon.tsx`): `rounded-full bg-charcoal
  text-white`, 36px on mobile / 40px from `sm:` up.
- **Dot heading** (`src/components/ui/DotHeading.tsx`, shared): a bold
  heading with a trailing `text-accent` period, e.g. "About me**.**" —
  polymorphic via an `as` prop so it can render as `h1` or `h2`. Used by
  every About-page view and the Projects page H1; pair it with the
  kicker-line + accent-bordered-tagline intro pattern (see Home's hero,
  `AboutMeView`, and `projects/page.tsx`) for a new page's header.
- **Terminal-note callout** (`projects/page.tsx`'s "Architectural
  disclaimer"): `rounded-2xl border border-dashed border-border
  bg-surface-alt p-6`, `font-mono` throughout — an uppercase
  `tracking-widest text-accent` label line (with an emoji prefix) above
  `text-sm leading-relaxed text-charcoal-soft` body copy. Reach for this
  — dashed border + monospace, not the site's usual sans-serif — when a
  block of copy is meant to read as an aside/log-note with a bit of
  humor, distinct from normal prose.
- **Highlight tag pill** (`AboutMeView.tsx`'s "My Stack" tags):
  `rounded-full border border-border bg-surface-alt px-4 py-2 text-sm`
  with a small `text-accent` star icon prefix. Distinct (larger, star
  prefix instead of a tech logo) from `TechBadge`. The same pill style
  (swap the star for a location-pin icon) is reused for the "Based in
  the Philippines" chip under the Socials grid.
- **Sidebar list / detail pattern** (`ExperienceView.tsx`): a vertical
  list of buttons (horizontally scrollable on mobile) where the active
  item gets `border-l-2 border-accent text-accent font-semibold` and
  inactive items `border-l-2 border-transparent text-charcoal-soft`;
  selecting one swaps the detail panel next to it.
- **Stacked-roles timeline** (`ExperienceView.tsx`'s detail panel): the
  selected company's `roles` render inside a `border-l-2 border-border
  pl-6` rail, one `bg-accent` dot (`rounded-full border-2 border-surface`,
  absolutely positioned onto the rail) per role, most-recent-first. This
  is the "LinkedIn-style" pattern for showing a promotion history at one
  employer — reach for it instead of adding duplicate sidebar rows per
  role. The whole panel is keyed on `active.id` and given the
  `.fade-in-up` class (`globals.css`) so switching companies re-triggers
  a 300ms fade+rise instead of snapping instantly — the standard way to
  animate swapped-in-place content in this codebase: key it so React
  remounts the node, then apply a class backed by a plain CSS
  `@keyframes` (not a Tailwind arbitrary `animate-[...]` value) so it
  can be neutralized in the shared `prefers-reduced-motion` block.
- **Socials grid** (`AboutMeView.tsx`'s "Socials." block): no card —
  unlike some other About-page blocks this sits directly on the page
  background, a `grid grid-cols-2` of 4 icon links (`SOCIAL_LINKS` in
  `src/lib/socials.ts`) sized to roughly match the height of the "My
  Stack" tag column beside it (avoid a single flat row here — it reads
  as visibly sparser than the other column). Each brand's real color is
  passed as a `--brand` CSS variable via inline `style` and referenced
  by a *static* Tailwind arbitrary class
  (`bg-[var(--brand)]/5`, `text-[var(--brand)]/70`,
  `group-hover:bg-[var(--brand)]/10`, etc.) — do this rather than
  interpolating the hex into the class string directly, since Tailwind
  can't statically detect a fully dynamic class and would silently fail
  to generate the rule. Icons carry a low-opacity brand tint even at
  rest (not just on hover) so the row doesn't read as flat gray; on
  hover the circle scales up and the tint intensifies.
- **Scroll-down cue** (`AboutMeView.tsx` only): `absolute bottom-6
  left-1/2 -translate-x-1/2` inside the view's `relative` wrapper — an
  `animate-bounce` down-chevron (`text-accent`) above a small
  `tracking-widest uppercase`-style "SCROLL DOWN" label, `aria-hidden`
  since it's a decorative affordance. The wrapper uses
  `min-h-[calc(100vh-4.5rem)]` instead of `min-h-screen` specifically
  so this bottom-pinned element still lands inside the viewport — the
  sticky `<Header>` sits in normal flow above the section, so a plain
  `min-h-screen` section is actually `100vh` *plus* the header's height
  tall, pushing anything anchored to its bottom edge just past the
  fold on load.
- **Full-screen view section** (About page's 3 views): `min-h-screen
  flex flex-col justify-center py-20`, separated by `border-t
  border-border`. Used when a page is split into distinct, ScrollPageNav-
  friendly sections rather than a single flowing layout.
