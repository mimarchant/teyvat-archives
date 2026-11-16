# Primera ficha de misión

## Alcance

La colección `quests` se abre con `/misiones/we-will-be-reunited/`, una ficha verificada del Capítulo I, acto IV. Las fuentes oficiales respaldan el título inglés, su categoría, la versión 1.4, la fecha de disponibilidad, la sinopsis y los requisitos publicados en 2021.

La ficha no presenta los requisitos originales como condiciones actuales del cliente 7.2. Tampoco traduce el título sin haber comprobado el menú español ni resume el argumento completo.

## Conexión

La misión se relaciona con la crónica de Khaenri'ah porque esa crónica analiza un pasaje observado en una grabación histórica del capítulo. La relación se clasifica como interpretación editorial y usa dos fuentes: el anuncio que identifica la misión y el registro audiovisual que localiza el pasaje.

No se añade una relación de participación con Dainsleif. Su nombre aparece en el título de un requisito previo del anuncio, lo que no demuestra por sí solo su papel dentro de la misión principal.

## Ruta y persistencia

`ArchiveArticle.astro` admite ahora crónicas, entidades y misiones. Las misiones usan `/misiones/[slug]/`, reciben la etiqueta «Ficha de misión», vuelven a Conexiones y guardan biblioteca y progreso en el espacio `quests:`. Las claves históricas de crónicas y entidades no cambian.

El grafo enlaza nodos de misiones solo porque existe una ruta real. Misterios continúa sin enlace hasta que tenga su propia plantilla.

La ficha tiene nivel Liyue, queda fuera de Pagefind y mantiene cerradas sus secciones protegidas en los modos ocultar y advertir.

## Validación

- 57 pruebas aprobadas, incluida la ruta de misiones, la evidencia de la relación y la ausencia de relaciones nuevas de participación.
- Cinco artículos revisados por el validador editorial; Astro check con 0 errores, 0 advertencias de diagnóstico y 0 sugerencias.
- Build correcto: 10 páginas generadas y 4 indexadas. Solo persiste el aviso de la colección vacía de misterios.
- En navegador se verificaron el revelado independiente de la misión y su relación, las dos fuentes del vínculo, el acceso al artículo, la persistencia y borrado del progreso, las secciones cerradas y 0 resultados para `Lupus Minor` en Pagefind.
