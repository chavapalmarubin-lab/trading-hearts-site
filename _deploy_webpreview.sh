#!/bin/bash
# Deploy the CURRENT index.html (Living Web rebuild) to a Cloudflare Pages PREVIEW branch.
# Production (branch main) is untouched. Prints the preview URL.
exec > /tmp/th_webpreview.log 2>&1
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$HOME/.npm-global/bin:$PATH"
SITE="/Users/salvadorpalma/Library/Mobile Documents/com~apple~CloudDocs/02_TRADING_HEARTS/Trading Hearts (1)/th_public_site"
cd "$SITE" || { echo "NO SITE DIR"; exit 1; }
WR=$(command -v wrangler || echo ""); [ -z "$WR" ] && WRCMD="npx --yes wrangler" || WRCMD="wrangler"
STAGE="$HOME/.th_deploy_stage"; mkdir -p "$STAGE"
rsync -a --delete --delete-excluded \
  --exclude='index.html.bak_*' --exclude='_deploy*.sh' --exclude='.git' \
  --exclude='media/_orig_png' --exclude='qa' \
  --exclude='media/america_250/era_02/comic_020_photoreal/TH_A250_020_READER.html' \
  "$SITE"/ "$STAGE"/
OVER=$(find "$STAGE" -type f -size +25000k)
if [ -n "$OVER" ]; then echo "REFUSED — over 25 MiB:"; echo "$OVER"; exit 1; fi
echo "=== deploy preview branch (webpreview) ==="
$WRCMD pages deploy "$STAGE" --project-name trading-hearts-site --commit-dirty=true --branch webpreview 2>&1
echo "=== DEPLOY_EXIT $? ==="
