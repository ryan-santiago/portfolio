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

### The retro mini-games (snake.exe, race-to-zero.exe, 2048.exe)

Three easter-egg games live in `src/components/retro-window/` (shared
infra) plus one folder per game (`src/components/snake/`,
`src/components/race-to-zero/`, `src/components/game2048/`). Each game
is triggered from its own bordered icon-only button in the footer's
icon row (deliberately *not* wrapping the "Tired of reading tech
stacks? Take a quick break →" label next to it, so that text stays
inert and only the icons open anything). Adding a fourth game means:
call `createGameWindowContext("Name")` for its context, wrap its game
component in `<RetroWindow>` for the chrome, add an icon button to the
footer, and give it its own `spawnOffset` (see below) so it cascades
rather than stacking on an existing window.

- **`createGameWindowContext(name)`** (`retro-window/createGameWindowContext.tsx`)
  is a factory, not a single context: each game calls it once (see
  `SnakeGameContext.tsx` / `RaceToZeroContext.tsx`, both one-liners) to
  get its own independent `{ isOpen, open, close }` provider/hook pair.
  Independent state means multiple game windows can be open at once
  without stepping on each other.
- **`RetroWindow`** (`retro-window/RetroWindow.tsx`) is the shared
  chrome every game's `*Window.tsx` wraps its game component in: the
  draggable title bar, close button, and retro border/font-mono skin.
  Each game's own `SnakeWindow` / `RaceToZeroWindow` just reads its
  context's `isOpen` and returns `null` early — mounting `<RetroWindow>`
  *is* what "the window opened" means, which the component leans on for
  two things:
  - **Spawn position**: computed once per mount, anchored near the
    top-right (not bottom-right) so an open window can never cover the
    footer's icon row and block launching another game. `spawnOffset`
    lets a second window (e.g. Race to Zero) spawn beside rather than
    exactly on top of the first.
  - **The `ScrollPageNav` guard**: like `ProjectModal`, an open window
    sets `document.body.dataset.modalOpen = "true"` so `ScrollPageNav`
    doesn't scroll-navigate the page out from under you — but unlike
    `ProjectModal` it does **not** lock `body.style.overflow`, since the
    whole point is that you can keep browsing around the floating
    window. Because more than one window can be open simultaneously,
    this flag is **reference-counted** at module scope in
    `RetroWindow.tsx` (`registerOpenWindow`/`unregisterOpenWindow`) —
    closing one window must not clear the flag while another is still
    open.
- Both windows are mounted at the layout root (siblings of `{children}`
  in `layout.tsx`, each wrapped in its own Provider), so they survive
  client-side navigation between routes and keep running while you
  browse.

Dragging is hand-rolled with the Pointer Events API (no library) — one
subtlety worth knowing if you touch `RetroWindow.tsx`: the close button
must be a **sibling** of the draggable title-bar div, not a child of it.
A `pointerdown` on a descendant still bubbles to the title bar's
handler, which calls `setPointerCapture`; for mouse input that capture
is not released automatically on `pointerup` the way it is for touch,
so every subsequent click — including one on a nested close button —
gets redirected to the title bar and never reaches the button. Keep
drag handles and their action buttons as siblings, and always pair
`setPointerCapture` in a `pointerdown` handler with an explicit
`releasePointerCapture` in the corresponding `pointerup`/`pointercancel`
handler.

**`SnakeGame`** (`snake/SnakeGame.tsx`): a grid of absolutely-positioned
divs, one `setInterval` tick loop, keyboard arrows + touch-swipe input,
and a "PRESS ARROW" / "GAME OVER" overlay that doubles as the (re)start
prompt.

**`RaceToZeroGame`** (`race-to-zero/RaceToZeroGame.tsx`): the classic
Nim subtraction game — start at 25, each turn subtract 1, 2, or 3,
whoever brings it to exactly 0 wins. `computerMove()` always picks a
move that leaves a multiple of 4 when one exists (the standard optimal
strategy for this game — since 25 ≡ 1 mod 4, whoever moves first can
force a win by playing optimally); when it can't (the computer is
already in a structurally losing spot), it falls back to a random legal
move, per spec. Below a remaining count of 17 the status bar shows a
random tease from one of three tiers (`TEASE_LIGHT`/`_MEDIUM`/`_SHARP`,
picked by how low the count is) instead of the plain turn indicator —
friendlier at higher counts, a bit more pointed as it drops, never
unkind. Heading into the *player's* turn specifically, `pickTeaseForPlayerTurn()`
swaps in an encouraging `TEASE_PLAYER_AHEAD` line instead whenever
`remaining < 4` — the player is about to have a guaranteed winning move,
and the sharp/gloating tier reads as a wrong (computer-is-winning) tone
in that spot. This can only actually fire when the computer was itself
forced into its random fallback (an optimally-played computer never
hands the player a sub-4 position on purpose) and the random pick
happens to land there — verified via a scripted playthrough where the
player plays perfectly to force exactly that.

"Play Again" must explicitly reset `remaining`/`winner`/`tease` before
returning to the "who goes first" screen — it's tempting to just flip
the status back, but that leaves the last game's final count displayed
until the next move.

The number display and the status bar are stacked in normal flow (the
top block has a `minHeight`, not a fixed-height parent with the bar
absolutely positioned over it) specifically so a two-line tease can
never cover the "remaining" number — it grows the window instead.

`tease` is only ever set inside the computer's-move effect, never in
`playerMove` — the computer is the one "talking", so its line should
only change when it actually moves, not react to the player's own
click. The status-bar text priority reflects this: `status ===
"computer-turn"` is checked *before* `tease`, so the bar always shows
"COMPUTER'S TURN..." during the thinking delay (even though the old
tease value is technically still sitting in state) and only reveals the
tease once the computer's move resolves and hands control back to the
player. The computer's move itself waits a randomized
`randomThinkDelay()` (700–1400ms, not a fixed interval) before applying
— makes it read as thinking rather than an instant calculation.

**`Game2048`** (`game2048/Game2048.tsx`): the classic sliding-tile game
— a 4×4 board (`SIZE = 4`), arrow keys / D-pad / swipe to shift every
tile in that direction, equal adjacent tiles merge once per move, a new
`2` (90%) or `4` (10%) spawns in a random empty cell after every move
that actually changed the board. `hasMovesLeft()` (no empty cells *and*
no two adjacent equal tiles anywhere) drives the "GAME OVER" state;
like Snake, pressing any direction after game-over restarts instead of
attempting a move. Reaching 2048 sets a one-shot `justWon` flag (tracked
separately from a `hasWonRef` so it can't re-fire on a later move) that
shows "YOU REACHED 2048!" for exactly one status-bar render, then play
continues normally past it rather than hard-stopping — unlike Snake/
Race to Zero, hitting the "win" condition here isn't a terminal state.
Tiles are rendered in the same monochrome retro style as the rest of
the site's games (no per-value color palette); tiles ≥128 get an
inverted `bg-charcoal`/`text-white` fill purely for visual hierarchy at
a glance.

Board state is a flat `Tile[]` (`{ id, value, row, col }`), not a plain
`number[][]` grid — that's specifically what makes the slide/merge
*animation* possible. Each tile keeps a stable `id` across a move, so
React updates the same DOM node's position rather than tearing it down
and recreating a new one at the destination; only a genuinely new node
(a merge result or a freshly spawned tile) mounts fresh. A move runs in
two phases, mirroring Race to Zero's `setTimeout`-staged pattern:

1. **`computeSlide()`** figures out, per row or column (grouped and
   sorted along the direction of travel via `slotToRowCol()`), where
   every tile ends up — including a tile that's about to be consumed by
   a merge, which slides to the *same* destination cell as the tile it
   merges into. `setTiles()` is called immediately with these slid (but
   not yet merged) positions, so the existing tile elements' `transform`
   transitions to the new coordinates (`SLIDE_MS` = 130ms).
2. After a `setTimeout(SLIDE_MS)`, the merge actually resolves: consumed
   tiles are dropped, and — important — each merge produces a **brand
   new** tile object/id at the landing cell rather than bumping the
   survivor's value in place. That's deliberate: giving it a fresh id
   means it mounts as a new DOM node exactly where the slide already
   left it (no visual jump), which lets the `tile-pop` mount animation
   (`globals.css`) play automatically — the same trick a freshly spawned
   tile relies on. `isAnimatingRef` blocks new input for the whole two
   phases so a rapid key-mash mid-slide can't corrupt tile identity.

The two transforms involved (the slide's `translate` and the pop's
`scale`) are deliberately on **two nested elements**, not combined on
one. `tile-pop` is a `@keyframes` `animation` and the slide is an inline
`transition` — both animate the same CSS property (`transform`), and if
they lived on the same element the keyframe animation would briefly
overwrite the inline translate for its duration, so a spawning/merging
tile would pop at the grid's top-left corner instead of its actual
cell. Splitting them across an outer (position) and inner (pop) div
sidesteps the conflict entirely.

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
│   ├── retro-window/     RetroWindow (shared chrome), createGameWindowContext
│   ├── snake/            SnakeGameContext, SnakeIconButton, SnakeWindow, SnakeGame
│   ├── race-to-zero/     RaceToZeroContext, RaceToZeroIconButton, RaceToZeroWindow, RaceToZeroGame
│   ├── game2048/         Game2048Context, Game2048IconButton, Game2048Window, Game2048
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
