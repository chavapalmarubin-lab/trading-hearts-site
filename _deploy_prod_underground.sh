#!/bin/bash
# PRODUCTION DEPLOY — the Underground.
#
# WHY THIS EXISTS AND _deploy_prod_fast.sh DID NOT DO THE JOB:
# _deploy_prod_fast.sh deploys from a WARM STAGE (~/.th_preview_stage) and only re-syncs
# index.html and explore/ into it. Everything else in that stage is whatever was there last
# time. Run against 27 brand-new pages and 342 new images, it reported:
#
#     ✨ Success! Uploaded 0 files (1868 already uploaded)
#
# A green success message for a deploy that shipped nothing. The same shape as the Cloudflare
# 200 on a missing image: the tool told me it had done a thing it had not done.
#
# This script syncs the WHOLE site into the stage first. Slower. True.
exec > /tmp/th_prod_ug.log 2>&1
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$HOME/.npm-global/bin:$PATH"
SITE="/Users/salvadorpalma/Library/Mobile Documents/com~apple~CloudDocs/02_TRADING_HEARTS/Trading Hearts (1)/th_public_site"
STAGE="$HOME/.th_prod_stage_ug"
WR=$(command -v wrangler || echo ""); [ -z "$WR" ] && WRCMD="npx --yes wrangler" || WRCMD="wrangler"

mkdir -p "$STAGE"
# --delete-excluded: rsync PROTECTS excluded files from --delete, so an excluded file that is
# ALREADY in the stage from a previous run just sits there and ships (or, in the case of the
# 31 MB reader, kills the deploy). The stage must be what we exclude TO, not a graveyard.
rsync -a --delete --delete-excluded \
  --exclude='index.html.bak_*' --exclude='_deploy*.sh' --exclude='.git' \
  --exclude='.wrangler' --exclude='media/_orig_png' --exclude='qa' \
  --exclude='index_experience.html' \
  --exclude='media/america_250/era_02/comic_020_photoreal/TH_A250_020_READER.html' \
  "$SITE"/ "$STAGE"/
# ⚠ comic_020's READER is 31 MB — over the Pages 25 MiB cap, because its panels are base64
#   INLINED into the HTML. It has therefore NEVER been able to ship, and index.html links to
#   it, so that link is already dead in production. Excluding it changes nothing about what is
#   live; it only stops it killing every OTHER deploy. THE REAL FIX is to externalise its
#   panels to .webp files like the other 47 readers, which do not have this problem.

echo "staged files: $(find "$STAGE" -type f | wc -l)"
echo "underground pages staged: $(find "$STAGE" -name 'underground_*.html' | wc -l)"
echo "memory images staged:     $(find "$STAGE/media/underground" -name '*.webp' | wc -l)"
echo "saga files staged:        $(find "$STAGE/data/saga" -name '*.json' | wc -l)"

# ── THE 25 MiB GATE ───────────────────────────────────────────────────────────────────
# Cloudflare Pages REFUSES any single file over 25 MiB, and it refuses it at the END — after
# staging and uploading 2,209 files. Clara's film came in at 25.7 MiB and killed the whole
# deploy for 0.7 MiB of overage.
#
# Find it BEFORE the upload, name it, and refuse. A gate that fires after the work is not a
# gate, it is a post-mortem.
OVER=$(find "$STAGE" -type f -size +25000k)
if [ -n "$OVER" ]; then
  echo "⛔ DEPLOY REFUSED — Cloudflare Pages caps files at 25 MiB. These will be rejected:"
  echo "$OVER" | while read -r f; do
    echo "   $(du -h "$f" | cut -f1)  ${f#$STAGE/}"
  done
  echo "   Nothing was uploaded. Shrink them or exclude them, then run again."
  exit 1
fi
echo "size gate: no file over 25 MiB"

# ── THE PIPE ATE THE EXIT CODE. AGAIN. ────────────────────────────────────────────────
# This was:
#     $WRCMD pages deploy ... 2>&1 | tail -6
#     echo "PROD_EXIT $?"
#
# $? is the exit status of TAIL, which succeeds at printing six lines no matter how badly
# wrangler failed. The deploy that Cloudflare REJECTED for an oversized file printed:
#
#     ✘ [ERROR] Error: Pages only supports files up to 25 MiB in size
#     PROD_EXIT 0
#
# A green exit code on a deploy that shipped NOTHING. This is the same bug we already fixed
# once in _underground_ship.sh, in a different script, and it cost us the same lie.
#
#     NEVER READ $? THROUGH A PIPE.
$WRCMD pages deploy "$STAGE" --project-name trading-hearts-site --commit-dirty=true --branch main > /tmp/th_wrangler.out 2>&1
RC=$?
tail -6 /tmp/th_wrangler.out
echo "PROD_EXIT $RC"
[ $RC -ne 0 ] && echo "⛔ DEPLOY FAILED — nothing shipped. The exit code is wrangler's, not tail's."
exit $RC
