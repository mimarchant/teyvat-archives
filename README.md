# Teyvat Archives

Prototipo de un archivo de lore de Genshin Impact en español. Sprint 06: grafo de conocimiento, filtros y evidencia por relación.

## Stack

- Astro (sitio estático y páginas de contenido)
- Vue 3 (interactividad puntual, hidratada solo donde hace falta)
- TypeScript
- Markdown / MDX con Content Layer y esquemas Zod

## Requisitos

- Node.js 22.23.4 o superior compatible con las dependencias fijadas
- npm

## Inicio local

```bash
npm install
npm run dev
```

Abre la URL que indique Astro en la terminal.

## Comprobación

```bash
npm test
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

**Importante:** Zod valida el frontmatter. `npm run check:editorial` verifica la cobertura de bloques y la coherencia de niveles del cuerpo MDX antes de compilar. La clasificación narrativa correcta de un texto sigue requiriendo revisión humana; consulta [la guía de validación](docs/editorial-validation.md).

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
- [x] Búsqueda real (Pagefind)
- [x] Atlas con filtros
- [x] Crónicas con timeline y filtros
- [x] Grafo de conocimiento con evidencia por relación
- [x] Validación editorial automatizada de que cada sección MDX tenga clasificación de spoilers
- [x] Persistencia de progreso de lectura

La entrada de Khaenri'ah tiene sus tres pasajes contrastados visualmente en una grabación histórica del juego, con textos en español. La revisión editorial está completada para ese alcance histórico; la [auditoría del diálogo](docs/khaenriah-dialogue-audit.md) registra los momentos exactos y los límites del cotejo. No se comprobó el cliente 7.2. Los bloques MDX de spoiler permiten controlar la revelación en la interfaz; no constituyen protección de contenido frente a inspección del HTML estático.

## Recursos visuales

Las imágenes remotas actuales son placeholders editoriales de Unsplash para probar composición y contraste. Antes de publicar, deben reemplazarse por recursos con derechos y permisos adecuados. El proyecto no debe asumir afiliación con HoYoverse ni reutilizar assets del juego sin revisar sus condiciones de uso.

## Nota de marca

Proyecto fan no oficial, no afiliado, respaldado ni patrocinado por HoYoverse.

## Sprint 06

Consulta [SPRINT-06.md](SPRINT-06.md) para el contrato de relaciones, validación, control de spoilers y alcance del ajuste móvil. El archivo incluye ahora una [primera ficha y conexión documentada](docs/dainsleif-first-connection.md): la crónica de Khaenri'ah menciona a Dainsleif como hablante del testimonio. El vínculo no afirma causalidad ni una biografía completa.

## Progreso de lectura

Los artículos de crónicas guardan una posición local y permiten continuar, marcar como leído o borrar el registro. Consulta [la guía de progreso](docs/reading-progress.md) para persistencia, accesibilidad y comportamiento con spoilers.
