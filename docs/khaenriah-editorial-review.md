# Primera revisión editorial de Khaenri'ah

Fecha de consulta: 16 de noviembre de 2026.

Límite de spoilers autorizado para investigar: versión 7.2. No se utiliza información posterior ni filtraciones. Esto es un techo de spoilers, no una declaración de revisión exhaustiva hasta esa versión.

## Alcance de esta entrega

Se reemplaza el esqueleto de Khaenri'ah por una lectura acotada de un testimonio del Capítulo I, acto IV. Se mantiene `reviewStatus: draft`, fuera de Pagefind. Su nivel es Liyue por el acto utilizado; no se eleva por el progreso personal del lector.

No se ha escrito una historia total de Khaenri'ah ni un resumen actualizado de 7.2. Se conserva el slug, se retira el orden ficticio 900 y la referencia a una portada inexistente, y se declara explícitamente que la cronología no está confirmada para esta entrada. No se añaden nodos o vínculos de lore para poblar el grafo.

## Registro de fuentes y procedencia

| Registro | Fuente consultada | Procedencia | Uso permitido en el borrador |
| --- | --- | --- | --- |
| anuncio-acto-iv | https://genshin.hoyoverse.com/m/en/news/detail/11605 | Anuncio del editor, consultado a través de su contenido indexado; la página requiere JavaScript | Identificación del acto y disponibilidad histórica inicial. No prueba hechos del mundo ficticio. |
| notas-1-4 | https://genshin.hoyoverse.com/en/news/detail/9368 | Notas del editor, contenido indexado; la página no devuelve texto legible al lector web | Confirma el contexto de actualización. No prueba causas del desastre. |
| testimonio-dainsleif | https://genshin-impact.fandom.com/wiki/A_Herald_Without_Adherents | Transcripción secundaria indexada; la apertura directa devolvió error | Localiza tres afirmaciones atribuidas al personaje. No se declara cotejo directo del juego. |

Las afirmaciones históricas atribuidas al pasaje se han parafraseado, sin copiar líneas de diálogo ni inventar una traducción oficial. La fuente primaria subyacente es el juego; en esta sesión solo fue posible consultar su reproducción secundaria.

## Lista de contraste para la revisión en el juego

En el historial del Capítulo I, acto IV, localizar el pasaje correspondiente a la parte inglesa `A Herald Without Adherents`, con Dainsleif como hablante:

| Punto | Localizador de la transcripción | Acción antes de aprobar |
| --- | --- | --- |
| Descripción religiosa del reino | Audio referenciado como vo szaq002 3 dainsleif 17 | Confirmar texto, interlocutores y contexto en el historial. |
| Descripción de su construcción | Audio referenciado como vo szaq002 3 dainsleif 18 | Verificar que la paráfrasis conserve el alcance del original. |
| Relato de la devastación | Audio referenciado como vo szaq002 3 dainsleif 19 y 20 | Confirmar atribución y referencia temporal; no identificar agentes concretos por inferencia. |

Los identificadores de audio son localizadores de la transcripción consultada, no IDs visibles garantizados dentro del cliente. Si la localización española usa otro título para la parte, registrar su nombre real al verificarla. No se asume que el texto original siga intacto en el cliente 7.2.

## Criterios para aprobar

1. Contrastar esas tres paráfrasis con el historial o una grabación directa del juego, registrando idioma y versión de consulta.
2. Revisar que el título, resumen y etiquetas no adelanten revelaciones.
3. Conservar la distinción entre un testimonio del personaje y una reconstrucción histórica completa.
4. Si se amplía el alcance, investigar fuentes posteriores hasta 7.2 y documentarlas individualmente. No presentar límites de este pasaje como preguntas globalmente abiertas en 7.2.
5. Solo después valorar `needs-review` o `verified`; cualquier cronología o relación exige evidencia propia.
6. Antes de promover el estado para publicación, revisar el buscador: la exclusión actual de Pagefind protege este borrador, pero no garantiza que una entrada con otro estado mantenga sus pasajes protegidos fuera de los extractos.

El borrador actual no debe anunciarse como lore verificado. No se incorporaron hechos tomados de resúmenes comunitarios sobre versiones recientes ni se reutilizaron ilustraciones del juego.

## Validación técnica

- 49 pruebas correctas.
- Validación editorial sin errores; Astro check con 0 errores, 0 warnings de diagnóstico y 0 hints.
- Build correcto: 6 páginas, 4 indexadas por Pagefind. Persisten los avisos de las tres colecciones vacías.
- Revisión del artículo en navegador: dos bloques protegidos cerrados inicialmente y exclusión de Pagefind por su estado draft.
- Sin desbordamiento horizontal del artículo a 320, 375, 390, 768 y 1280 px.
