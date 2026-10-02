# Trading Hearts México — sitio v1.2

Construcción de `/mexico`, manteniendo el lenguaje visual y la arquitectura pública de Trading Hearts, completamente en español.

## Incluye
- 15 personajes de Trading Hearts México.
- 26 campos de Matriz Humana por personaje (390 entradas).
- Underground México con 15 líneas.
- Matriz deportiva con Liga MX, F1, NFL, LFA/ONEFA y deportes específicos.
- Arquitectura de medios por Custodio: Headshot, One-Pager, Galería, Video y Cómics.
- Cómics y Diario México marcados **Próximamente**.
- Responsive y fallback visual si un activo canónico no está instalado.

## Archivos clave
- `index.html` — página y paneles de medios.
- `mexico-data.js` — elenco/HM y contrato de medios.
- `mexico-media.js` — manifiesto generado de archivos disponibles.
- `mexico.js` — render del sitio, Matriz Humana, Underground y medios.
- `MEDIA_WORKFLOW.md` — flujo de activos.
- `ASSET_MAP.md` — mapeo iCloud → IDs web.
- `_install_assets_from_icloud.sh` — copia segura de Headshots/One-Pagers.
- `_rebuild_media_manifest.py` — descubre galería/video/cómics.
- `_qa_mexico.sh` — QA estructural y de activos base.

## Estado
Rama de construcción/revisión. Los originales permanecen en iCloud; el sitio consume copias aprobadas. No implica autorización de publicación en producción.

Ruta propuesta: `https://tradinghearts.com/mexico/`
