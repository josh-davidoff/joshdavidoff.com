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

Host access, addresses, and lockout recovery are documented in the private
workspace under `infrastructure/`. Direct root SSH is disabled; use the
unprivileged account and `sudo`, and do not loop failed connection attempts.

## Git

The site is a git repo (initial commit 2026-08-29) with a public GitHub remote:
[github.com/josh-davidoff/joshdavidoff.com](https://github.com/josh-davidoff/joshdavidoff.com)
(`origin`, HTTPS, auth via `gh`), named for its domain.

`.gitignore` excludes `Directions.html`/`directions/` (personal notes),
`uploads/` (scratch), `flight tracker sky window/` (Sky Window has its own
repository), and `building/`/`stack/` (retired pages, kept on disk but out of the
repo).

## Deployment

The site deploys to GitHub Pages on push to `main` via
`.github/workflows/pages.yml`. That build is live and verified, but **DNS still
points `joshdavidoff.com` at the droplet**, so the droplet is still what visitors
see. The cutover waits on Sky Window moving to its own hostname, because Pages
cannot proxy its flight API. Plan: `infrastructure/deploy-decoupling-plan.md`.

Rules that apply regardless of how deploy is wired:

- Commit (and push to `origin`) before deploying. Never deploy a dirty working tree.
- Treat a production deploy as requiring explicit per-run approval from Josh.
- Verify the public endpoint after deploying, before reporting the task complete.

### Deploying

To GitHub Pages: `git push origin main`. No SSH.

To the droplet, which is still the live route until DNS moves: the rsync script
now lives outside this repo, in the private workspace under `infrastructure/`,
because it names the host. It refuses a dirty working tree and stamps the deployed
commit. Single-file `tee` pushes over SSH are discouraged: they bypass its safety
checks and leave the deployed site diverging from the repository.

Sky Window is deployed independently from its own repository.

## Nginx config (droplet route only)

- Config file and TLS are managed on the host; see the private infrastructure docs.
- SSL via Certbot (auto-renew).
- Extensionless URLs handled via `try_files $uri $uri/ =404`.
- `/bsh` serves `bsh.html`; `/bot-stops-here.html` 301 redirects to `/bsh`.
- CSP: `script-src 'self' 'unsafe-inline'` (JS-enabled, known tradeoff).
  - If user input, auth, or form components are ever added, revisit whether JS
    should be removed entirely to deploy `script-src 'none'`.

## Retired pages

`building/` and `stack/` are retired. Their nav links are removed and they are
excluded from deployment, so both return 404 on the live site. Their source was
removed from this repository before publication and is gitignored; the files stay
on disk so `register/bin/render.py` can regenerate them if `RENDER_TARGETS`
re-enables those outputs.

## Verify

```bash
curl -s -o /dev/null -w "%{http_code}" https://joshdavidoff.com/
```

## Before deploying to the shared droplet (PaaS)

While the droplet route is still in use, the host runs several independent
services behind one nginx, each in its own account, unit, port, and venv.
Before any deploy there:

1. **Check for a concurrent deploy and claim the marker:** run
   `infrastructure/monitoring/deploy-lock.sh status`, then
   `acquire "<what you are deploying>"`, and `release` when done. This prevents
   the collision that happened on 2026-09-04.
2. Follow the SSH connection budget and deploy discipline in the workspace
   `AGENTS.md`.
3. Health, HTTP status, and TLS expiry are watched by `infrastructure/monitoring/`
   (a Mac-side check that alerts, plus an on-host status page). Verify the
   affected endpoint after deploying.
