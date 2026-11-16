# Sprint 03 — Atlas de Teyvat

## Objetivo

Entregar un directorio editorial explorable para consultar naciones y civilizaciones de Teyvat, con una base de datos tipada que pueda reutilizarse en el futuro grafo de conocimiento.

## Incluido

- Ruta estática `/atlas/` integrada con el layout del sitio.
- Modelo TypeScript compartido para entradas y categorías del Atlas.
- Explorador Vue 3 con filtros por categoría y búsqueda en nombre, subtítulo, descripción y tipo.
- Estados de resultados vacíos y limpieza de filtros.
- Fichas adaptables a móvil y escritorio, alineadas con los tokens visuales existentes.
- Estados editoriales diferenciados entre entradas en preparación y crónicas relacionadas.
- Enlace a la crónica existente de Khaenri'ah.
- Nota editorial que aclara el alcance del directorio y evita presentar fichas pendientes como lore verificado.

## Decisiones

- El Atlas es un directorio editorial, no un mapa geográfico interactivo.
- Los datos viven fuera del componente Vue para facilitar su reutilización por el futuro grafo.
- No se agregan dependencias.
- Las entradas sin documentación suficiente se muestran como «en preparación».
- Las descripciones iniciales son orientativas; no sustituyen fichas con fuentes primarias verificadas.

## Validación pendiente

Ejecutar localmente:

```bash
npm install
npm run check
npm run build
npm run dev
```

Revisar navegación con teclado, contraste, comportamiento de filtros en móvil y enlaces de cada entrada.

## Fuera de alcance

- Mapa geográfico interactivo.
- Fichas individuales para cada región y lugar.
- Grafo de relaciones.
- Filtros por elemento, nivel de spoilers o estado de investigación.
- Investigación y verificación exhaustiva del lore de cada nación.
