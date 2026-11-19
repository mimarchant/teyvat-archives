# Paquete regional de Nod Krai

## Objetivo

Este paquete completa el hueco territorial más visible de la era lunar sin convertir el Atlas en un mapa inventado. Incorpora una región, cuatro lugares, una comunidad y una figura central:

- Nod Krai;
- Isla Lempo;
- Isla Hiisi;
- Isla Paha;
- Villa Nasha;
- los Descendientes Lunaescarcha;
- Nicole Reeyn.

## Decisiones editoriales

### Nod Krai no se fusiona automáticamente con Snezhnaya

Las fuentes de Luna I presentan Nod Krai como una región propia y nombran sus áreas. El paquete no codifica una relación administrativa con Snezhnaya porque las fuentes seleccionadas para estas fichas no definen ese vínculo con la precisión exigida por el grafo.

### Las islas son lugares, no regiones independientes

Lempo, Hiisi y Paha se tipan como `location` y se conectan con Nod Krai mediante `located-in`. Villa Nasha conserva el rango de villa usado por la publicación española y no se presenta como capital.

### La comunidad no representa a toda la región

Los Descendientes Lunaescarcha se tipan como `civilization`. La ficha documenta el Enclave, la presentación de Lauma y el motivo ritual, pero no generaliza sus creencias a todos los habitantes de Nod Krai.

### Nicole queda separada del territorio

Nicole aparece en el paquete por ser una figura central de la era lunar y la primera integrante jugable del Aquelarre documentada por las fuentes consultadas. No recibe una relación territorial: su identidad como bruja N y Observadora del Mundo no equivale a residencia o pertenencia regional.

## Integración con el Atlas

El Atlas pasa de 8 a 14 entradas y añade una categoría visible de `Lugares`. Se incorporan seis tarjetas:

- Nod Krai en `Regiones`;
- Lempo, Hiisi, Paha y Villa Nasha en `Lugares`;
- Descendientes Lunaescarcha en `Civilizaciones`.

Nicole permanece en el Archivo de entidades, donde corresponde a la categoría `Personajes`.

## Fuentes oficiales principales

- [Detalles de Luna I](https://genshin.hoyoverse.com/es/news/detail/159349).
- [Presentación de Canción lunar](https://genshin.hoyoverse.com/es/news/detail/157790).
- [Mapa oficial de Teyvat](https://genshin.hoyoverse.com/m/es/map).
- [A Moonlit Destined Companion](https://genshin.hoyoverse.com/en/news/detail/159039).
- [Aviso de deseos de Nicole en Luna VII](https://genshin.hoyoverse.com/en/news/detail/164019).
- Misiones de Arconte de *Canción lunar*, usadas únicamente para contexto narrativo declarado.

## Relaciones añadidas

El paquete añade exactamente cinco relaciones territoriales:

1. Isla Lempo → Nod Krai.
2. Isla Hiisi → Nod Krai.
3. Isla Paha → Nod Krai.
4. Villa Nasha → Nod Krai.
5. Descendientes Lunaescarcha → Nod Krai.

Todas son `located-in`, canon, verificadas y respaldadas por fuentes registradas en la entrada de origen.

