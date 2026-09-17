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
"Testing" section). Current result: 14 passed, 1 xfailed, 1 failed. The
failure is `test_html_parses_and_has_one_title[googlea100f475dc6193a2.html]`:
that tracked `*.html` file is a Google Search Console verification token
(plain text, no markup), not a real page, so it has zero `<title>` tags. The
test as specified checks every tracked `*.html` file for exactly one
`<title>`; whether to exclude verification-token files from that check is an
open decision, not yet made.

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
