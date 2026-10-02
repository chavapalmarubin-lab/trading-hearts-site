#!/bin/bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/mexico"

node --check mexico-data.js
node --check mexico.js

python3 - <<'PY'
from pathlib import Path
import json, re, sys

s=Path("mexico-data.js").read_text(encoding="utf-8")
prefix="window.THMX_DATA = "
if not s.startswith(prefix):
    raise SystemExit("FAIL: THMX_DATA prefix missing")
blob=s[len(prefix):].strip()
if blob.endswith(";"):
    blob=blob[:-1]
d=json.loads(blob)
cast=d.get("cast", [])

assert len(cast)==15, f"FAIL: expected 15 cast, found {len(cast)}"
assert len({c["id"] for c in cast})==15, "FAIL: duplicate cast IDs"
assert all(len(c.get("hm", []))==26 for c in cast), "FAIL: every cast member must have 26 HM fields"
assert sum(len(c["hm"]) for c in cast)==390, "FAIL: expected 390 HM records"
assert all(len(c.get("line", []))>=2 for c in cast), "FAIL: every cast member needs an Underground line"
assert all(c.get("sports", {}).get("primary") for c in cast), "FAIL: every cast member needs sports identity"

html=Path("index.html").read_text(encoding="utf-8")
required=["lang=\"es-MX\"","id=\"personajes\"","id=\"underground\"","id=\"comics\"","PRÓXIMAMENTE"]
for token in required:
    assert token in html, f"FAIL: missing {token}"

images=list(Path("assets/characters").glob("mx_*.png")) if Path("assets/characters").exists() else []
print(f"PASS: cast={len(cast)}, HM={sum(len(c['hm']) for c in cast)}, Underground lines={len(cast)}")
print(f"INFO: canonical images present={len(images)}/15")
if len(images)!=15:
    print("BLOCKER: canonical image installation incomplete")
    sys.exit(3)
print("PASS: website structural QA and 15/15 canonical images")
PY
