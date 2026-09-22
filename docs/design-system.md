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

**Light theme only.** There is no dark mode toggle and no
`prefers-color-scheme` handling in this build — the default Next.js
template's dark-mode block was intentionally removed.

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
- **Circular photo + ring** (`src/components/home/HeroImage.tsx`): a
  circular avatar with a decorative offset ring (`border-2 border-accent/40`)
  behind it. Currently a placeholder fill (`bg-surface-alt` with a large
  "R" glyph) — reused as-is on the About page at a smaller size. Swap the
  inner placeholder `div` for a `next/image` (`fill` + `object-cover`)
  once a real photo is available.
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
- **Dot heading** (`DotHeading.tsx`, About page only): a bold heading
  with a trailing `text-accent` period, e.g. "About me**.**" — polymorphic
  via an `as` prop so it can render as `h1` or `h2`.
- **Highlight tag pill** (`AboutMeView.tsx`'s "My Stack" tags):
  `rounded-full border border-border bg-surface-alt px-4 py-2 text-sm`
  with a small `text-accent` star icon prefix. Distinct (larger, star
  prefix instead of a tech logo) from `TechBadge`.
- **Sidebar list / detail pattern** (`ExperienceView.tsx`): a vertical
  list of buttons (horizontally scrollable on mobile) where the active
  item gets `border-l-2 border-accent text-accent font-semibold` and
  inactive items `border-l-2 border-transparent text-charcoal-soft`;
  selecting one swaps the detail panel next to it.
- **Wayfinding card** (`AboutMeView.tsx`'s "Keep Scrolling." card): same
  `aspect-video rounded-2xl border border-border bg-surface-alt`
  container as other About-page cards, but as a `<button>` — a circular
  `bg-accent/10` badge with an `animate-bounce` down-chevron plus two
  lines of copy, `onClick` calls `scrollIntoView({ behavior: "smooth" })`
  on the next section. Use this pattern (not invented bio facts) when a
  card needs filling but there's no real content for it yet.
- **Full-screen view section** (About page's 3 views): `min-h-screen
  flex flex-col justify-center py-20`, separated by `border-t
  border-border`. Used when a page is split into distinct, ScrollPageNav-
  friendly sections rather than a single flowing layout.
