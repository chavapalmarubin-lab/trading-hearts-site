#!/bin/bash
cd "/Users/salvadorpalma/Library/Mobile Documents/com~apple~CloudDocs/02_TRADING_HEARTS/Trading Hearts (1)/th_public_site"
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
B="file:///Users/salvadorpalma/Library/Mobile%20Documents/com~apple~CloudDocs/02_TRADING_HEARTS/Trading%20Hearts%20(1)/th_public_site/index.html"
mkdir -p qa
"$CH" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,2900 --screenshot="qa/_worlds_full.png" "$B" >/dev/null 2>&1
/usr/bin/python3 - <<'PY'
from PIL import Image
im=Image.open("qa/_worlds_full.png").convert("RGB")
# crop the region just below the hero where the interactive module sits
im.crop((0,760,im.width,2020)).save("qa/worlds_module.png")
print("crop ok", im.size)
PY
echo DONE
