# Primera ficha de entidad y conexión documentada

## Alcance editorial

La ficha `/entidades/dainsleif/` identifica al hablante de los pasajes históricos analizados en `/cronicas/khaenriah/`. No es una biografía completa. Se reutiliza el cotejo audiovisual documentado en [la auditoría del diálogo](khaenriah-dialogue-audit.md): cuatro momentos con el nombre Dainsleif visible en la interfaz del juego. No se afirma una observación nueva ni independiente.

La ficha y la relación están verificadas únicamente para esa atribución. La fuente es el texto del juego registrado en una partida publicada por un jugador, no sus comentarios ni un comunicado de HoYoverse. La versión exacta del cliente y la vigencia del texto en 7.2 siguen sin comprobarse.

La relación dirigida `chronicles:khaenriah/menciona-dainsleif` tiene tipo `mentions`, clasificación `canon` y nivel `liyue`. Solo afirma que la crónica menciona al hablante identificado; no afirma participación causal, responsabilidad, pertenencia o cronología. Su evidencia usa el ID ya registrado en la entrada de origen. No se añade una relación inversa ni transitiva.

## Artículos y persistencia

Crónicas y entidades utilizan `ArchiveArticle.astro`, con el mismo índice, fuentes, preferencias de spoilers, biblioteca y progreso. El grafo enlaza únicamente colecciones con ruta implementada: crónicas y entidades. Misiones y misterios siguen sin enlace de artículo.

El progreso usa la colección como parte de la clave. Las crónicas conservan sus claves existentes y las entidades usan su propio espacio. La biblioteca conserva los IDs históricos de crónicas y añade el prefijo `entities:` para las nuevas fichas. No se cambia ni migra información guardada.

Ambos artículos tienen nivel Liyue y quedan fuera de Pagefind. La ficha se alcanza desde una conexión revelada, el enlace protegido de la crónica o una URL directa. El control de spoilers es una preferencia visual, no un control de acceso al HTML estático.

## Comprobación

Ejecutar `npm test`, `npm run check` y `npm run build`. Las pruebas del grafo incluyen las rutas de entidades y la integridad de la conexión publicada, con ocultamiento en los modos ocultar y advertir. La comprobación editorial recorre ambas colecciones.

Resultado: 55 pruebas aprobadas; check con 0 errores, 0 advertencias de diagnóstico y 0 sugerencias; build con 7 páginas generadas y 4 indexadas. Persisten los avisos de las colecciones vacías de misiones y misterios.

En navegador se comprobó el revelado separado de los dos nodos y la relación, la evidencia, el enlace a la ficha, marcar y borrar su progreso, y la conservación de las secciones cerradas y la exclusión de búsqueda en ambos artículos. La plantilla compartida muestra las fechas editoriales en UTC para evitar que una fecha sin hora retroceda al día anterior durante la compilación local.
