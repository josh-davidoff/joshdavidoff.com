# design-sync notes — joshdavidoff.com design system

Repo-specific gotchas for future syncs. Read this before re-running anything.

## What this design system is

The site (`index.html`, `bsh.html`, `privacy.html`, `projects/*.html`) is hand-written
static HTML with no build step. `design-system/` is a React package **extracted from**
those pages' inline `<style>` blocks — it mirrors the site, the site does not consume it.
If the site's inline CSS changes, this package does NOT update automatically. Keeping
them in sync is manual until someone points the pages at `design-system/dist/components.css`.

## Build

- `cd design-system && npm run build` — `tsc` emits ESM + `.d.ts`, then `build.mjs`
  flattens the CSS.
- Requires `react-dom@18` as a devDependency **purely for its UMD builds**, which the
  converter vendors for preview cards. React 19 dropped UMD; do not bump past 18 without
  checking `node_modules/react-dom/umd/` still exists.
- Converter entry is `--entry ./design-system/dist/index.js`, `--node-modules
  ./design-system/node_modules`.

## The CSS must stay flattened — do not "clean this up"

`src/` splits the CSS three ways (`tokens.css` → `base.css` → `components.css`) for
readability, but `build.mjs` concatenates them into a single `dist/components.css`.
This is deliberate. The converter copies only the entry stylesheet, so a relative
`@import` between them dangles: the first build failed `[CSS_IMPORT_MISSING]` with all
11 custom properties and all three fonts undefined. Restoring the import chain would
ship every component unstyled to every design built with it.

Remote webfont `@import`s are hoisted to the top of the flattened file (CSS requires
`@import` before other rules). Fonts come from Google Fonts at runtime — validate
reports `[FONT_REMOTE]`, which is expected and informational, NOT `[FONT_MISSING]`.

## SiteRoot is required

`cfg.provider = SiteRoot`. The palette is dark-first: the site sets ground and body type
on `body`, which only works when the DS owns the document. Mounted standalone, cream
text lands on white and is effectively invisible. `SiteRoot` carries those declarations
so components work in any container. `SiteRoot` was added during the first sync — it is
not in the original site markup. Anything built with this DS must be wrapped in it.

## Findings in the SITE's CSS — preserved verbatim, not fixed

These are faithful extractions of real bugs in the source. Changing them is the repo
owner's call, not the sync's.

- **`.proj-sys { font-size: 6px }`** — almost certainly a typo. Invisible on the live
  site because `.proj-card p { font-size: 18px }` beats it on specificity (0,1,1 vs
  0,1,0). It only bites when `.proj-sys` is used outside a `.proj-card`. Every preview
  that renders a chip row must therefore compose it inside `<article className="proj-card">`.
- **`.chip` is styled only as `.proj-sys .chip`** — a standalone `<Chip>` gets no pill
  border. Same remedy: compose leaves in their real parent.

## Dead CSS in the source

Classes with rules but no live HTML anywhere on the site: `.talk-list`/`.talk-card`,
`.more-cases`/`.case-links`/`.case-link-row`/`.cn`, standalone `.note`, `.currently-panel`,
`.entry .yr`, `.experiment-grid`, `.proj-num`, `.proj-focus`, `.exp-label`/`.exp-card`,
bare `.ph`, and the `footer`/`.links` rules on board-prep, fluxx-monday, home-dashboard,
and payment-sync (none of those four pages contain a `<footer>`).

Components for these were reconstructed from the CSS selectors alone and are the
least-verified in the system. They render correctly, but "correct" here means "matches
the CSS rule", not "matches a known-good page".

## Cross-page value drift

The same selector carried different values on different pages. `index.html` is the
default; divergent values became explicit modifiers rather than letting one page win:
`.wrap--case`/`.wrap--bsh`, `.label--case`/`.label--bsh`, `.section--case`/`.section--bsh`,
`.footer--case`/`.footer--bsh`/`.footer--privacy`, `.title--bsh`/`.subtitle--bsh`,
`.site-nav-name--case`, `.h2--privacy`. `Page` and `SectionLabel` expose these as a
`variant` prop.

`.title`/`.subtitle` are the one case where index.html defines nothing — the
`projects/*.html` value (5 of 6 defining files) became the default.

## Deploy safety

The site deploys to GitHub Pages from `.github/workflows/pages.yml`, which stages the repo
with an rsync exclude list. That list excludes `design-system/`, `ds-bundle/`, `.ds-sync/`,
and `.design-sync/`. Without those excludes a deploy publishes `node_modules` to the public
site. Do not remove them. The retired `scripts/deploy-site.sh` carried the same excludes.

## Process notes for fan-out — two real incidents

Both happened during the first sync despite prompts saying not to. Guard against them.

1. **A subagent created temporary stub files for another agent's components** to typecheck
   against, then deleted them. The real files survived only by timing luck. Fan-out prompts
   must forbid *touching* out-of-scope paths, not merely creating them.
2. **A CONCURRENT CLAUDE SESSION ran `git reset --hard`** in this repo — not a subagent
   of this run. Another session, doing unrelated register/API-migration work, reached for
   `git reset --hard` instead of `git revert --abort` while dry-running a revert. It
   discarded every uncommitted working-tree change here: the CSS flattening in
   `build.mjs`, `.site-root`, the `SiteRoot` export, the `SiteNav`/`CaseHeader` variant
   props, and the `react-dom` devDependency plus its lockfile entry.

   Only gitignored output (`dist/`, `ds-bundle/`) and untracked new files survived, so the
   artifacts looked fine while the source that produced them had silently reverted — a
   single rebuild away from being lost for real. Recovery was possible only because this
   session still held the files in context and could rewrite them; unstaged changes have
   no git object and nothing on disk survives.

   **Guards:** commit before any long unattended stretch — uncommitted work in a shared
   repo is not safe from other sessions, not just from subagents. Verify with `git reflog`
   rather than `git status`: a hard reset leaves status clean, which reads as "nothing
   changed" rather than "your changes are gone." A `PreToolUse` hook now prompts on
   destructive git commands, and the workspace AGENTS.md documents concurrent-session
   rules.

## Re-sync risks

- **The site and the package drift silently.** Nothing detects that `index.html`'s inline
  CSS changed. Before trusting a re-sync, diff the pages' `<style>` blocks against
  `design-system/src/`.
- **Preview content is inlined copy** lifted from the site (project titles, talk dates,
  reading list). It rots when the site's content changes. It is illustrative, not authoritative.
- **Fonts load from Google at runtime.** No woff2 ships in the bundle. If Google Fonts is
  unreachable, or the family list in `src/tokens.css` drifts from the pages' `<link>`,
  designs silently render in fallback faces.
- **Playwright/chromium** was installed under `.ds-sync/` for the render check, pinned to
  the cached build. A fresh clone needs it reinstalled.
- **`react-dom@18` pin** (above) is load-bearing for previews, not for the library itself.

## Preview-authoring gotchas (folded from the first sync's fan-out waves)

- **The capture server serves only `ds-bundle/`.** Any preview referencing a real site
  asset (`/assets/josh.jpg`) 404s and renders a broken-image box. `Hero`'s preview
  inlines the portrait as a base64 data URI (~180 KB inside
  `.design-sync/previews/Hero.tsx`) to work around this. A config-level fix — serving the
  repo's `assets/` alongside `ds-bundle` — would remove the need for every author to
  hand-embed images, and is worth doing if more image-bearing components appear.
- **"Compose leaves inside their real parent" generalizes.** It is not only `.chip`.
  Any component whose root element carries no box-model styling of its own needs its
  real parent to look right: `SiteFooter` has no horizontal padding because it always
  sits inside `Page`'s `.wrap`; `.comp-item`'s `max-width: calc(50% - 6px)` only makes
  sense inside `.comp-grid`; `.category` is always a `.proj-card` child. Check for this
  before assuming a bare render is broken.
- **`Placeholder` (`.ph`) has no intrinsic size.** Empty, it collapses to a sliver. Its
  preview adds a small scoped `<style>` block to size two cells — that is preview-local
  composition, NOT a source-CSS fix; don't mistake it for one on a re-sync.
- **`RefTable`, `Hero`, and `SiteNav` are wider than a grid cell** and carry
  `cfg.overrides.<Name>.cardMode = "column"` so the product renders one export per row
  instead of cropping them.

## API gaps found by previews and fixed in the source

Both were found only because a preview rendered wrong, and both were real defects in the
component API rather than preview problems:

- **`SiteNav` gained `variant` + `nameVisible`.** The wordmark is hidden by default
  (`.site-nav-name { opacity: 0 }` — the home page's genuine pre-scroll state, revealed by
  scroll JS that does not exist in the component), and no prop could reach the inner
  element, so any static layout got an invisible logo. `variant="case"` selects the
  always-visible case-study wordmark; `nameVisible` forces the home one on.
- **`CaseHeader` gained `variant`.** It could not reach the `.title--bsh` /
  `.subtitle--bsh` modifiers, inconsistent with `Page` and `SectionLabel`.

## Known render warns (expected — do not chase on re-sync)

- `[FONT_REMOTE]` for Newsreader / Instrument Sans / Bricolage Grotesque — fonts load
  from Google at runtime by design.
- `SiteNav`'s `BeforeScroll` cell renders a deliberately transparent wordmark. That is
  the true pre-scroll state and is intentional.
