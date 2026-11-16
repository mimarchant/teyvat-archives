# Sprint 04 — Búsqueda global

## Objetivo

Incorporar búsqueda estática de texto completo para ayudar a encontrar contenido publicado en Teyvat Archives, sin introducir backend ni servicios externos en tiempo de ejecución.

## Incluido

- Pagefind como generador de índice posterior a `astro build`.
- Búsqueda global en `/buscar/` con interfaz Vue 3.
- Búsqueda por título y contenido renderizado, con extractos y coincidencias resaltadas.
- Acceso a búsqueda desde la navegación global.
- Exclusión de la interfaz de navegación y del contenido de crónicas con estado editorial `draft`.
- Estados de búsqueda inicial, carga, error y sin resultados.
- Estilos responsive y foco visible.

## Dependencia

Se agrega `pagefind` como dependencia de desarrollo. El script `build` ahora ejecuta `astro check`, `astro build` y `pagefind --site dist`.

## Cómo validar

```bash
npm install
npm run check
npm run build
npm run preview
```

Abrir `/buscar/` desde el preview de producción. La búsqueda no está disponible en `astro dev`, porque Pagefind genera el índice a partir del HTML final del build.

Pruebas manuales sugeridas:
- Buscar una palabra presente en una página indexable.
- Buscar un término inexistente y comprobar el estado vacío.
- Comprobar que la crónica Khaenri'ah con estado `draft` no aparece.
- Verificar navegación por teclado, lector de pantalla y vista móvil.
- Confirmar que `dist/pagefind/` se genera después del build.

## Decisiones

- Pagefind indexa HTML estático y no necesita backend, API key ni base de datos.
- Los borradores se excluyen en la plantilla de crónicas; no se ocultan únicamente desde la interfaz.
- El buscador muestra hasta 20 coincidencias por consulta para mantener una interfaz manejable.
- Los filtros por tipo de contenido quedan para una iteración posterior, cuando existan suficientes entradas publicadas de distintas colecciones.

## Fuera de alcance

- Búsqueda en contenido aún no renderizado como página.
- Indexación de archivos PDF o recursos externos.
- Filtros avanzados por región, tipo de entidad, clasificación o spoilers.
- Sinónimos, sugerencias y tolerancia avanzada a errores tipográficos.
