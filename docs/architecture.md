# Architecture

## Tech stack

- **Next.js 16 (App Router)** + **TypeScript** + **React 19**
- **Tailwind CSS v4** (CSS-first config via `@theme` in `globals.css` — there is
  no `tailwind.config.ts` in this project; design tokens are plain CSS custom
  properties registered with Tailwind through the `@theme inline` block)
- **react-icons** — the only runtime dependency beyond Next/React. Used
  for tech-stack icons (`react-icons/si`, `react-icons/fa`) via the
  lookup in `src/lib/tech-icons.ts`.
- **No backend, no CMS/backoffice, no auth, no database.** This is a fully
  static marketing/portfolio site. All content (projects, bio copy, nav
  items, contact email) lives in local TypeScript data files committed to
  the repo and is imported directly at build time — there are no API
  routes, no `fetch` calls to external services, and no server actions.
  Project screenshots are static files under `public/projects/`.

## Routing map

| Route | File | Purpose |
|---|---|---|
| `/` | `src/app/page.tsx` | Home — hero section |
| `/projects` | `src/app/projects/page.tsx` | Project grid — click a card to open a full-image carousel modal, sourced from `src/data/projects.ts` |
| `/about` | `src/app/about/page.tsx` | Bio — a 3-view page (About Me, Experience, Skills), each `min-h-screen` |

`src/app/layout.tsx` is the root layout: it loads the Plus Jakarta Sans
font, sets site-wide `<Header />` / `<Footer />` / `<ScrollPageNav />`,
wraps everything in `<SnakeGameProvider>`, and renders `<SnakeWindow />`
as the last child so it overlays every page. Each route can override
`metadata` for itself (see `projects/page.tsx` and `about/page.tsx`).

### Scroll-driven navigation & page transitions

`ScrollPageNav` (`src/components/layout/ScrollPageNav.tsx`) listens for
wheel/touch input at the very top or bottom of the viewport and, once the
user keeps scrolling past that edge, calls `router.push` to the next/
previous route in `NAV_ITEMS` order (Home → Projects → About). The same
directional navigation (`nav-forward` / `nav-back`) is tagged via
`transitionTypes` on both `ScrollPageNav`'s `router.push` calls and the
`<Link>`s in `Nav.tsx`, so scrolling and clicking the navbar produce the
identical slide+fade animation. Each page wraps its content in React's
`<ViewTransition>` (from `"react"`, no `react@canary` install needed —
Next.js vendors it) mapping those types to the CSS keyframes defined in
`globals.css`; the header is anchored with `viewTransitionName:
"site-header"` so it never moves during the transition. See
`node_modules/next/dist/docs/01-app/02-guides/view-transitions.md` for the
underlying API.

### Project cards & the image carousel modal

`ProjectGrid` (client component) owns which project's modal is open as
local state and renders one `ProjectModal` when a card is clicked.
`ProjectCard` is a `div[role="button"]` (not a real `<button>`, so it can
safely nest the "Live site" / "Source" `<a>` tags — those call
`stopPropagation()` so clicking them doesn't also open the modal).
`ProjectModal` is a lightbox: a sliding `translateX` track for the
`images` array, prev/next + dot controls (hidden when there's only one
image), Escape/Arrow-key handling, and the same title/description/tech
badges/links shown again below the carousel. While a modal is open it
sets `document.body.dataset.modalOpen = "true"` and locks
`body.style.overflow` — `ScrollPageNav` checks that flag and skips its
wheel/touch handling so an open modal can never trigger a scroll-based
page navigation underneath it.

### The snake.exe easter egg

Triggered from `SnakeIconButton` in the footer — a bordered icon-only
button (deliberately *not* wrapping the "Tired of reading tech stacks?
Take a quick break →" label next to it, so that text stays inert and
only the icon opens anything; the footer's icon row is written to hold
more of these later, up to a small handful of games) — which just calls
`open()` from `SnakeGameContext` (`SnakeGameProvider`, mounted once
around the whole app in `layout.tsx`). `SnakeWindow` renders the actual
draggable retro window
at the layout root — since it's a sibling of `{children}` rather than
part of any page, it survives client-side navigation between routes and
keeps running (the game loop doesn't pause) while you browse. `SnakeGame`
is the game itself: a grid of absolutely-positioned divs, one
`setInterval` tick loop, keyboard arrows + touch-swipe input, and a
"PRESS ARROW" / "GAME OVER" overlay that doubles as the (re)start
prompt. Like `ProjectModal`, `SnakeWindow` sets
`document.body.dataset.modalOpen = "true"` while open so `ScrollPageNav`
doesn't try to scroll-navigate the page out from under you — but unlike
`ProjectModal` it does **not** lock `body.style.overflow`, since the
whole point is that you can keep scrolling/browsing around the floating
window.

Dragging is hand-rolled with the Pointer Events API (no library) — one
subtlety worth knowing if you touch this file: the close button must be
a **sibling** of the draggable title-bar div, not a child of it. A
`pointerdown` on a descendant still bubbles to the title bar's handler,
which calls `setPointerCapture`; for mouse input that capture is not
released automatically on `pointerup` the way it is for touch, so every
subsequent click — including one on a nested close button — gets
redirected to the title bar and never reaches the button. Keep drag
handles and their action buttons as siblings, and always pair
`setPointerCapture` in a `pointerdown` handler with an explicit
`releasePointerCapture` in the corresponding `pointerup`/`pointercancel`
handler.

## Folder structure

```
src/
├── app/                  Routes (App Router) — thin, compose components
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── projects/page.tsx
│   └── about/page.tsx
├── components/
│   ├── layout/           Header, Nav, ScrollPageNav, Footer — used on every page
│   ├── home/             Hero, HeroImage — homepage only
│   ├── projects/         ProjectCard, ProjectGrid, ProjectModal, TechBadge
│   ├── about/            AboutMeView, ExperienceView, SkillsView
│   ├── snake/            SnakeGameContext, SnakeIconButton, SnakeWindow, SnakeGame
│   └── ui/                Button, ChatBubbleIcon, DotHeading — shared primitives
├── data/
│   ├── projects.ts       Placeholder project entries (single source of truth)
│   ├── experience.ts     Placeholder work history (single source of truth)
│   └── skills.ts         Stack highlight tags + skill category breakdown
├── lib/
│   ├── constants.ts      SITE_NAME, CONTACT_EMAIL, MAILTO_HREF, NAV_ITEMS
│   ├── tech-icons.ts     TECH_ICONS lookup (tech name → react-icons component)
│   └── socials.ts        SOCIAL_LINKS (name, href, icon, brand color)
└── types/
    ├── project.ts        Project interface
    ├── experience.ts     ExperienceEntry (company + roles: RoleEntry[]), RoleEntry
    └── skill.ts          SkillCategory interface
```

## Conventions

- **Path alias**: `@/*` maps to `src/*` (configured in `tsconfig.json`).
- **Components**: PascalCase filenames matching the exported component
  name; one component per file. Grouped by feature (`home/`, `projects/`)
  or role (`layout/`, `ui/`), not by type.
- **Data files**: camelCase filenames, typed against an interface in
  `src/types/`.
- **Single source of truth for shared values**: the contact email, nav
  items, and site name live only in `src/lib/constants.ts` — components
  import from there rather than hardcoding strings (e.g. no component
  should hardcode a `mailto:` string directly).
- **No dark mode**: the site is light-theme only by design (see
  `docs/design-system.md`).
