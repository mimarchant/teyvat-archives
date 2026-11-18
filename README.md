# Teyvat Archives

Prototipo de un archivo editorial de lore de Genshin Impact en español, con contenido tipado, fuentes, advertencias de spoilers y rutas simples de exploración.

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
- [x] Advertencias de spoilers visibles antes de cada sección sensible
- [x] Registro de fuentes con estado vacío explícito
- [x] Guardado local de una entrada en la biblioteca
- [x] Búsqueda real (Pagefind)
- [x] Atlas con filtros
- [x] Crónicas con timeline y filtros
- [x] Relaciones tipadas y validadas internamente
- [x] Validación editorial automatizada de que cada sección MDX tenga clasificación de spoilers
- [x] Persistencia de progreso de lectura
- [x] Directorio tipado de entidades y fichas territoriales de las siete naciones
- [x] Archivo de 52 Misiones de Arconte con páginas individuales, fuentes y navegación secuencial

La entrada de Khaenri'ah tiene sus tres pasajes contrastados visualmente en una grabación histórica del juego, con textos en español. La revisión editorial está completada para ese alcance histórico; la [auditoría del diálogo](docs/khaenriah-dialogue-audit.md) registra los momentos exactos y los límites del cotejo. No se comprobó el cliente 7.2. Los bloques MDX muestran una advertencia antes de cada sección sensible, pero no ocultan el contenido.

El archivo incorpora una segunda línea documental desde el teaser oficial *Nightmare of Yore*: una [crónica de Lang-Gan y una ficha de Zibai](docs/nightmare-of-yore-source-audit.md), conectadas solo por la presencia explícita del personaje en el relato. No se asignan fecha absoluta, región ni desenlace.

La colección de misiones se abre con una [ficha verificada del Capítulo I, acto IV](docs/first-quest-entry.md). Registra su publicación original, su sinopsis y los requisitos anunciados en 2021, además de una conexión editorial acotada con la crónica de Khaenri'ah.

El Atlas enlaza un [paquete territorial de las siete naciones](docs/nations-atlas-pack.md), ampliado después con [fuentes oficiales específicas para cada región](docs/seven-nations-expansion.md). Las fichas distinguen la presentación general, el alcance de cada actualización y el encuadre histórico de *Travail*; no resumen arcos completos ni inventan relaciones entre territorios.

## Recursos visuales

Las imágenes remotas actuales son placeholders editoriales de Unsplash para probar composición y contraste. Antes de publicar, deben reemplazarse por recursos con derechos y permisos adecuados. El proyecto no debe asumir afiliación con HoYoverse ni reutilizar assets del juego sin revisar sus condiciones de uso.

## Nota de marca

Proyecto fan no oficial, no afiliado, respaldado ni patrocinado por HoYoverse.

## Relaciones editoriales

Las relaciones se conservan como metadatos tipados para validar destinos, evidencia y límites editoriales. Ya no se presentan como un mapa público: la navegación principal prioriza Crónicas, Archivo, Atlas, Misiones, Misterios y Búsqueda.

## Progreso de lectura

Los artículos guardan una posición local y permiten continuar, marcar como leído o borrar el registro. Consulta [la guía de progreso](docs/reading-progress.md) para persistencia, accesibilidad y convivencia con las advertencias de spoilers.
