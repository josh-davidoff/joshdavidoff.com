# joshdavidoff.com

Static personal site. Hand-written HTML with no build step.

**This repository is public.** Do not commit host addresses, server paths,
credentials, private notes, or anything else that should not be world-readable.
Infrastructure details live in the private workspace under `infrastructure/`, not
here. Its history was purged before publication, so anything added now is public
permanently.

Deployment inventory key: `joshdavidoff_site` in the workspace deployment
inventory (`infrastructure/deployments.yaml`, private). The nested Sky Window
project uses the `sky_window` entry and has its own repository.

The site itself has no server. The nested Sky Window project still runs on the
shared droplet; its host access notes live in the private workspace under
`infrastructure/`.

## Git

The site is a git repo (initial commit 2026-08-29) with a public GitHub remote:
[github.com/josh-davidoff/joshdavidoff.com](https://github.com/josh-davidoff/joshdavidoff.com)
(`origin`, HTTPS, auth via `gh`), named for its domain.

`.gitignore` excludes `Directions.html`/`directions/` (personal notes),
`uploads/` (scratch), `flight tracker sky window/` (Sky Window has its own
repository), and `building/`/`stack/` (retired pages, kept on disk but out of the
repo).

## Deployment

The site is served by GitHub Pages. DNS for `joshdavidoff.com` carries GitHub's
four Pages A records and `www` is a CNAME to `josh-davidoff.github.io`. The
cutover from the droplet happened on 2026-09-07 and the droplet vhost and
certificate were retired the same day, so Pages is the only route.

`.github/workflows/pages.yml` builds and deploys on every push to `main`. It
stages the repo minus an exclude list, fails if a load-bearing file is missing
(`index.html`, `privacy.html`, the Search Console file, `robots.txt`, `bsh.html`,
the `/sky/` redirect), and fails if `AGENTS.md`, `scripts/`, `building/` or
`stack/` leak into the artifact.

Rules:

- Commit first. A push to `main` publishes whatever is committed, so never push
  work you would not want live.
- A push to `main` **is** a production deploy and needs explicit per-run
  approval from Josh.
- Wait for the workflow to finish, then verify the public endpoint before
  reporting the task complete.

### Deploying

```bash
git push origin main
```

No SSH. The rsync script that once pushed to the droplet is retired. It was
purged from this repository's history, and the copy in the private workspace is
kept only as a record.

### Verifying a deploy

```bash
gh run watch --exit-status
```

```bash
curl -s -o /dev/null -w "%{http_code}" https://joshdavidoff.com/
```

`curl -sI https://joshdavidoff.com/` should report `server: GitHub.com`.

## Tests

`/Users/josh/codex/.venv/bin/python -m pytest -q tests` — Tier 2 smoke test
(boots/serves plus security regressions per the workspace `AGENTS.md`
"Testing" section). Current result: all pass (19 on 2026-09-18; the
`<title>` check is parametrized per page, so the count grows with the site).
That check skips `google*.html`, the Search Console verification token (plain
text, no markup), which is not a page but must stay tracked.

### Verifying a zero-visual-change CSS refactor

There is no committed screenshot harness. The site is small enough that one is
not worth maintaining (backlog B71, closed 2026-09-18 after review: one such
refactor in three weeks, and the Playwright install it wanted was not earned).
Before committing a refactor that must not change rendering, compare `main`
against the working tree by hand:

1. Materialize the reference with `git archive main | tar -x -C "$REF"` into a
   temp dir. Serve both trees: `python3 -m http.server 8001 --bind 127.0.0.1
   --directory "$REF"` and the same on 8002 for the working tree.
2. Pages: `git ls-files '*.html'` minus the three redirect pages
   (`bot-stops-here.html`, `projects/ai-diligence-review-pattern.html`,
   `sky/index.html`) and the Search Console token. Widths
   390, 560, 700 and 1440 (the breakpoints are 480, 600, 680 and 720).
3. Screenshot every page at every width from both servers and `cmp` each pair;
   expect every pair byte-identical. The renderer is the headless shell that
   the design-system tooling already cached:

   ```bash
   CH=$(ls ~/Library/Caches/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-mac-arm64/chrome-headless-shell | tail -1)
   "$CH" --headless --no-first-run --hide-scrollbars --disable-gpu --force-prefers-reduced-motion --virtual-time-budget=5000 --host-resolver-rules="MAP gc.zgo.at ~NOTFOUND" --user-data-dir="$TMP/profile" --window-size=390,6000 --screenshot="$OUT/index-390-ref.png" http://127.0.0.1:8001/index.html
   ```

   The flags matter. `--force-prefers-reduced-motion` and
   `--virtual-time-budget` settle the reveal transitions; without them two runs
   of the same page differ. `--disable-gpu` changes the encoded bytes, so it
   goes on both sides. The resolver rule keeps GoatCounter from logging a
   pageview per capture. One shared `--user-data-dir` means Google Fonts are
   fetched once and served from cache to both sides. The site uses `vw` but
   never `vh`, so the fixed 6000 px window is safe. Chrome's own binary
   (`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome
   --headless=new`, same flags) makes the same kind of capture but on Chrome
   153 hangs after writing the file; kill it once the PNG lands.

   Known noise: on `index.html` at 700 and 1440 the sticky nav's "Work" link
   is caught partway through its `.18s` color transition (the scrollspy marks
   it active on the screenshot frame), so a few hundred pixels in the top 30
   rows around x 880-925 differ between any two captures, including two of
   the same tree. No flag fixes it (`--deterministic-mode`,
   `--animation-duration-scale=0`, longer budgets were all tried). Confirm
   noise by capturing the same side twice; anything else on `index.html`, and
   any diff on another page, is real. To localize a diff without Pillow,
   `sips -s format bmp` both files and compare rows in a stdlib Python loop.
   Checked 2026-09-18 against `main` at `1b818fe`: 38 of 40 pairs identical,
   the other two being that noise.
4. Optional second check from the browser pane: dump `getComputedStyle` and
   `getBoundingClientRect` for every element and its `::before`/`::after` on
   both servers and diff the JSON.
5. Record the result in the commit message, as `e47158b` did.

## Updated dates

Every project card and case page carries an "Updated" date. It is the date the
public copy last changed, set by hand, not project activity. The source is the
`updated` field in the project's dossier in the private register, which
`register/bin/render.py` renders into the card; the case page header carries
the same date in a `p.page-updated` line, edited by hand. When you change a
case page or its card copy, bump both. `tests/test_smoke.py` fails if a card's
date and its linked page's date differ, or if a label does not match its ISO
value. The home page's "Sort by" control reorders the grid by these dates;
the default "Featured" order is the register's `card_order`.

## URL notes

- Pages serves extensionless URLs, so `bsh.html` answers at `/bsh` and
  `projects/<name>.html` at `/projects/<name>`.
- `/bot-stops-here.html` and `/projects/ai-diligence-review-pattern` are
  client-side redirect pages to `/bsh`. `/sky/` redirects to
  `sky.joshdavidoff.com`.
- There is no server-side Content-Security-Policy any more; the old nginx CSP
  went with the droplet vhost. If user input, auth, or form components are ever
  added, revisit whether inline scripts should go.

## Retired pages

`building/` and `stack/` are retired. Their nav links are removed and they are
excluded from deployment, so both return 404 on the live site. Their source was
removed from this repository before publication and is gitignored; the files stay
on disk so `register/bin/render.py` can regenerate them if `RENDER_TARGETS`
re-enables those outputs.

## Sky Window and the droplet

Sky Window runs at `sky.joshdavidoff.com` on the shared DigitalOcean droplet and
deploys from its own repository per its `DEPLOY.md`. This repository only
carries the `/sky/` redirect to it, and its source stays gitignored here.
Nothing about this site touches the droplet any more. The connection budget,
the deploy lock, and the per-run approval rules for droplet sessions are in the
workspace `AGENTS.md` and `infrastructure/`, and apply only to Sky Window work.
