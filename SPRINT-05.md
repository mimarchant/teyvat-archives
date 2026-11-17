# Sprint 05 — Crónicas

`/cronicas/` obtiene sus entradas de la colección tipada `chronicles`; no mantiene un catálogo paralelo ni incorpora lore nuevo. Incluye los borradores con su estado editorial visible.

## Contrato editorial

- `era` y `region` son opcionales. Su ausencia se muestra como información sin documentar.
- `timelineOrder` expresa una secuencia relativa, nunca una fecha.
- Solo `chronologyConfirmed: true` junto con `timelineOrder` permite entrar en la secuencia documentada. Debe usarse únicamente cuando las fuentes del artículo respaldan ese orden. El valor por defecto es `false`, incluso para entradas antiguas con un número de orden.
- Las demás entradas aparecen en un grupo sin ubicación cronológica confirmada. El orden por identificador dentro de ese grupo es estable y no implica relaciones históricas.
- Canon, interpretación, teoría y sin resolver se mantienen separados del estado de revisión.
- Khaenri'ah sigue siendo un borrador sin fuentes; sus metadatos y contenido no se modificaron.

## Interacción y accesibilidad

La timeline Vue 3 permite combinar filtros de era, región y clasificación, limpiar filtros y consultar un contador anunciado mediante `role="status"`. Usa controles nativos con etiquetas, encabezados, listas y foco visible.

Los títulos, resúmenes, metadatos y enlaces se muestran directamente. Las entradas sensibles declaran su nivel y el índice presenta una advertencia antes del listado. Dentro de cada artículo, las secciones con spoilers comienzan con una alerta visible; no hay controles para ocultar o revelar contenido.

El HTML inicial mantiene las entradas disponibles sin JavaScript, aunque los filtros requieren hidratación. El directorio interactivo queda fuera del índice Pagefind y los artículos con spoilers no generan extractos de búsqueda.

## Validación

Con Node 22.23.4 y dependencias instaladas mediante `npm ci`:

- `npm run check`: 0 errores, 0 warnings de diagnóstico, 0 hints.
- `npm run build`: correcto; 5 páginas generadas y 3 páginas indexadas por Pagefind.
- Persisten los avisos de colecciones vacías o ausentes: entities, quests y mysteries.
- Navegador: advertencias visibles, filtros combinados, estado vacío y limpieza, enlace MDX y vuelta al índice, y comprobación de ancho móvil sin desbordamiento horizontal.

Solo existe una crónica y no tiene cronología confirmada. Por tanto, la secuencia de varios acontecimientos queda preparada por el componente, pero no se ha validado con contenido histórico real ni se han creado entradas ficticias para poblarla.
