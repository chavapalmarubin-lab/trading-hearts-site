# Trading Hearts México — flujo de medios

La biblioteca maestra permanece en iCloud. El sitio público consume únicamente copias aprobadas dentro de `mexico/assets/`.

## Por Custodio
```text
assets/characters/mx_rafael/
  headshot.png
  one-pager.png
  gallery/
  video/
  comics/
```
La misma estructura aplica a los 15 IDs.

- `headshot.png`: cuadrícula y cabecera del perfil.
- `one-pager.png`: expediente visual.
- `gallery/`: lookbook, lugares, objetos, vestuario y escenas; orden alfabético = orden web.
- `video/`: MP4/WebM/MOV.
- `comics/`: imágenes/PDF; si está vacío, la web muestra **PRÓXIMAMENTE**.

Después de añadir media:
```bash
python3 _rebuild_media_manifest.py
```
Esto actualiza `mexico-media.js` sin tocar la Matriz Humana.

## Importar desde iCloud
```bash
./_install_assets_from_icloud.sh "/ruta/a/TH Mexico/TH Cast"
```
El script copia, nunca mueve ni renombra originales. Si detecta versiones distintas del mismo activo, no decide arbitrariamente.

## Medios globales
```text
assets/brand/
assets/hero/
assets/locations/
assets/underground/
assets/sports/
assets/comics/
assets/video/
```
No publicar logos, fotos deportivas, fotogramas o material de terceros sin derechos de publicación; feeds informativos y derechos visuales son capas separadas.
