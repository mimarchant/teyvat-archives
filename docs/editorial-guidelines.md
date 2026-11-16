# Guía editorial de Teyvat Archives

## Clasificación de afirmaciones

- `canon`: afirmación explícita respaldada por una fuente primaria identificable.
- `interpretation`: lectura razonada de una o más fuentes; debe explicitar qué parte es inferencia.
- `theory`: hipótesis que todavía no está confirmada. Debe presentarse como posibilidad, no como hecho.
- `unresolved`: pregunta abierta, evidencia insuficiente o fuentes en tensión.

La clasificación se asigna a cada afirmación relevante, no solo a la página completa. Una página puede contener afirmaciones de distintas categorías.

## Fuentes

Cada fuente debe tener un identificador estable y describir qué respalda. Siempre que sea posible, registrar:

- tipo: misión, libro, diálogo, objeto, cinemática, evento o comunicado oficial;
- título exacto y capítulo/sección cuando aplique;
- versión del juego si es relevante;
- referencia localizable (misión, acto, ubicación, personaje, objeto);
- afirmación concreta que la fuente respalda.

Una fuente que solo menciona dos personajes no demuestra por sí sola una relación causal entre ellos.

## Spoilers

El nivel de spoiler se asigna por sección. El nivel general de la entrada funciona como advertencia inicial, no como sustituto de la clasificación granular.

Modos de lectura:

- `hide`: secciones con spoilers cerradas y sin interacción para revelarlas;
- `warn`: secciones cerradas que el lector puede revelar manualmente;
- `show`: todas las secciones abiertas.

La preferencia se guarda en `localStorage`. Como el sitio es estático, ocultar contenido en la interfaz no lo protege frente a inspección del HTML o de los archivos publicados. Si más adelante se necesita impedir que el contenido spoiler llegue al navegador, habrá que separar ese contenido en recursos que solo se soliciten tras validar la preferencia.

## Revisión

- `draft`: estructura o contenido incompleto; no presentar como verificado.
- `needs-review`: contenido redactado que requiere contraste editorial.
- `verified`: fuentes revisadas y afirmaciones contrastadas.

No usar `verified` si existen fuentes pendientes, referencias vagas o inferencias presentadas como canon.

Una entrada verificada debe declarar el alcance de su revisión. El cotejo de un diálogo histórico confirma lo dicho por el personaje en el registro observado; no confirma por sí solo su explicación del mundo ni su vigencia en versiones posteriores. Registrar los límites y la procedencia del registro permite verificar un análisis histórico sin presentarlo como una síntesis actualizada. Si se amplía el alcance, las afirmaciones nuevas requieren su propio contraste.

## Comprobación automática de spoilers

Antes de publicar, ejecutar `npm run check:editorial` o `npm run check`. La validación está incluida también en `npm run build` y bloquea la compilación cuando faltan bloques o hay niveles inconsistentes.

La [convención de escritura y referencia de diagnósticos](editorial-validation.md) explica cómo registrar secciones, envolver el preámbulo y usar `SpoilerSection`. Esta comprobación valida la estructura, no la veracidad del lore ni el significado narrativo de un posible spoiler.
