#!/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/mexico/assets/characters"
ICLOUD_BASE="$HOME/Library/Mobile Documents/com~apple~CloudDocs/02_TRADING_HEARTS/Trading Hearts (1)/TH Mexico/TH Cast"

mkdir -p "$OUT"

copy_exact() {
  local dest="$1"; shift
  local found=""
  for rel in "$@"; do
    if [ -f "$ICLOUD_BASE/$rel" ]; then found="$ICLOUD_BASE/$rel"; break; fi
  done
  if [ -z "$found" ]; then
    echo "MISSING $dest"
    return 1
  fi
  cp -f "$found" "$OUT/$dest"
  echo "COPIED $dest <- $(basename "$found")"
}

copy_exact mx_rafael.png "TH_Mexico_Canonical_Batch_1/01_Rafael_Barragan_Canonical_Headshots.png"
copy_exact mx_ines.png "TH_Mexico_Canonical_Batch_1/03_Ines_Barragan_Canonical_Headshots.png"
copy_exact mx_lucia.png "TH_Mexico_Canonical_Batch_1/05_Lucia_Mendoza_Canonical_Headshots.png"
copy_exact mx_damian.png "TH_Mexico_Canonical_Batch_1/07_Damian_de_la_Vega_Canonical_Headshots.png"
copy_exact mx_octavio.png "TH_Mexico_Canonical_Batch_1/Octavio_Don_Tavo_Beltran_Canonical_Headshots.png"

copy_exact mx_jimena.png "TH_Mexico_Canonical_Batch_2/01_Jimena_Beltran_Canonical_Headshots.png"
copy_exact mx_adrian.png "TH_Mexico_Canonical_Batch_2/03_Adrian_Salcedo_Canonical_Headshots.png"
copy_exact mx_ernesto.png   "TH_Mexico_Canonical_Batch_2/05_Ernesto_Calarcel_Canonical_Headshots.png"   "TH_Mexico_Canonical_Batch_2/05_Ernesto_Valcarcel_Canonical_Headshots.png"
copy_exact mx_mercedes.png   "TH_Mexico_Canonical_Batch_2/07_Mercedes_de_la_Vega_Canonical_Headshots.png"   "TH_Mexico_Canonical_Batch_2/07_Mercedes_De_La_Vega_Canonical_Headshots.png"
copy_exact mx_valeria.png "TH_Mexico_Canonical_Batch_2/09_Valeria_Sada_Canonical_Headshots.png"

copy_exact mx_elena.png "01_Elena_Duarte_Canonical_Headshots.png"
copy_exact mx_alma.png "03_Alma_Rios_Canonical_Headshots.png"
copy_exact mx_renata.png "05_Renata_Veliz_Canonical_Headshots.png"
copy_exact mx_mariana.png "07_Mariana_Escalante_Canonical_Headshots.png"
copy_exact mx_santiago.png "09_Santiago_Arriaga_Canonical_Headshots.png"

COUNT="$(find "$OUT" -maxdepth 1 -type f -name 'mx_*.png' | wc -l | tr -d ' ')"
if [ "$COUNT" != "15" ]; then
  echo "FAIL: expected 15 canonical images; found $COUNT"
  exit 2
fi

echo "PASS: 15 canonical Trading Hearts México images installed."
