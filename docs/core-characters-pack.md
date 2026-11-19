# Paquete de personajes centrales

## Alcance

Este paquete amplía el Archivo con siete fichas que faltaban para seguir los ejes familiares, políticos y lunares de la historia principal:

- el Viajero;
- el gemelo no elegido, descrito editorialmente como «gemelo del Abismo»;
- Paimon;
- Furina;
- Focalors;
- Columbina;
- Sandrone.

Las entradas no son biografías exhaustivas. Cada una declara qué tramo de la historia resume, qué fuentes respaldan sus afirmaciones y qué preguntas permanecen fuera de alcance.

## Decisiones editoriales

### Los dos gemelos

El protagonista se documenta como un papel elegido por el jugador. Aether y Lumine pueden ocupar tanto el lugar del Viajero como el del gemelo buscado, por lo que ninguna variante se presenta como elección canónica. La ficha del gemelo utiliza una relación general con la Orden del Abismo y evita convertir esa conexión en una jerarquía completa.

### Paimon

La ficha registra sus funciones visibles como guía, interlocutora y acompañante. No incorpora teorías sobre su origen, identidad o desenlace futuro. Las notas oficiales narradas por Paimon solo acreditan la continuidad de su voz promocional; no se usan como evidencia de lore interno.

### Furina y Focalors

Se publican como entidades distintas. Furina es una `character` y Focalors una `deity`. La separación permite atribuir correctamente la representación pública, el conocimiento del plan, el sacrificio y la vida posterior sin tratar ambos nombres como alias intercambiables.

### Columbina y Sandrone

Columbina se limita al título de Doncella Lunar, el arco Canción lunar y su publicación jugable. No se deduce una cosmología completa a partir de títulos o habilidades. Sandrone conserva la afiliación explícita con los Fatui documentada por la presentación oficial; sus motivos de autómatas y memoria se distinguen de los hechos explicados por las misiones.

## Fuentes principales contrastadas

- Misiones de Arconte desde el Prólogo hasta la versión 7.2, con foco en *Nos volveremos a encontrar*, *Cariberto*, *Una historia para ir a dormir*, *Mascarada de los culpables* y *Canción lunar*.
- [Story Teaser: We Will Be Reunited](https://genshin.hoyoverse.com/en/news/detail/5154).
- [Moonlit Ballad of the Night](https://genshin.hoyoverse.com/en/news/detail/157790).
- [Detalles oficiales de la versión 4.2](https://genshin.hoyoverse.com/en/news/detail/113561).
- [Teaser oficial de Furina](https://genshin.hoyoverse.com/en/news/detail/113484).
- [Demo de habilidades de Columbina](https://genshin.hoyoverse.com/en/news/detail/161971).
- [Demo de habilidades de Sandrone](https://genshin.hoyoverse.com/es/news/detail/164943) y [teaser del personaje](https://genshin.hoyoverse.com/en/news/detail/164974).

## Relaciones añadidas

El grafo editorial incorpora únicamente cinco conexiones respaldadas:

1. Viajero → Paimon (`related-to`).
2. Gemelo del Abismo → Orden del Abismo (`related-to`).
3. Furina → Fontaine (`related-to`).
4. Focalors → Fontaine (`related-to`).
5. Sandrone → Fatui (`part-of`).

Paimon y Columbina permanecen sin relaciones propias para evitar aristas redundantes o inferencias más amplias que las fuentes seleccionadas.

## Verificación esperada

- Las siete entradas deben conservar estado `verified`, al menos tres fuentes y secciones con advertencias de spoilers.
- Furina y Focalors deben mantener tipos distintos.
- El grafo debe generar exactamente las cinco relaciones anteriores cuando se carga el paquete y sus destinos.
- Las fichas deben aparecer en los filtros de personajes y deidades del Archivo sin necesitar cambios manuales en la interfaz.

