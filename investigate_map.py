import re
R = "/Users/salvadorpalma/Library/Mobile Documents/com~apple~CloudDocs/02_TRADING_HEARTS/Trading Hearts (1)/th_public_site"
s = open(R + "/index.html", encoding="utf-8").read()

# where is the legend string 's' injected into the DOM?
for m in re.finditer(r'([A-Za-z0-9_]+)\.innerHTML\s*=\s*s\b', s):
    j = m.start()
    print("INJECT:", repr(s[j-80:j+40]))

# the svg element that holds the map (look for <svg ... id=...)
for m in re.finditer(r'<svg[^>]{0,120}', s):
    print("SVG TAG:", m.group(0)[:130])

# CHOOSE YOUR EXPERIENCE box + what follows (end of legend build)
i = s.find("CHOOSE YOUR EXPERIENCE")
print("LEGEND-END:", repr(s[i-10:i+520]))

# does openVideo modal markup exist?
print("has video-backdrop:", "id=\"video-backdrop\"" in s or "id='video-backdrop'" in s)
print("has video-player:", "video-player" in s)
