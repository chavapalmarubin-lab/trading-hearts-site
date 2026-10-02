#!/usr/bin/env bash
set -euo pipefail
SITE_DIR="$(cd "$(dirname "$0")" && pwd)"
DEST="$SITE_DIR/assets/characters"
if [[ $# -ge 1 ]]; then SOURCE="$1"; else
  CANDIDATES=("$HOME/Library/Mobile Documents/com~apple~CloudDocs/02_TRADING_HEARTS/Trading Hearts (1)/TH Mexico/TH Cast" "$HOME/Library/Mobile Documents/com~apple~CloudDocs/Trading Hearts (1)/TH Mexico/TH Cast" "$HOME/Library/Mobile Documents/com~apple~CloudDocs/Trading Hearts/TH Mexico/TH Cast")
  SOURCE=""; for c in "${CANDIDATES[@]}"; do [[ -d "$c" ]] && SOURCE="$c" && break; done
fi
if [[ -z "${SOURCE:-}" || ! -d "$SOURCE" ]]; then echo "No encontré TH Cast automáticamente."; echo "Uso: $0 '/ruta/a/TH Mexico/TH Cast'"; exit 2; fi
python3 - "$SOURCE" "$DEST" <<'PY'
from pathlib import Path
import hashlib, shutil, sys, unicodedata, re
src=Path(sys.argv[1]).expanduser().resolve(); dest=Path(sys.argv[2]).resolve()
characters={'mx_rafael':['Rafael','Barragan'],'mx_ines':['Ines','Barragan'],'mx_lucia':['Lucia','Mendoza'],'mx_damian':['Damian','de','la','Vega'],'mx_octavio':['Octavio','Beltran'],'mx_jimena':['Jimena','Beltran'],'mx_adrian':['Adrian','Salcedo'],'mx_ernesto':['Ernesto','Calarcel'],'mx_mercedes':['Mercedes','de','la','Vega'],'mx_valeria':['Valeria','Sada'],'mx_santiago':['Santiago','Arriaga'],'mx_elena':['Elena','Duarte'],'mx_alma':['Alma','Rios'],'mx_renata':['Renata','Veliz'],'mx_mariana':['Mariana','Escalante']}
def norm(s):
    s=''.join(c for c in unicodedata.normalize('NFD',s) if unicodedata.category(c)!='Mn')
    return re.sub(r'[^a-z0-9]+',' ',s.lower()).strip()
def sha(p):
    h=hashlib.sha256()
    with p.open('rb') as f:
        for b in iter(lambda:f.read(1024*1024),b''): h.update(b)
    return h.hexdigest()
def choose(matches,label,cid):
    if not matches: return None
    by={}
    for p in matches: by.setdefault(sha(p),[]).append(p)
    if len(by)>1:
        print(f'AMBIGUO {cid} {label}: hay {len(matches)} archivos con bytes diferentes:')
        for p in matches: print('  ',p)
        return None
    return sorted(matches,key=lambda p:(len(p.parts),str(p)))[0]
all_media=[p for p in src.rglob('*') if p.is_file() and p.suffix.lower() in {'.png','.jpg','.jpeg','.webp'}]
installed=0
for cid,tokens in characters.items():
    nt=[norm(t) for t in tokens]; head=[]; one=[]
    for p in all_media:
        n=norm(p.name)
        if not all(t in n for t in nt): continue
        if 'canonical headshots' in n or ('canonical' in n and 'headshot' in n): head.append(p)
        if 'one pager' in n: one.append(p)
    hp=choose(head,'headshot',cid); op=choose(one,'one-pager',cid); d=dest/cid; d.mkdir(parents=True,exist_ok=True)
    if hp: shutil.copy2(hp,d/'headshot.png'); installed+=1; print(f'OK {cid} headshot <- {hp.name}')
    else: print(f'FALTA {cid} headshot')
    if op: shutil.copy2(op,d/'one-pager.png'); installed+=1; print(f'OK {cid} one-pager <- {op.name}')
    else: print(f'FALTA {cid} one-pager')
print(f'Instalados {installed}/30 activos base.')
PY
python3 "$SITE_DIR/_rebuild_media_manifest.py"
