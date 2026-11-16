# Sprint 02 — Experiencia editorial

## Entregado

- Plantilla de crónica con índice automático a partir de los encabezados MDX.
- Metadatos visibles de estado editorial, clasificación y nivel de spoiler.
- Bloque de evidencia con clasificación `canon`, `interpretation`, `theory` o `unresolved`.
- Bloques de sección con niveles de spoiler.
- Preferencia global de spoilers: ocultar, advertir o mostrar; persistida en localStorage.
- Registro de fuentes con estado vacío explícito.
- Guía editorial inicial.

## Pendiente de validación

La instalación de dependencias no pudo completarse en el entorno de preparación por timeout de acceso al registro npm. Ejecutar localmente:https://github.com/new

```bash
npm install
npm run check
npm run build
```

Si el chequeo detecta incompatibilidades de versión, revisar primero las versiones `latest` del `package.json` y fijar versiones compatibles entre Astro, `@astrojs/mdx`, `@astrojs/vue` y `@astrojs/check`.

## Fuera de alcance

- Protección real de contenido spoiler frente a inspección del HTML estático.
- Validación automática de que todos los bloques de contenido tengan nivel de spoiler.
- Investigación factual y publicación de lore de Khaenri'ah.
