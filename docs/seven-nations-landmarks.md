# Lugares representativos de las siete naciones

## Alcance

Este paquete añade siete fichas de tipo `location`: Ciudad de Mondstadt, Puerto de Liyue, Ciudad de Inazuma, Ciudad de Sumeru, Corte de Fontaine, Estadio de la Llama Sagrada y Novokitezhgrado.

La selección no afirma que los siete lugares sean capitales ni que tengan funciones equivalentes. Cada entrada representa un escenario respaldado por fuentes oficiales y enlaza únicamente con su nación mediante una relación `located-in`.

## Criterio documental

Las 22 referencias combinan mapas y anuncios oficiales con Misiones de Arconte identificadas en el frontmatter. Las publicaciones de versiones documentan apertura, nombres y sistemas; las misiones se usan para resumir acontecimientos argumentales.

Novokitezhgrado recibe un tratamiento más acotado. La ficha registra la información publicada para la versión 7.2 —área, ferrocarril, Puntos de encuentro y motivos promocionales—, pero no resume diálogos ni misiones que no hayan sido cotejados.

## Límites editoriales

- Una ciudad o recinto no se usa como sustituto de toda la nación.
- Los motivos promocionales formulados como preguntas permanecen abiertos.
- Las relaciones territoriales no implican capitalidad, jurisdicción o representación política.
- Los giros argumentales se muestran detrás de advertencias de la nación correspondiente.
- No se añaden fechas internas, distancias o planos que las fuentes no proporcionen.

## Validación esperada

Ejecutar `npm test`, `npm run check` y `npm run build`. Las pruebas comprueban tipo, nivel de spoiler, revisión, fuentes y una única relación territorial por ficha.
