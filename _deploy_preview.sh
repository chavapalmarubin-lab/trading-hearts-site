#!/bin/bash
# Deploy the experiential build to a Cloudflare Pages PREVIEW branch (production untouched).
exec > /tmp/th_preview_deploy.log 2>&1
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$HOME/.npm-global/bin:$PATH"
SITE="/Users/salvadorpalma/Library/Mobile Documents/com~apple~CloudDocs/02_TRADING_HEARTS/Trading Hearts (1)/th_public_site"
cd "$SITE" || { echo "NO SITE DIR"; exit 1; }
WR=$(command -v wrangler || echo ""); [ -z "$WR" ] && WRCMD="npx --yes wrangler" || WRCMD="wrangler"

# swap experience in as homepage ONLY for this preview build
cp -f index.html index_classic.html   # ensure archive is current-production homepage
cp -f index_experience.html index.html
echo "=== staging preview ==="
STAGE="$HOME/.th_preview_stage"; mkdir -p "$STAGE"
rsync -a --delete --exclude='index.html.bak_*' --exclude='_deploy*.sh' --exclude='.git' --exclude='.wrangler' --exclude='media/_orig_png' --exclude='qa' "$SITE"/ "$STAGE"/
echo "staged files: $(find "$STAGE" -type f | wc -l)"
echo "=== deploy preview branch ==="
$WRCMD pages deploy "$STAGE" --project-name trading-hearts-site --commit-dirty=true --branch preview 2>&1
echo "=== DEPLOY_EXIT $? ==="
# restore production-safe local homepage (production only changes on a main-branch deploy)
cp -f index_classic.html index.html
echo "=== restored local index.html to classic ==="
