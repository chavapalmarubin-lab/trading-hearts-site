#!/bin/bash
# Deploy th_public_site to Cloudflare Pages (direct upload). Logs to /tmp/th_deploy.log
# Uses a PERSISTENT local stage so unchanged iCloud files (comics) are skipped, not re-downloaded.
exec > /tmp/th_deploy.log 2>&1
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$HOME/.npm-global/bin:$PATH"
SITE="/Users/salvadorpalma/Library/Mobile Documents/com~apple~CloudDocs/02_TRADING_HEARTS/Trading Hearts (1)/th_public_site"
cd "$SITE" || { echo "NO SITE DIR"; exit 1; }
echo "=== wrangler version ==="
WR=$(command -v wrangler || echo "")
if [ -z "$WR" ]; then echo "wrangler not on PATH; trying npx"; WRCMD="npx --yes wrangler"; else echo "$WR"; WRCMD="wrangler"; fi
$WRCMD --version 2>&1 | head -1
echo "=== syncing to persistent local stage (only changed files) ==="
STAGE="$HOME/.th_deploy_stage"   # local disk, persistent across deploys, NOT iCloud
mkdir -p "$STAGE"
# rsync compares size+mtime from iCloud placeholders WITHOUT downloading unchanged files;
# only changed/new files are read+copied. --delete keeps the stage in sync with the site.
# --delete-excluded: rsync PROTECTS excluded files from --delete, so anything excluded that is
# already in the stage from an older run sits there and ships (or kills the deploy).
rsync -a --delete --delete-excluded \
  --exclude='index.html.bak_*' --exclude='_deploy_cf.sh' --exclude='.git' \
  --exclude='media/_orig_png' --exclude='qa' \
  --exclude='media/america_250/era_02/comic_020_photoreal/TH_A250_020_READER.html' \
  "$SITE"/ "$STAGE"/
echo "staged files: $(find "$STAGE" -type f | wc -l)"

# ── THE 25 MiB GATE. FIND IT BEFORE THE UPLOAD, NOT AFTER. ────────────────────────────
# Cloudflare Pages rejects any single file over 25 MiB — and it rejects it at the END of the
# push. comic_020's READER is 31 MB (its panels are base64-inlined), so it can NEVER ship, and
# it was silently killing every deploy that went through this script. This script's output is
# CAPTURED by the era driver, so the failure was invisible: the driver just sat there.
OVER=$(find "$STAGE" -type f -size +25000k)
if [ -n "$OVER" ]; then
  echo "⛔ DEPLOY REFUSED — over the Pages 25 MiB cap:"
  echo "$OVER" | while read -r f; do echo "   $(du -h "$f" | cut -f1)  ${f#$STAGE/}"; done
  exit 1
fi
echo "size gate: no file over 25 MiB"

# NEVER READ $? THROUGH A PIPE. (This one didn't pipe — but it also never checked, so a failed
# deploy and a good one looked identical to the caller.)
$WRCMD pages deploy "$STAGE" --project-name trading-hearts-site --commit-dirty=true --branch main 2>&1
RC=$?
echo "=== DEPLOY_EXIT $RC ==="
exit $RC
