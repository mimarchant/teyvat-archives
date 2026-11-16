# Teyvat Archives

Prototipo de un archivo de lore de Genshin Impact en español. Sprint 02: experiencia editorial y control de spoilers.

## Stack

- Astro (sitio estático y páginas de contenido)
- Vue 3 (interactividad puntual, hidratada solo donde hace falta)
- TypeScript
- Markdown / MDX con Content Layer y esquemas Zod

## Requisitos

- Node.js 22.12.0 o superior (recomendado)
- npm

## Inicio local

```bash
npm install
npm run dev
```

Abre la URL que indique Astro en la terminal.

## Comprobación

```bash
npm run check
npm run build
npm run preview
```

## Estructura

```text
src/
├── components/       # Componentes Astro y Vue
├── content/          # Entradas Markdown/MDX por colección
│   ├── chronicles/
│   ├── entities/
│   ├── quests/
│   └── mysteries/
├── layouts/          # Layouts compartidos
├── lib/              # Lógica de dominio (por incorporar)
├── pages/            # Rutas del sitio
└── styles/           # Tokens y estilos globales
```

## Modelo editorial inicial

Cada entrada incluye título, resumen, nivel de spoiler, clasificación editorial, fecha de actualización, estado de revisión, fuentes y secciones. Las colecciones especializan el modelo base para crónicas, entidades, misiones y misterios.

Clasificaciones: `canon`, `interpretation`, `theory`, `unresolved`.

Estados editoriales: `draft`, `needs-review`, `verified`.

**Importante:** Zod valida el frontmatter de las entradas. No valida automáticamente que cada bloque del cuerpo MDX tenga un nivel de spoiler correcto. Esa convención y su validación editorial deben implementarse antes de publicar contenido con spoilers.

## Estado de este prototipo

- [x] Configuración Astro + Vue + MDX
- [x] Colecciones de contenido tipadas
- [x] Layout, navegación y tokens visuales iniciales
- [x] Homepage responsive
- [x] Ruta de crónica de ejemplo
- [x] Plantilla editorial con índice automático
- [x] Bloques de evidencia clasificados
- [x] Control de spoilers por sección (ocultar / advertir / mostrar)
- [x] Preferencia de spoilers persistida localmente
- [x] Registro de fuentes con estado vacío explícito
- [x] Guardado local de una entrada en la biblioteca
- [ ] Búsqueda real (Pagefind)
- [ ] Atlas con filtros
- [ ] Grafo de conocimiento
- [ ] Validación editorial automatizada de que cada sección MDX tenga clasificación de spoilers
- [ ] Persistencia de progreso de lectura

La entrada de Khaenri'ah es deliberadamente un borrador sin afirmaciones de lore verificadas ni fuentes inventadas. Los bloques MDX de spoiler permiten controlar la revelación en la interfaz; no constituyen protección de contenido frente a inspección del HTML estático.

## Recursos visuales

Las imágenes remotas actuales son placeholders editoriales de Unsplash para probar composición y contraste. Antes de publicar, deben reemplazarse por recursos con derechos y permisos adecuados. El proyecto no debe asumir afiliación con HoYoverse ni reutilizar assets del juego sin revisar sus condiciones de uso.

## Nota de marca

Proyecto fan no oficial, no afiliado, respaldado ni patrocinado por HoYoverse.
