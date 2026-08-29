# joshdavidoff.com

Static personal site deployed to a DigitalOcean droplet.

Deployment inventory key: `joshdavidoff_site` in [deployments.yaml](/Users/josh/codex/infrastructure/deployments.yaml). The nested Sky Window project uses the `sky_window` entry.

Canonical access and lockout recovery: [SSH_ACCESS_AND_RECOVERY.md](/Users/josh/codex/infrastructure/REDACTED-HOST/SSH_ACCESS_AND_RECOVERY.md). Direct root SSH is disabled; use the `josh` account and `sudo`, and do not loop failed connection attempts.

## Deployment

**Git-based deployment is the intended path.** Deploy by pushing committed code to the remote and letting the deploy run from there. Do not hand-copy files to the droplet, and do not deploy uncommitted local changes.

> **Status: not yet wired up.** As of 2026-08-29 this repository is on `main` with **no git remote configured**, so the git path does not exist yet. Until it does, the SSH fallback below is the only working route. Once the remote and deploy hook are in place, delete this notice and the fallback section.

Rules that apply either way:

- Only deploy code that is committed and pushed. Never deploy a dirty working tree.
- Treat a production deploy as requiring explicit per-run approval from Josh.
- Verify the public endpoint after deploying, before reporting the task complete.

### SSH fallback (until the git path exists)

```bash
# SSH as josh user (key auth via ~/.ssh/id_ed25519)
ssh josh@REDACTED-HOST

# Web root (root:root owned, use sudo)
/var/www/joshdavidoff.com/

# Deploy the whole site (safe to run from any directory)
./scripts/deploy-site.sh
```

Always use `scripts/deploy-site.sh` for full-site deployments instead of copying its rsync command. The script excludes the Sky Window source, protects deployed `/sky` files from `--delete`, and refuses to deploy if either the local source or remote installation is missing. Sky Window is deployed independently using `flight tracker sky window/DEPLOY.md`.

Single-file `tee` pushes over SSH are discouraged. They bypass the script's safety checks and leave the deployed site diverging from the repository, which is exactly what the git-based path is meant to end.

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
