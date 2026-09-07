# joshdavidoff.com

Static personal site. Hand-written HTML with no build step.

**This repository is slated to be published publicly.** Do not commit host
addresses, server paths, credentials, private notes, or anything else that
should not be world-readable. Infrastructure details live in the private
workspace under `infrastructure/`, not here.

Deployment inventory key: `joshdavidoff_site` in the workspace deployment
inventory (`infrastructure/deployments.yaml`, private). The nested Sky Window
project uses the `sky_window` entry and has its own repository.

Host access, addresses, and lockout recovery are documented in the private
workspace under `infrastructure/`. Direct root SSH is disabled; use the
unprivileged account and `sudo`, and do not loop failed connection attempts.

## Git

The site is a git repo (initial commit 2026-08-29) with a GitHub remote:
[github.com/josh-davidoff/jd-site](https://github.com/josh-davidoff/jd-site)
(`origin`, HTTPS, auth via `gh`).

`.gitignore` excludes `Directions.html`/`directions/` (personal notes),
`uploads/` (scratch), and `flight tracker sky window/` (Sky Window is a
separate project with its own repository and deploy doc; it is not tracked
here).

## Deployment

The site is migrating to GitHub Pages, which deploys on push to `main`. Until
that cutover completes, it deploys to the shared droplet via the rsync script
described below. The migration plan is
`infrastructure/deploy-decoupling-plan.md` in the private workspace.

Rules that apply regardless of how deploy is wired:

- Commit (and push to `origin`) before deploying. Never deploy a dirty working tree.
- Treat a production deploy as requiring explicit per-run approval from Josh.
- Verify the public endpoint after deploying, before reporting the task complete.

### Deploying (current route: SSH/rsync, being retired)

Run `scripts/deploy-site.sh` from anywhere in the repo. It reads the host and
web root from its own configuration, refuses a dirty working tree, stamps the
deployed commit, excludes the Sky Window source, and protects the deployed
`/sky` files from `--delete`.

Always use that script rather than copying its rsync command. Single-file `tee`
pushes over SSH are discouraged: they bypass the script's safety checks and
leave the deployed site diverging from the repository.

Sky Window is deployed independently from its own project.

## Nginx config (droplet route only)

- Config file and TLS are managed on the host; see the private infrastructure docs.
- SSL via Certbot (auto-renew).
- Extensionless URLs handled via `try_files $uri $uri/ =404`.
- `/bsh` serves `bsh.html`; `/bot-stops-here.html` 301 redirects to `/bsh`.
- CSP: `script-src 'self' 'unsafe-inline'` (JS-enabled, known tradeoff).
  - If user input, auth, or form components are ever added, revisit whether JS
    should be removed entirely to deploy `script-src 'none'`.

## Unpublished pages

`building/` and `stack/` are drafts. They are excluded from deployment and
their nav links are removed, so they are not reachable on the live site. They
remain in the repository as source.

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
