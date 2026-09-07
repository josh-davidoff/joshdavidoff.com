# joshdavidoff.com

Static personal site deployed to a DigitalOcean droplet.

Deployment inventory key: `joshdavidoff_site` in [deployments.yaml](/Users/josh/codex/infrastructure/deployments.yaml). The nested Sky Window project uses the `sky_window` entry.

Canonical access and lockout recovery: [SSH_ACCESS_AND_RECOVERY.md](/Users/josh/codex/infrastructure/REDACTED-HOST/SSH_ACCESS_AND_RECOVERY.md). Direct root SSH is disabled; use the `josh` account and `sudo`, and do not loop failed connection attempts.

## Git

The site is a git repo (initial commit 2026-08-29) with a private GitHub remote: [github.com/josh-davidoff/jd-site](https://github.com/josh-davidoff/jd-site) (`origin`, HTTPS, auth via `gh`).

`.gitignore` excludes `Directions.html`/`directions/` (personal notes), `uploads/` (scratch), and `flight tracker sky window/` (Sky Window is a separate project with its own `DEPLOY.md`; it is not tracked in this repo).

## Deployment

**Git-based deployment (droplet pulling from `origin`) is the umbrella workspace's preferred end-state** (see `/Users/josh/codex/AGENTS.md`), but this project deliberately still deploys via the SSH/rsync script below rather than a pull-based hook — a conscious choice for a small static site, not an oversight. Git currently buys local history, diff review before deploying, and rollback via `git revert`; it does not yet change how bits reach the droplet.

Rules that apply regardless of how deploy is eventually wired:

- Commit (and push to `origin`) before deploying. Never deploy a dirty working tree.
- Treat a production deploy as requiring explicit per-run approval from Josh.
- Verify the public endpoint after deploying, before reporting the task complete.

### Deploying (current route: SSH/rsync)

```bash
# SSH as josh user (key auth via ~/.ssh/id_ed25519)
ssh josh@REDACTED-HOST

# Web root (root:root owned, use sudo)
/var/www/joshdavidoff.com/

# Deploy the whole site (safe to run from any directory)
./scripts/deploy-site.sh
```

Always use `scripts/deploy-site.sh` for full-site deployments instead of copying its rsync command. The script excludes the Sky Window source, protects deployed `/sky` files from `--delete`, and refuses to deploy if either the local source or remote installation is missing. Sky Window is deployed independently using `flight tracker sky window/DEPLOY.md`.

Single-file `tee` pushes over SSH are discouraged. They bypass the script's safety checks and leave the deployed site diverging from the repository.

## Nginx config

- Config: `/etc/nginx/sites-available/joshdavidoff.com`
- SSL via Certbot (auto-renew)
- Extensionless URLs handled via `try_files $uri $uri/ =404`
- `/bsh` serves `bsh.html`, `/bot-stops-here.html` 301 redirects to `/bsh`
- CSP: `script-src 'self' 'unsafe-inline'` (JS-enabled, known tradeoff)
  - If user input, auth, or form components are ever added, revisit whether JS should be removed entirely to deploy `script-src 'none'`.

## Verify

```bash
curl -s -o /dev/null -w "%{http_code}" https://joshdavidoff.com/
```
## Before deploying to the shared droplet (PaaS)

This service runs on the shared DigitalOcean droplet (REDACTED-HOST), operated as a small PaaS: independent services behind one nginx, each in its own account, unit, port, and venv. Before any deploy here:

1. **Check for a concurrent deploy and claim the marker:** `/Users/josh/codex/infrastructure/monitoring/deploy-lock.sh status`, then `acquire "<what you are deploying>"`, and `release` when done. Prevents the collision that happened on 2026-09-04.
2. Follow the SSH connection budget and deploy discipline in `/Users/josh/codex/AGENTS.md`.
3. Health, HTTP status, and TLS expiry are watched by `/Users/josh/codex/infrastructure/monitoring/` (a Mac-side check that alerts via `alerter`, plus an on-host status page). Verify the affected endpoint after deploying.
