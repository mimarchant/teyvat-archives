# Sprint 06 — Grafo de conocimiento y ajuste móvil

## Implementado

- `/conexiones/` obtiene los nodos de las cuatro colecciones MDX tipadas; no usa un catálogo de lore paralelo.
- Mapa SVG determinista con flechas de origen a destino, selección desde una lista de botones accesibles y panel de detalle. La disposición no implica cronología, geografía ni peso de evidencia.
- Filtros por colección, clasificación de entrada y tipo de relación; contador anunciado, selección por teclado, estados vacíos y enlace a artículos que tienen una ruta implementada.
- Evidencia por relación, con clasificación, estado de revisión, explicación y fuentes de la entrada de origen. Se pueden recorrer relaciones salientes y entrantes desde el panel.
- Spoilers compartidos con crónicas y artículos: una relación solo se dibuja cuando ambos extremos y la propia relación están revelados. Su explicación y fuentes siguen la misma regla. Los cambios de modo descartan revelados y selección.
- Navegación principal y llamada al grafo desde el inicio.
- Corrección del desbordamiento móvil: contenedor de posicionamiento para el adorno de Misterios, columnas reducibles en Archivo y ajustes de tipografía, botones y contenido flexible.

Actualmente hay una sola entrada, Khaenri'ah, en borrador y sin fuentes. Se conserva como nodo aislado. No se crearon relaciones, afirmaciones de lore ni fuentes para poblar el mapa.

## Modelo de relaciones

Todas las colecciones admiten `relations`, una lista opcional que por defecto está vacía. Cada relación requiere:

| Campo | Significado |
| --- | --- |
| `id` | Identificador único dentro de la entrada de origen |
| `target.collection` y `target.id` | Referencia exacta a otra entrada existente |
| `type` | `mentions`, `located-in`, `part-of`, `participates-in` o `related-to` |
| `classification` | Canon, interpretación, teoría o sin resolver; independiente de la entrada |
| `reviewStatus` | Borrador, revisión pendiente o verificada; independiente de la entrada |
| `spoilerLevel` | Nivel propio de la relación, además de los niveles de ambos extremos |
| `explanation` | Qué afirma el vínculo y cuáles son sus límites |
| `sourceIds` | Uno o más IDs del registro `sources` de la entrada de origen |

La compilación rechaza destinos inexistentes, autorreferencias, identificadores duplicados y fuentes no registradas. Estas comprobaciones validan integridad, no veracidad: sigue siendo necesaria la revisión editorial del contenido y de lo que respalda cada fuente. Los tipos de relación son dirigidos; no se infieren vínculos transitivos ni relaciones inversas nuevas.

Solo las crónicas tienen actualmente ruta de artículo. Los nodos de otras colecciones pueden explorarse en el panel, pero no se les asignan enlaces inexistentes. El explorador se excluye de Pagefind para evitar indexar metadatos protegidos y borradores. El ocultamiento es una preferencia de interfaz, no un control de acceso al contenido estático.

## Validación

Usar Node 22.23.4 o superior compatible con Astro y las dependencias fijadas.

```sh
npm test
npm run check
npm run build
```

`npm test` usa el ejecutor nativo de Node y sus tipos eliminables, sin nuevas dependencias. Cubre nueve casos de integridad de relaciones, rutas, fuentes, identificadores, clasificación y spoilers.

Resultado: 9 pruebas correctas; `check` con 0 errores, 0 warnings de diagnóstico y 0 hints; `build` correcto con 6 páginas generadas y 4 indexadas por Pagefind. Persisten los avisos de las tres colecciones vacías o ausentes (entities, quests y mysteries).

Revisión en navegador:

- Inicio: ancho del documento igual al ancho disponible a 320, 360, 375, 390, 414, 768 y 1280 px.
- Grafo: sin desbordamiento a 320, 375, 390, 768 y 1280 px; selección con teclado, filtros y estado vacío con la entrada real.
- Datos sintéticos temporales, retirados antes de compilar: revelado separado de nodo y relación; fuentes ocultas hasta autorización; selección de extremo opuesto; filtro de tipo; desaparición de arista y evidencia al ocultar un extremo; foco tras revelado por teclado.

La prueba con relaciones múltiples se realizó con datos sintéticos de prueba, nunca incorporados al contenido editorial ni a la compilación de producción.

## Pendiente editorial

El siguiente paso es documentar fuentes primarias y relaciones reales revisadas. El modelo y la interfaz están preparados, pero el archivo aún no contiene una red histórica verificada. Quedan fuera de este sprint un motor de fuerzas, zoom/pan, edición visual de relaciones y rutas de artículo para las otras colecciones.
