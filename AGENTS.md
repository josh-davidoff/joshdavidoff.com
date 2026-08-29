# joshdavidoff.com

Static personal site. Deployed to a DigitalOcean droplet via SSH.

Deployment inventory key: `joshdavidoff_site` in [deployments.yaml](/Users/josh/codex/infrastructure/deployments.yaml). The nested Sky Window project uses the `sky_window` entry.

Canonical access and lockout recovery: [SSH_ACCESS_AND_RECOVERY.md](/Users/josh/codex/infrastructure/REDACTED-HOST/SSH_ACCESS_AND_RECOVERY.md). Direct root SSH is disabled; use the `josh` account and `sudo`, and do not loop failed connection attempts.

## Deployment

```bash
# SSH as josh user (key auth via ~/.ssh/id_ed25519)
ssh josh@REDACTED-HOST

# Web root (root:root owned, use sudo)
/var/www/joshdavidoff.com/

# Deploy a single file
cat index.html | ssh josh@REDACTED-HOST "sudo tee /var/www/joshdavidoff.com/index.html > /dev/null"

# Deploy the whole site (safe to run from any directory)
./scripts/deploy-site.sh
```

Always use `scripts/deploy-site.sh` for full-site deployments instead of copying its rsync command. The script excludes the Sky Window source, protects deployed `/sky` files from `--delete`, and refuses to deploy if either the local source or remote installation is missing. Sky Window is deployed independently using `flight tracker sky window/DEPLOY.md`.

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
