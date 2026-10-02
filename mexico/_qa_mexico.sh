#!/bin/bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/mexico"
node --check mexico-data.js
node --check mexico-media.js
node --check mexico.js
python3 - <<'PY'
from pathlib import Path
import json, sys
s=Path("mexico-data.js").read_text(encoding="utf-8"); prefix="window.THMX_DATA = "
assert s.startswith(prefix),"FAIL: THMX_DATA prefix missing"
blob=s[len(prefix):].strip(); blob=blob[:-1] if blob.endswith(";") else blob
d=json.loads(blob); cast=d.get("cast",[])
assert len(cast)==15 and len({c["id"] for c in cast})==15,"FAIL: cast identity"
assert all(len(c.get("hm",[]))==26 for c in cast) and sum(len(c["hm"]) for c in cast)==390,"FAIL: HM"
assert all(c.get("media",{}).get("headshot") and c.get("media",{}).get("onePager") for c in cast),"FAIL: media contract"
assert all(c.get("sports",{}).get("primary") for c in cast),"FAIL: sports"
html=Path("index.html").read_text(encoding="utf-8")
for token in ['lang="es-MX"','id="personajes"','id="underground"','id="modalOnePager"','id="modalGallery"','id="modalVideos"','mexico-media.js','PRÓXIMAMENTE']:
    assert token in html,f"FAIL: missing {token}"
heads=list(Path("assets/characters").glob("mx_*/headshot.png"))
one=list(Path("assets/characters").glob("mx_*/one-pager.png"))
print(f"PASS: cast={len(cast)}, HM=390, media-contract=15, headshots={len(heads)}/15, one-pagers={len(one)}/15")
if len(heads)!=15 or len(one)!=15:
    print("BLOCKER: faltan activos canónicos base para preview final")
    sys.exit(3)
print("PASS: website structural QA + 30/30 canonical base assets")
PY
