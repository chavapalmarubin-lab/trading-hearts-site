#!/bin/bash
exec > /tmp/th_prod.log 2>&1
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$HOME/.npm-global/bin:$PATH"
pkill -f '.th_prod_stage' 2>/dev/null; sleep 1
SITE="/Users/salvadorpalma/Library/Mobile Documents/com~apple~CloudDocs/02_TRADING_HEARTS/Trading Hearts (1)/th_public_site"
STAGE="$HOME/.th_preview_stage"
WR=$(command -v wrangler || echo ""); [ -z "$WR" ] && WRCMD="npx --yes wrangler" || WRCMD="wrangler"
SRC_MD5=$(md5 -q "$SITE/index.html")
STG_MD5=$(md5 -q "$STAGE/index.html" 2>/dev/null)
echo "src=$SRC_MD5 stage=$STG_MD5"
if [ "$SRC_MD5" != "$STG_MD5" ]; then
  echo "index differs -> copying just index.html into warm stage"
  cp "$SITE/index.html" "$STAGE/index.html"
fi
# The 28 deep EXPLORE pages (museum objects, primary sources, world map, what we don't know).
# The warm stage is only kept in sync for index.html, so sync these explicitly or the hub
# links deploy pointing at pages that aren't there.
mkdir -p "$STAGE/explore"
rsync -a --delete "$SITE/explore/" "$STAGE/explore/"
echo "explore pages staged: $(find "$STAGE/explore" -name '*.html' | wc -l)"

echo "staged files: $(find "$STAGE" -type f | wc -l)"
$WRCMD pages deploy "$STAGE" --project-name trading-hearts-site --commit-dirty=true --branch main 2>&1 | tail -8
echo "DONE_EXIT $?"
