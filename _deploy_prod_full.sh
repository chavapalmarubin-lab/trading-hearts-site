#!/bin/bash
# FULL deploy to PRODUCTION (branch main → tradinghearts.com) from the already-warm webpreview
# stage. That stage is kept current by _deploy_webpreview.sh and carries EVERYTHING the Living Web
# reader needs (assets/episodes/, episodes_index.json, today.json) — unlike _deploy_prod_fast.sh.
exec > /tmp/th_prod_full.log 2>&1
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$HOME/.npm-global/bin:$PATH"
STAGE="$HOME/.th_deploy_stage"
WR=$(command -v wrangler || echo ""); [ -z "$WR" ] && WRCMD="npx --yes wrangler" || WRCMD="wrangler"
[ -f "$STAGE/index.html" ] || { echo "NO WARM STAGE — run _deploy_webpreview.sh first"; exit 1; }
echo "staged files: $(find "$STAGE" -type f | wc -l)"
echo "=== deploy PRODUCTION (branch main) ==="
$WRCMD pages deploy "$STAGE" --project-name trading-hearts-site --commit-dirty=true --branch main
echo "=== DEPLOY_EXIT $? ==="
