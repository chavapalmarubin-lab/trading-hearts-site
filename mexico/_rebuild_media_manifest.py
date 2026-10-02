#!/usr/bin/env python3
from pathlib import Path
import json
ROOT = Path(__file__).resolve().parent
CHAR_ROOT = ROOT / "assets" / "characters"
IDS = ["mx_rafael","mx_ines","mx_lucia","mx_damian","mx_octavio","mx_jimena","mx_adrian","mx_ernesto","mx_mercedes","mx_valeria","mx_santiago","mx_elena","mx_alma","mx_renata","mx_mariana"]
IMG = {".png", ".jpg", ".jpeg", ".webp", ".avif"}
VID = {".mp4", ".webm", ".mov", ".m4v"}
COMIC = IMG | {".pdf"}
def rel(p): return p.relative_to(ROOT).as_posix()
def files(d, exts):
    if not d.exists(): return []
    return [rel(p) for p in sorted(d.iterdir()) if p.is_file() and p.suffix.lower() in exts and not p.name.startswith(".")]
out={}
for cid in IDS:
    b=CHAR_ROOT/cid
    out[cid]={"headshot":rel(b/"headshot.png"),"onePager":rel(b/"one-pager.png"),"gallery":files(b/"gallery",IMG),"videos":files(b/"video",VID),"comics":files(b/"comics",COMIC)}
(ROOT/"mexico-media.js").write_text("window.THMX_MEDIA = "+json.dumps(out,ensure_ascii=False,indent=2)+";\n",encoding="utf-8")
print("THMX media manifest rebuilt")
for cid,v in out.items(): print(f"{cid}: gallery={len(v['gallery'])} videos={len(v['videos'])} comics={len(v['comics'])}")
