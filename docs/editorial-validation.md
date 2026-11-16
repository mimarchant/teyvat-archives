# Validación editorial de spoilers

## Ejecutar

Con Node 22.23.4 o superior compatible:

```sh
npm run check:editorial
npm test
npm run check
npm run build
```

`check:editorial` revisa los archivos `.mdx` y `.md` de chronicles, entities, quests y mysteries, incluidas sus subcarpetas. Omite archivos cuyo nombre empieza con `_`, como los loaders de contenido. Las colecciones vacías se permiten. No modifica archivos ni ejecuta los imports o las expresiones de los artículos.

`npm run check` ejecuta esta comprobación antes de Astro. `npm run build` llama a `check` antes de generar el sitio y Pagefind. Si falla la validación, el proceso termina con código 1 y no continúa con la generación o la publicación de esa compilación. No se cambiaron la configuración de Cloudflare ni los comandos de despliegue.

Ejemplo de diagnóstico:

```text
src/content/chronicles/entrada.mdx:24:1 [LEVEL_MISMATCH] El bloque usa none, pero «Contexto» declara sumeru.
```

La ruta, línea y columna señalan el contenido real, incluso con BOM y finales de línea Windows. Los problemas del registro de secciones se señalan en el inicio del frontmatter; los problemas de bloques y encabezados se señalan en su ubicación.

## Convención de escritura

1. Declarar `spoilerLevel` y una lista `sections` explícita. Si no hay secciones, usar `sections: []`.
2. Registrar cada encabezado Markdown `##` en `sections` con `id`, `title` y `spoilerLevel`. Los títulos deben coincidir con el texto del encabezado; se normalizan espacios y composición Unicode. El `id` es un identificador editorial estable y único, con minúsculas, números y guiones; no sustituye al ancla que genera Astro.
3. Mantener los `##` en la raíz del documento y usar texto Markdown estático en ellos. No generarlos con expresiones, componentes ni etiquetas HTML h1/h2. La plantilla ya incluye el título h1 del artículo.
4. Importar el componente editorial real mediante una ruta relativa. Se permite un alias del import por defecto.
5. Envolver toda la prosa, código, imágenes y componentes de cada sección en bloques `SpoilerSection`. El atributo `level` debe ser un único literal, coincidir con la sección y no superar el nivel general del artículo. No usar expresiones, atributos expandidos ni bloques anidados.
6. El preámbulo anterior al primer `##` también debe estar envuelto, con `level="none"`. Una introducción con spoilers necesita su propia sección registrada.
7. Colocar los encabezados de subsección (`###` y siguientes) dentro del bloque correspondiente. Se permiten varios bloques hermanos con el mismo nivel dentro de una sección. Si cambia el nivel, dividir el contenido en secciones declaradas distintas.
8. Usar `.mdx` para contenido con spoilers. Un archivo `.md` solo puede declarar `none` en el artículo y sus secciones: las etiquetas de componentes no ofrecen control de spoilers en Markdown plano.

Comentarios MDX y definiciones de enlaces no cuentan como prosa sin clasificar. Los ejemplos de código se leen como código: un `##` o una etiqueta dentro de un bloque de código no crea una sección real. Un bloque o una sección vacía no cuenta como contenido correctamente cubierto.

Los niveles admitidos y su orden están centralizados en `src/data/spoilers.ts`, compartido por Zod y el validador.

## Qué se comprueba

- Frontmatter YAML inicial válido, sin claves duplicadas.
- Declaraciones de sección completas, sin IDs ni títulos duplicados.
- Correspondencia entre encabezados reales y secciones declaradas, en ambos sentidos.
- Import del componente real, cobertura del contenido, niveles literales válidos y coherencia de niveles.
- Ausencia de encabezados ocultos, títulos dinámicos y bloques anidados o vacíos.
- Sintaxis Markdown/MDX analizada con Satteri, el analizador que ya utiliza Astro.

Satteri y YAML se declaran como dependencias de desarrollo directas con las mismas versiones que ya estaban en el lockfile. No se añadió otro motor MDX ni cambiaron las versiones de las dependencias existentes.

## Límites

Esta es una validación de estructura editorial. No puede determinar si un texto está clasificado con el nivel narrativo correcto ni detectar por su significado un spoiler en títulos, resúmenes, etiquetas, imágenes o texto declarado `none`. La revisión humana sigue siendo necesaria. Tampoco verifica canon, fuentes, inferencias, contenido dinámico importado o derechos de imágenes. El control de spoilers del sitio sigue siendo una preferencia de interfaz, no una restricción de acceso al HTML estático.

La única adaptación del artículo existente fue envolver su nota editorial inicial en un bloque `none`, conservando literalmente su texto, sus metadatos y sus fuentes.

## Validación de esta entrega

- 32 pruebas correctas: 23 editoriales y 9 del grafo.
- `npm run check`: validador editorial sin errores; Astro con 0 errores, 0 warnings de diagnóstico y 0 hints.
- `npm run build`: correcto; 6 páginas generadas y 4 indexadas por Pagefind.
- Prueba negativa de integración: se añadió temporalmente una entrada de prueba con prosa sin envolver; `build` terminó con error editorial antes de generar páginas y el HTML existente conservó su fecha de modificación. El archivo de prueba se retiró y el build válido volvió a pasar.
- Persisten los avisos de las tres colecciones vacías o ausentes: entities, quests y mysteries.
