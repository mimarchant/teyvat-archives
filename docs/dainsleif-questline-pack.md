# Paquete documental de misiones y Orden del Abismo

Este paquete amplía el archivo en bloque con cinco fichas de misión y tres fichas de criaturas. Su objetivo es documentar publicación, acceso histórico y relaciones explícitas sin convertir el archivo en un resumen argumental.

## Fichas incorporadas

### Misiones

- `Requiem of the Echoing Depths`, identificada por las notas oficiales como Capítulo II, acto IV de la versión 2.6.
- `Caribert`, identificada como Capítulo III, acto VI de la versión 3.5.
- `Bedtime Story`, identificada como Capítulo IV, acto VI de la versión 4.7.
- `Paralogism`, identificada como Capítulo intermedio, acto IV de la versión 5.6.
- `A Space and Time for You`, identificada por fuentes oficiales posteriores como Capítulo V, acto VI y misión de Arconte de la versión 5.7.

### Criaturas

- `Abyss Herald: Wicked Torrents`.
- `Abyss Lector: Violet Lightning`.
- `Abyss Herald: Frost Fall`.

Las tres fichas de criaturas solo registran su pertenencia a la Orden del Abismo porque esa afiliación aparece de forma explícita en las descripciones oficiales citadas.

## Límites editoriales

- No se reconstruye la trama de las misiones ni se atribuyen apariciones a personajes por inferencia.
- La relación promocional entre `Bedtime Story` y Dainsleif se clasifica como interpretación: el reparto del tráiler oficial acredita al personaje, pero no demuestra por sí solo una escena, diálogo o función dentro de la misión.
- La página original de detalles de la versión 5.7 no estuvo disponible durante la revisión. Por eso, `A Space and Time for You` solo afirma lo que permiten verificar las notas oficiales posteriores de las versiones 5.8 y Luna I; no fija fecha de lanzamiento, requisitos originales ni contenido argumental.
- Los requisitos de acceso históricos se presentan como condiciones publicadas para cada actualización, no como requisitos actuales.

## Interfaz y trazabilidad

- `/misiones/` ordena siete fichas ya presentes en el archivo según la progresión documental de capítulos.
- El control local de spoilers permite ocultar, advertir o mostrar el contenido, además de revelar fichas individualmente.
- Las nuevas relaciones se conservan como metadatos tipados con evidencia identificable y clasificación explícita; no se muestran en un mapa público.
- El nuevo tipo de entidad `creature` permite distinguir criaturas de personajes, regiones, facciones y conceptos.

## Verificación

- Pruebas del grafo para impedir que la evidencia promocional se convierta en una afirmación argumental.
- Pruebas del grafo para comprobar que las criaturas solo añaden su afiliación oficial a la Orden del Abismo.
- Revisión visual de `/misiones/` en escritorio y a 390 px, incluida la revelación individual de spoilers.
