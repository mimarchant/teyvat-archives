# Sprint 05 — Crónicas

`/cronicas/` obtiene sus entradas de la colección tipada `chronicles`; no mantiene un catálogo paralelo ni incorpora lore nuevo. Incluye los borradores con su estado editorial visible al revelarlos.

## Contrato editorial

- `era` y `region` son opcionales. Su ausencia se muestra como información sin documentar.
- `timelineOrder` expresa una secuencia relativa, nunca una fecha.
- Solo `chronologyConfirmed: true` junto con `timelineOrder` permite entrar en la secuencia documentada. Debe usarse únicamente cuando las fuentes del artículo respaldan ese orden. El valor por defecto es `false`, incluso para entradas antiguas con un número de orden.
- Las demás entradas aparecen en un grupo sin ubicación cronológica confirmada. El orden por identificador dentro de ese grupo es estable y no implica relaciones históricas.
- Canon, interpretación, teoría y sin resolver se mantienen separados del estado de revisión.
- Khaenri'ah sigue siendo un borrador sin fuentes; sus metadatos y contenido no se modificaron.

## Interacción y accesibilidad

La timeline Vue 3 permite combinar filtros de era, región y clasificación, limpiar filtros y consultar un contador anunciado mediante `role="status"`. Usa controles nativos con etiquetas, encabezados, listas y foco visible. El botón de revelado conserva el foco y comunica su estado con `aria-expanded` y `aria-controls`.

Comparte `teyvat-spoiler-mode` con los artículos: Ocultar bloquea el revelado; Advertir permite revelar y volver a ocultar cada entrada; Mostrar revela todas. Los títulos, resúmenes, metadatos y enlaces protegidos no se renderizan en las tarjetas hasta revelarlos. Los filtros no exponen metadatos de entradas protegidas. Cambiar de modo restablece filtros y revelados manuales. Si el almacenamiento local falla, la página sigue funcionando con la preferencia en memoria. La sincronización entre pestañas usa el evento `storage`.

El HTML inicial es conservador y contiene una explicación para quienes desactivan JavaScript. El directorio interactivo queda fuera del índice Pagefind para no indexar tarjetas protegidas o borradores. Este control evita revelaciones accidentales en la interfaz: no constituye control de acceso a archivos estáticos.

## Validación

Con Node 22.23.4 y dependencias instaladas mediante `npm ci`:

- `npm run check`: 0 errores, 0 warnings de diagnóstico, 0 hints.
- `npm run build`: correcto; 5 páginas generadas y 3 páginas indexadas por Pagefind.
- Persisten los avisos de colecciones vacías o ausentes: entities, quests y mysteries.
- Navegador: estado inicial protegido; revelado y ocultado manual con teclado y conservación de foco; filtros combinados; estado vacío y limpieza; modos Ocultar/Mostrar; persistencia tras recarga; enlace MDX y vuelta al índice; comprobación de ancho móvil sin desbordamiento horizontal.

Solo existe una crónica y no tiene cronología confirmada. Por tanto, la secuencia de varios acontecimientos queda preparada por el componente, pero no se ha validado con contenido histórico real ni se han creado entradas ficticias para poblarla.
