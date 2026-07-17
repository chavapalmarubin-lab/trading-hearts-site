#!/bin/bash
# Deploy the ORIGINAL site (with all Underground/hub/world-map work) to PRODUCTION (main branch) -> tradinghearts.com
exec > /tmp/th_prod.log 2>&1
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$HOME/.npm-global/bin:$PATH"
SITE="/Users/salvadorpalma/Library/Mobile Documents/com~apple~CloudDocs/02_TRADING_HEARTS/Trading Hearts (1)/th_public_site"
cd "$SITE" || { echo NO_SITE; exit 1; }
WR=$(command -v wrangler || echo ""); [ -z "$WR" ] && WRCMD="npx --yes wrangler" || WRCMD="wrangler"
echo "index.html is:"; grep -o 'id="gate"' index.html >/dev/null 2>&1 && echo EXPERIENCE || echo ORIGINAL
STAGE="$HOME/.th_prod_stage"; mkdir -p "$STAGE"
rsync -a --delete --exclude='index.html.bak_*' --exclude='_deploy*.sh' --exclude='.git' --exclude='.wrangler' --exclude='media/_orig_png' --exclude='qa' --exclude='_qa_*' --exclude='index_experience.html' "$SITE"/ "$STAGE"/
echo "staged files: $(find "$STAGE" -type f | wc -l)"
$WRCMD pages deploy "$STAGE" --project-name trading-hearts-site --commit-dirty=true --branch main 2>&1 | tail -8
echo "DONE_EXIT $?"
