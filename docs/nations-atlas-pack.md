# Paquete territorial de las siete naciones

Esta entrega convierte las siete naciones del Atlas en fichas editoriales verificadas y enlazables. Todas comparten un alcance deliberadamente introductorio.

## Fuentes comunes

- El mapa oficial de Teyvat en español, consultado el 16 de noviembre de 2026, respalda las descripciones territoriales vigentes.
- La descripción del tráiler oficial *Teyvat Chapter Storyline Preview: Travail*, publicada el 27 de septiembre de 2020, respalda la asociación histórica entre cada nación, su capítulo promocional y el personaje enumerado por el canal.

Las dos capas no se mezclan: el mapa describe la presentación territorial actual y *Travail* se registra como material promocional de 2020. Ninguna sustituye la revisión de las misiones jugables.

## Entradas incorporadas

- Mondstadt.
- Liyue.
- Inazuma.
- Sumeru.
- Fontaine.
- Natlan.
- Snezhnaya.

Las siete entradas usan el nuevo tipo `nation`, tienen nivel de spoiler `none`, revisión `verified`, dos fuentes oficiales y ninguna relación de grafo. La ausencia de relaciones es intencional: compartir un tráiler, un elemento o una posición en el itinerario promocional no demuestra por sí solo una relación narrativa entre naciones.

## Integración

- El Atlas enlaza las siete fichas y deja de presentarlas como contenido en preparación.
- `/entidades/` ofrece un directorio tipado con filtro, control local de spoilers y revelado individual.
- La navegación principal enlaza el Archivo y Misiones.
- Las tarjetas de Archivo y Atlas del inicio llevan a rutas reales.
- Las fichas de entidad vuelven al directorio del Archivo en lugar de usar el grafo como índice general.

## Límites

- No se documentan fronteras exactas, gobiernos, cronologías ni argumentos.
- Los personajes enumerados por *Travail* no se convierten en representantes exhaustivos de sus naciones.
- La mención de la versión 7.2 en Snezhnaya fecha la consulta del mapa oficial; no certifica una auditoría del cliente ni vigencia futura.
