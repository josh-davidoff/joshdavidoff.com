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

Run this before committing a refactor that must not change rendering. There is no
committed screenshot harness (B71, closed 2026-09-18), so compare `main` by hand:

```bash
REF=$(mktemp -d); TMP=$(mktemp -d); OUT=$(mktemp -d); git archive main | tar -x -C "$REF"
python3 -m http.server 8001 --bind 127.0.0.1 --directory "$REF" & python3 -m http.server 8002 --bind 127.0.0.1 --directory . &
CH=$(ls ~/Library/Caches/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-mac-arm64/chrome-headless-shell | tail -1)
for p in $(git ls-files '*.html' | grep -v -e bot-stops-here -e ai-diligence-review-pattern -e sky/index -e '^google'); do
  for w in 390 560 700 1440; do for s in ref:8001 new:8002; do
    "$CH" --headless --no-first-run --hide-scrollbars --disable-gpu --force-prefers-reduced-motion --virtual-time-budget=5000 --host-resolver-rules="MAP gc.zgo.at ~NOTFOUND" --user-data-dir="$TMP/profile" --window-size=$w,6000 --screenshot="$OUT/${p//\//_}-$w-${s%%:*}.png" "http://127.0.0.1:${s##*:}/$p"
done; done; done
for f in "$OUT"/*-ref.png; do cmp -s "$f" "${f%-ref.png}-new.png" || echo "DIFF ${f##*/}"; done
```

Expect no `DIFF` lines beyond the known noise: on `index.html` at 700 and 1440 the
sticky nav's "Work" link is caught partway through its `.18s` color transition, so a
few hundred pixels in the top 30 rows near x 880-925 differ between any two captures.
Confirm noise by recapturing the same side; any other diff, on any page, is real.

## Link-preview card

`assets/og-card.png` (1200x630, the `og:image` on every page) is rendered from
`scripts/og-card/og-card.html`, which uses the self-hosted Apfel Grotezk files.
`scripts/` is excluded from the Pages artifact. To regenerate, serve the repo
root on port 8002 and run:

```bash
CH=$(ls ~/Library/Caches/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-mac-arm64/chrome-headless-shell | tail -1); "$CH" --headless --no-first-run --hide-scrollbars --disable-gpu --force-device-scale-factor=1 --virtual-time-budget=3000 --user-data-dir="$(mktemp -d)" --window-size=1200,630 --screenshot=assets/og-card.png http://127.0.0.1:8002/scripts/og-card/og-card.html
```

LinkedIn caches previews for about a week; its Post Inspector refreshes one.

## Updated dates

Every project card and case page carries an "Updated" date. It is the date the
public copy last changed, set by hand, not project activity. The source is the
`updated` field in the project's dossier in the private register, which
`register/bin/render.py` renders into the card's `data-updated` attribute. Each
case page shows the same date in a `p.page-updated` line at the bottom of the
page, edited by hand. When you change a case page or its card copy, bump both.
`tests/test_smoke.py` fails if a card's date and its linked page's date differ,
or if a visible label does not match its ISO value.

Two homepage features built on these dates are switched off (2026-09-22) but
kept so they can come back:

- Visible dates on cards. Set `SHOW_CARD_DATES = True` in
  `register/bin/render.py` and re-render.
- The "Sort by" control (Featured / Recently updated). Remove the `hidden`
  attribute from `div.segmented.sort` in `index.html`. It sorts by
  `data-updated`, so it works whether or not the card dates are visible. The
  default "Featured" order is the register's `card_order`.

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
