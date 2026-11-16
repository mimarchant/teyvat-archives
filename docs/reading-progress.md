# Progreso de lectura local

## Alcance

Cada artículo de `/cronicas/` incluye el panel «Tu lectura», junto al índice y las preferencias de spoilers. Permite:

- Guardar la posición al avanzar mediante desplazamiento, teclado, interacción de puntero o enlaces al índice.
- Continuar desde la posición guardada mediante una acción explícita. No mueve la página automáticamente al cargar ni reemplaza el progreso por la posición inicial.
- Marcar manualmente el artículo como leído o pendiente.
- Borrar únicamente el progreso de ese artículo, conservando la biblioteca y las preferencias de spoilers.

La posición es aproximada y corresponde al artículo renderizado. Un 100 % de desplazamiento no marca el artículo como leído ni confirma que se hayan visto las secciones cerradas. El estado leído solo se modifica mediante el botón del lector.

## Spoilers, cambios y accesibilidad

Continuar no abre bloques de spoilers ni cambia las preferencias. Si la sección guardada tiene contenido cerrado, regresa a su encabezado. Si cambió la revisión del artículo, avisa y vuelve al inicio de la sección, sin reutilizar su desplazamiento antiguo. Si el encabezado ya no existe, vuelve al inicio del contenido. Una marca de leído de una revisión anterior deja de presentarse como vigente.

La revisión se calcula durante la compilación a partir del cuerpo MDX, sus encabezados y updatedAt. Los finales de línea del cuerpo se normalizan para evitar cambios de revisión por CRLF frente a LF.

Los controles son botones nativos con foco visible. Continuar coloca el foco en la sección sin abrirla; borrar devuelve el foco al botón de estado leído/pendiente. El porcentaje no se anuncia continuamente durante el scroll; los mensajes de acciones usan un estado accesible. El panel se excluye de Pagefind.

## Persistencia

Los registros usan una clave por artículo:

```text
teyvat-archives:reading:v1:chronicles:<id-codificado>
```

Se guardan versión de formato, revisión del contenido, ancla, desplazamiento relativo dentro de la sección, porcentaje aproximado, estado leído y fecha de guardado. No se guardan títulos, resúmenes, texto de lore ni fuentes.

Las escrituras se agrupan en intervalos de 800 ms durante la interacción y se guarda la última posición pendiente al ocultar o abandonar la página. El seguimiento se detiene al cambiar spoilers o ejecutar una acción de restauración, para que esos movimientos no sobrescriban accidentalmente la posición anterior. Las otras pestañas del mismo origen sincronizan los cambios; al volver desde la caché de navegación se recupera el registro y no se reanuda el seguimiento hasta otra interacción.

Los datos dañados o de versiones incompatibles se descartan para la interfaz sin romper la lectura. Si el navegador bloquea el almacenamiento o se agota su capacidad, el progreso actual se conserva en memoria mientras la página esté abierta y se informa al lector de que no se pudo guardar. Si tampoco permite borrar un registro previo, el control comunica ese límite.

No hay servidor, cuenta ni sincronización entre dispositivos. El almacenamiento depende del navegador y del origen: Pages y un futuro dominio propio tienen almacenes separados. Sin JavaScript se puede leer el artículo, pero no se puede guardar ni restaurar el progreso. Este panel no constituye una restricción de acceso al contenido estático.

## Validación

```sh
npm test
npm run check
npm run build
```

La suite incorpora 14 pruebas de progreso: formatos inválidos, claves por artículo, aislamiento de biblioteca, almacenamiento bloqueado, cuotas, geometría, secciones cerradas, revisiones cambiadas y anclas eliminadas. Se mantienen las 32 pruebas del grafo y la validación editorial.

Resultado tras la corrección de compatibilidad: 49 pruebas correctas; validador editorial sin errores; Astro check con 0 errores, 0 warnings de diagnóstico y 0 hints; build correcto con 6 páginas generadas y 4 indexadas por Pagefind. Persisten los avisos de las tres colecciones vacías o ausentes (entities, quests y mysteries).

Revisión en navegador realizada:

- Guardado por desplazamiento con teclado y enlaces de sección.
- Persistencia en una nueva pestaña, sin desplazamiento automático al entrar.
- Continuar con foco en la sección y spoilers cerrados.
- Leído manual, sincronización entre pestañas, borrado y conservación de biblioteca.
- Aviso de revisión nueva con una página sintética temporal, retirada antes del build.
- Ausencia de desbordamiento horizontal a 320, 375, 390, 768 y 1280 px.

No se modificaron el lore, las fuentes ni el contenido editorial. No se añadieron dependencias.

## Compatibilidad del build

El cálculo de revisión usa Web Crypto (`crypto.subtle.digest`) y conserva exactamente el SHA-256 anterior. Evita depender de tipos de Node que puedan existir fuera del repositorio y faltar en una instalación de Cloudflare. Tres pruebas adicionales verifican compatibilidad de hashes, cambios de contenido y tipado aislado sin paquetes externos ni tipos automáticos de Node. No requiere dependencias nuevas.
