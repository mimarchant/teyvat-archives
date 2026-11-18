# Coherencia editorial de la portada

## Objetivo

Esta entrega corrige promesas y etiquetas que habían quedado atrás respecto del contenido disponible. No presenta una cronología histórica antigua sin fuentes: la portada muestra un recorrido jugable de las 52 Misiones de Arconte ya documentadas, desde la versión 1.0 hasta la 7.2.

## Cambios

- La tarjeta decorativa «Las eras de Teyvat» se sustituye por una entrada al archivo cronológico real.
- Una nueva sección de Misiones divide los 52 actos en ocho etapas y conserva el enlace al índice completo.
- La tarjeta genérica de Entidades pasa a ser Lugares y abre el filtro correspondiente.
- Los directorios solo ofrecen categorías que contienen entradas.
- El filtro «Era» de Crónicas pasa a «Marco temporal» para no presentar estados de contraste como periodos históricos.
- El estado `verified` se presenta como «Revisión completada»; no implica vigencia absoluta ni comprobación contra la versión más reciente del cliente.
- El progreso de lectura mantiene un mensaje útil cuando JavaScript no llega a ejecutarse.
- La ficha de Zhongli identifica la evidencia de su giro principal y enlaza al acto correspondiente.
- La crónica de Khaenri'ah aclara por qué tres afirmaciones requieren cuatro marcas temporales.
- El Atlas deja de describir la crónica de Khaenri'ah como si todavía estuviera en preparación.

## Validación

Las pruebas de Misiones comprueban que las ocho etapas de la portada cubran una vez y solo una los 52 actos. También deben ejecutarse `npm run check` y `npm run build`, seguidos de una revisión visual de escritorio y móvil.
