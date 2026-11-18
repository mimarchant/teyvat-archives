import type { spoilerLevels } from './spoilers';

type SpoilerLevel = (typeof spoilerLevels)[number];

export const archonQuestSources = {
  launch: { label: 'Avance oficial de la historia de Teyvat', href: 'https://www.youtube.com/watch?v=TAlKhARUcoY' },
  '1.1': { label: 'Detalles oficiales de la versión 1.1', href: 'https://genshin.hoyoverse.com/en/news/detail/103763' },
  '1.4': { label: 'Anuncio oficial del Capítulo I, acto IV', href: 'https://genshin.hoyoverse.com/m/en/news/detail/11605' },
  '1.6': { label: 'Detalles oficiales de la versión 1.6', href: 'https://genshin.hoyoverse.com/en/news/detail/13423' },
  '2.0': { label: 'Detalles oficiales de la versión 2.0', href: 'https://genshin.hoyoverse.com/m/en/news/detail/103985' },
  '2.1': { label: 'Detalles oficiales de la versión 2.1', href: 'https://genshin.hoyoverse.com/en/news/detail/104025' },
  '2.4': { label: 'Detalles oficiales de la versión 2.4', href: 'https://genshin.hoyoverse.com/en/news/detail/104157' },
  '2.6': { label: 'Aviso oficial de la versión 2.6', href: 'https://genshin.hoyoverse.com/en/news/detail/20184' },
  '2.7': { label: 'Detalles oficiales de la versión 2.7', href: 'https://genshin.hoyoverse.com/en/news/detail/104269' },
  '3.0': { label: 'Avance oficial de Sumeru', href: 'https://genshin.hoyoverse.com/en/news/detail/104318' },
  '3.1': { label: 'Detalles oficiales de la versión 3.1', href: 'https://genshin.hoyoverse.com/m/en/news/detail/24282' },
  '3.2': { label: 'Detalles oficiales de la versión 3.2', href: 'https://genshin.hoyoverse.com/en/news/detail/25356' },
  '3.3': { label: 'Detalles oficiales de la versión 3.3', href: 'https://genshin.hoyoverse.com/en/news/detail/27964' },
  '3.5': { label: 'Detalles oficiales de la versión 3.5', href: 'https://genshin.hoyoverse.com/en/news/detail/105440' },
  '4.0': { label: 'Detalles oficiales de la versión 4.0', href: 'https://genshin.hoyoverse.com/en/news/detail/112690' },
  '4.1': { label: 'Detalles oficiales de la versión 4.1', href: 'https://genshin.hoyoverse.com/en/news/detail/113142' },
  '4.2': { label: 'Detalles oficiales de la versión 4.2', href: 'https://genshin.hoyoverse.com/en/news/detail/113561' },
  '4.7': { label: 'Detalles oficiales de la versión 4.7', href: 'https://www.hoyolab.com/article/29513513' },
  '5.0': { label: 'Detalles oficiales de la versión 5.0', href: 'https://genshin.hoyoverse.com/es/news/detail/125553' },
  '5.1': { label: 'Detalles oficiales de la versión 5.1', href: 'https://genshin.hoyoverse.com/es/news/detail/126305' },
  '5.2': { label: 'Detalles oficiales de la versión 5.2', href: 'https://genshin.hoyoverse.com/es/news/detail/126992' },
  '5.3': { label: 'Detalles oficiales de la versión 5.3', href: 'https://genshin.hoyoverse.com/es/news/detail/127791' },
  '5.6': { label: 'Detalles oficiales de la versión 5.6', href: 'https://genshin.hoyoverse.com/es/news/detail/155739' },
  '5.7': { label: 'Tráiler oficial de la versión 5.7', href: 'https://www.youtube.com/watch?v=S0xt6uUWSlw' },
  '5.8': { label: 'Detalles oficiales de la versión 5.8', href: 'https://genshin.hoyoverse.com/es/news/detail/158026' },
  'luna-i': { label: 'Detalles oficiales de Luna I', href: 'https://genshin.hoyoverse.com/es/news/detail/159349' },
  'luna-ii': { label: 'Tráiler oficial de Luna II', href: 'https://genshin.hoyoverse.com/en/news/detail/160135' },
  'luna-iii': { label: 'Aviso oficial de Luna III', href: 'https://genshin.hoyoverse.com/en/news/detail/161138' },
  'luna-iv': { label: 'Resumen de misiones oficial de Luna IV', href: 'https://genshin.hoyoverse.com/es/news/detail/162126' },
  'luna-vii': { label: 'Tráiler oficial de Luna VII', href: 'https://genshin.hoyoverse.com/en/news/detail/163867' },
  '7.0': { label: 'Campaña oficial de la versión 7.0', href: 'https://genshin.hoyoverse.com/es/news/detail/165597' },
  '7.1': { label: 'Detalles oficiales de la versión 7.1', href: 'https://genshin.hoyoverse.com/es/news/detail/166383' },
  '7.2': { label: 'Detalles oficiales de la versión 7.2', href: 'https://genshin.hoyoverse.com/es/news/detail/167187' },
} as const;

export type ArchonQuestSourceId = keyof typeof archonQuestSources;

export type ArchonQuestEntry = {
  id: string;
  order: number;
  arc: string;
  region: string;
  act: string;
  title: string;
  version: string;
  spoilerLevel: SpoilerLevel;
  summary: string;
  sourceId: ArchonQuestSourceId;
  articleHref?: string;
};

const quest = (
  order: number,
  id: string,
  arc: string,
  region: string,
  act: string,
  title: string,
  version: string,
  spoilerLevel: SpoilerLevel,
  summary: string,
  sourceId: ArchonQuestSourceId,
  articleHref?: string,
): ArchonQuestEntry => ({ order, id, arc, region, act, title, version, spoilerLevel, summary, sourceId, articleHref });

export const archonQuests: ArchonQuestEntry[] = [
  quest(1, 'prologo-acto-i', 'Prólogo', 'Mondstadt', 'Acto I', 'El forastero que atrapó el viento', '1.0', 'mondstadt', 'El Viajero llega a Mondstadt, conoce a Paimon y a los Caballeros de Favonius y queda involucrado en la crisis provocada por Stormterror.', 'launch'),
  quest(2, 'prologo-acto-ii', 'Prólogo', 'Mondstadt', 'Acto II', 'Por un mañana sin lágrimas', '1.0', 'mondstadt', 'La búsqueda de una forma de ayudar a Dvalin reúne al Viajero con Venti y revela que el conflicto del dragón es más complejo que un simple ataque.', 'launch'),
  quest(3, 'prologo-acto-iii', 'Prólogo', 'Mondstadt', 'Acto III', 'Canción del dragón y la libertad', '1.0', 'mondstadt', 'El grupo se dirige a la Guarida de Stormterror para resolver la amenaza sobre Mondstadt y cerrar el primer capítulo del viaje.', 'launch'),
  quest(4, 'capitulo-i-acto-i', 'Capítulo I', 'Liyue', 'Acto I', 'La tierra entre los monolitos', '1.0', 'liyue', 'La llegada a Liyue coincide con un giro en el Rito del Descenso y convierte al Viajero en participante de una crisis política y religiosa.', 'launch'),
  quest(5, 'capitulo-i-acto-ii', 'Capítulo I', 'Liyue', 'Acto II', 'Adiós, amo perfeccionado', '1.0', 'liyue', 'Mientras prepara el rito de despedida junto a Zhongli, el Viajero recorre las tradiciones de Liyue y busca respuestas sobre Rex Lapis.', 'launch'),
  quest(6, 'capitulo-i-acto-iii', 'Capítulo I', 'Liyue', 'Acto III', 'Una nueva estrella en ascenso', '1.1', 'liyue', 'La invitación al Palacio de Jade acelera la investigación sobre la muerte de Rex Lapis y conduce al desenlace de la crisis de Liyue.', '1.1'),
  quest(7, 'capitulo-i-acto-iv', 'Capítulo I', 'Liyue', 'Acto IV', 'Nos volveremos a encontrar', '1.4', 'liyue', 'El Viajero y Dainsleif investigan unas ruinas vinculadas con la Orden del Abismo y el rastro del gemelo perdido.', '1.4', '/misiones/we-will-be-reunited/'),

  quest(8, 'capitulo-ii-prologo', 'Capítulo II', 'Inazuma', 'Prólogo', 'Viento de otoño y hojas escarlata', '1.6', 'inazuma', 'Antes de zarpar hacia Inazuma, el Viajero participa en el Torneo Crux y conoce a Kazuha, un exiliado de la nación cerrada.', '1.6'),
  quest(9, 'capitulo-ii-acto-i', 'Capítulo II', 'Inazuma', 'Acto I', 'La diosa inmutable y la utopía eterna', '2.0', 'inazuma', 'La llegada clandestina a Inazuma enfrenta al Viajero con el Decreto de Captura de Visiones y el aislamiento impuesto por el shogunato.', '2.0'),
  quest(10, 'capitulo-ii-acto-ii', 'Capítulo II', 'Inazuma', 'Acto II', 'Quietud, la sublimación de la sombra', '2.0', 'inazuma', 'Tras desafiar el decreto, el Viajero abandona la capital y se aproxima a la resistencia que combate al shogunato.', '2.0'),
  quest(11, 'capitulo-ii-acto-iii', 'Capítulo II', 'Inazuma', 'Acto III', 'Omnipresencia sobre los mortales', '2.1', 'inazuma', 'La guerra civil, los Fatui y el ideal de eternidad convergen en el cierre del conflicto principal de Inazuma.', '2.1'),
  quest(12, 'intermedio-acto-i', 'Capítulo intermedio', 'Liyue', 'Acto I', 'La grulla regresa con el viento', '2.4', 'liyue', 'La reconstrucción del Palacio de Jade reúne al Viajero con Shenhe y desemboca en una nueva defensa del puerto de Liyue.', '2.4'),
  quest(13, 'capitulo-ii-acto-iv', 'Capítulo II', 'La Sima', 'Acto IV', 'Réquiem desde el abismo', '2.6', 'inazuma', 'Una expedición con Dainsleif por las profundidades de la Sima descubre vestigios de Khaenri’ah y del destino de sus habitantes.', '2.6', '/misiones/requiem-of-the-echoing-depths/'),
  quest(14, 'intermedio-acto-ii', 'Capítulo intermedio', 'La Sima', 'Acto II', 'Senderos peligrosos', '2.7', 'liyue', 'Un grupo queda atrapado en las profundidades de la Sima, donde los espacios anómalos revelan recuerdos ligados a los yakshas.', '2.7'),

  quest(15, 'capitulo-iii-acto-i', 'Capítulo III', 'Sumeru', 'Acto I', 'Tras la bruma y el bosque', '3.0', 'sumeru', 'El viaje entra en Sumeru y presenta la selva, la Akademiya y una crisis cuyo lenguaje gira alrededor de sueños y conocimiento.', '3.0'),
  quest(16, 'capitulo-iii-acto-ii', 'Capítulo III', 'Sumeru', 'Acto II', 'El amanecer de las mil rosas', '3.0', 'sumeru', 'El Festival Sabzeruz se repite en un ciclo que obliga al Viajero a comprender cómo y por qué están siendo utilizados los sueños.', '3.0'),
  quest(17, 'capitulo-iii-acto-iii', 'Capítulo III', 'Sumeru', 'Acto III', 'Quimeras, ilusiones y engaños', '3.1', 'sumeru', 'La investigación sobre la Akademiya y sus aliados expande la conspiración y lleva al Viajero a seguir pistas fuera de la ciudad.', '3.1'),
  quest(18, 'capitulo-iii-acto-iv', 'Capítulo III', 'Sumeru', 'Acto IV', 'El rey Deshret y los tres peregrinos', '3.1', 'sumeru', 'El recorrido por el desierto confronta versiones enfrentadas de la historia de Sumeru y prepara una alianza contra los Sabios.', '3.1'),
  quest(19, 'capitulo-iii-acto-v', 'Capítulo III', 'Sumeru', 'Acto V', 'Pulso de Akasha, fuego que arrasa', '3.2', 'sumeru', 'La operación para rescatar a Nahida y detener el proyecto de la Akademiya conduce al desenlace de la crisis de Sumeru.', '3.2'),
  quest(20, 'intermedio-acto-iii', 'Capítulo intermedio', 'Sumeru', 'Acto III', 'La transposición de la génesis', '3.3', 'sumeru', 'El Trotamundos revisa su pasado y toma una decisión que altera cómo el mundo recuerda parte de su historia.', '3.3'),
  quest(21, 'capitulo-iii-acto-vi', 'Capítulo III', 'Sumeru', 'Acto VI', 'Cariberto', '3.5', 'sumeru', 'Un recuerdo relacionado con Dainsleif, Kaeya y un hombre de Khaenri’ah ilumina el origen de una figura central de la Orden del Abismo.', '3.5', '/misiones/caribert/'),

  quest(22, 'capitulo-iv-acto-i', 'Capítulo IV', 'Fontaine', 'Acto I', 'Preludio de la claridad y la oscuridad', '4.0', 'fontaine', 'La llegada a Fontaine introduce la profecía que pesa sobre la nación y un caso judicial que involucra a Lyney y Lynette.', '4.0'),
  quest(23, 'capitulo-iv-acto-ii', 'Capítulo IV', 'Fontaine', 'Acto II', 'Una llovizna inesperada', '4.0', 'fontaine', 'Una investigación por desapariciones conecta los tribunales de Fontaine con un problema más antiguo y peligroso.', '4.0'),
  quest(24, 'capitulo-iv-acto-iii', 'Capítulo IV', 'Fontaine', 'Acto III', 'Hacia las estrellas del abismo marino', '4.1', 'fontaine', 'El Viajero entra en el Fuerte Merópide para investigar a Childe y las anomalías ocultas bajo la superficie de Fontaine.', '4.1'),
  quest(25, 'capitulo-iv-acto-iv', 'Capítulo IV', 'Fontaine', 'Acto IV', 'Un cataclismo en ciernes', '4.1', 'fontaine', 'La investigación del fuerte desemboca en una emergencia ligada al agua primordial y acelera el cumplimiento de la profecía.', '4.1'),
  quest(26, 'capitulo-iv-acto-v', 'Capítulo IV', 'Fontaine', 'Acto V', 'Mascarada de los culpables', '4.2', 'fontaine', 'El juicio de Furina y la catástrofe anunciada convergen en el desenlace del arco principal de Fontaine.', '4.2'),
  quest(27, 'capitulo-iv-acto-vi', 'Capítulo IV', 'Fontaine', 'Acto VI', 'Un cuento para dormir', '4.7', 'fontaine', 'Un nuevo encuentro con Dainsleif profundiza la búsqueda del gemelo y los recuerdos que conectan distintos momentos del viaje.', '4.7', '/misiones/bedtime-story/'),

  quest(28, 'capitulo-v-acto-i', 'Capítulo V', 'Natlan', 'Acto I', 'Un viaje glorioso y ardiente', '5.0', 'natlan', 'El Viajero llega a Natlan, conoce sus tribus y participa en el Peregrinaje del Retorno del Fuego Sagrado.', '5.0'),
  quest(29, 'capitulo-v-acto-ii', 'Capítulo V', 'Natlan', 'Acto II', 'Roca oscura bajo roca blanca', '5.0', 'natlan', 'La búsqueda de un nombre antiguo lleva al grupo hacia la Noche y muestra el coste del conflicto que enfrenta Natlan.', '5.0'),
  quest(30, 'capitulo-v-acto-iii', 'Capítulo V', 'Natlan', 'Acto III', 'Más allá del humo y los espejos', '5.1', 'natlan', 'Las facciones de Natlan y los Fatui avanzan sus planes mientras el Viajero intenta comprender la estrategia de Mavuika.', '5.1'),
  quest(31, 'capitulo-v-acto-iv', 'Capítulo V', 'Natlan', 'Acto IV', 'El arcoíris destinado a arder', '5.1', 'natlan', 'La invasión del Abismo convierte el conflicto en una defensa abierta de Natlan y pone a prueba la alianza entre sus tribus.', '5.1'),
  quest(32, 'capitulo-v-entreacto', 'Capítulo V', 'Natlan', 'Entreacto', 'Confluencia de las llamas', '5.2', 'natlan', 'El entreacto reorganiza fuerzas y relaciones después de la batalla, preparando la ofensiva final del capítulo.', '5.2'),
  quest(33, 'capitulo-v-acto-v', 'Capítulo V', 'Natlan', 'Acto V', 'Oda incandescente de la resurrección', '5.3', 'natlan', 'La guerra de Natlan alcanza su desenlace mediante el plan de Mavuika y la lucha por romper la amenaza del Abismo.', '5.3'),
  quest(34, 'intermedio-acto-iv', 'Capítulo intermedio', 'Mondstadt', 'Acto IV', 'Paralogismo', '5.6', 'natlan', 'Un capítulo intermedio ligado al Aquelarre retoma misterios de Mondstadt y del viaje antes del siguiente gran destino.', '5.6', '/misiones/paralogism/'),
  quest(35, 'capitulo-v-acto-vi', 'Capítulo V', 'Natlan', 'Acto VI', 'El espacio-tiempo en el que estás', '5.7', 'natlan', 'La historia vuelve al hilo del gemelo perdido y sitúa al Viajero ante una nueva alteración de espacio, tiempo y memoria.', '5.7', '/misiones/a-space-and-time-for-you/'),

  quest(36, 'cancion-lunar-preludio', 'Canción lunar', 'Nod Krai', 'Preludio', 'El camino de regreso a casa', '5.8', 'snezhnaya', 'El preludio abre el camino hacia Nod Krai y enlaza la conclusión de Natlan con la siguiente etapa del viaje.', '5.8'),
  quest(37, 'cancion-lunar-acto-i', 'Canción lunar', 'Nod Krai', 'Acto I', 'Danza de las mareas nevadas y las arboledas escarchadas', 'Luna I', 'snezhnaya', 'El Viajero llega a Nod Krai, conoce sus comunidades y comienza a seguir los conflictos asociados con la luna y la Cacería salvaje.', 'luna-i'),
  quest(38, 'cancion-lunar-acto-ii', 'Canción lunar', 'Nod Krai', 'Acto II', 'Elegía del polvo y las lámparas', 'Luna I', 'snezhnaya', 'La investigación se interna en recuerdos y tensiones locales mientras distintas facciones persiguen sus propios objetivos.', 'luna-i'),
  quest(39, 'cancion-lunar-acto-iii', 'Canción lunar', 'Nod Krai', 'Acto III', 'Una nación inexistente', 'Luna II', 'snezhnaya', 'El conflicto con la Cacería salvaje y los secretos lunares se amplía en una nación cuya existencia está puesta en duda.', 'luna-ii'),
  quest(40, 'cancion-lunar-acto-iv', 'Canción lunar', 'Nod Krai', 'Acto IV', 'El lamento de la evanescente luz lunar', 'Luna II', 'snezhnaya', 'Las profecías y el destino de la luz lunar conducen el primer gran desenlace del arco de Nod Krai.', 'luna-ii'),
  quest(41, 'cancion-lunar-acto-v', 'Canción lunar', 'Nod Krai', 'Acto V', 'Nocturno del Lejano Norte', 'Luna III', 'snezhnaya', 'El relato abre un nuevo movimiento en el norte y continúa las consecuencias de los cuatro primeros actos.', 'luna-iii'),
  quest(42, 'cancion-lunar-acto-vi', 'Canción lunar', 'Nod Krai', 'Acto VI', 'La luz lunar entre la bruma del alba', 'Luna III', 'snezhnaya', 'El segundo acto de Luna III funciona como puente entre la noche del norte y la siguiente confrontación del ciclo lunar.', 'luna-iii'),
  quest(43, 'cancion-lunar-acto-vii', 'Canción lunar', 'Nod Krai', 'Acto VII', 'Un viajero en una noche de invierno', 'Luna IV', 'snezhnaya', 'Una batalla por Nod Krai y sus compañeros sitúa al Viajero en un espacio donde los caminos y recuerdos vuelven a cruzarse.', 'luna-iv'),
  quest(44, 'cancion-lunar-acto-viii', 'Canción lunar', 'Nod Krai', 'Acto VIII', 'La verdadera luna', 'Luna IV', 'snezhnaya', 'La búsqueda de la luna auténtica reúne las líneas abiertas del arco y expone el centro de la disputa lunar.', 'luna-iv'),
  quest(45, 'cancion-lunar-acto-ix', 'Canción lunar', 'Sumeru', 'Acto IX', 'Todo cae en el vacío', 'Luna VII', 'snezhnaya', 'La etapa final de Canción lunar regresa a Sumeru y abre una crisis que vuelve a enfrentar conocimiento, memoria y vacío.', 'luna-vii'),
  quest(46, 'cancion-lunar-acto-x', 'Canción lunar', 'Sumeru', 'Acto X', 'La verdad entre las páginas de Purana', 'Luna VII', 'snezhnaya', 'El acto final conduce las preguntas de Canción lunar hacia la sabiduría de Sumeru y cierra el ciclo antes de Snezhnaya.', 'luna-vii'),

  quest(47, 'capitulo-vii-acto-i', 'Capítulo VII', 'Snezhnaya', 'Acto I', 'Frío eterno y cruel', '7.0', 'snezhnaya', 'La llegada a Snezhnaya abre un nuevo capítulo entre el hielo, la estructura del poder local y las órdenes de la Zarina.', '7.0'),
  quest(48, 'capitulo-vii-acto-ii', 'Capítulo VII', 'Snezhnaya', 'Acto II', 'Nocturno de las almas difuntas', '7.0', 'snezhnaya', 'La continuación del viaje profundiza el conflicto presentado en el primer acto y conduce hacia las fuerzas del inframundo.', '7.0'),
  quest(49, 'capitulo-vii-acto-iii', 'Capítulo VII', 'Snezhnaya', 'Acto III', 'El despertar de la noche blanca onírica', '7.1', 'snezhnaya', 'Los acontecimientos de la noche blanca impulsan la siguiente fase del conflicto y preparan el descenso del acto posterior.', '7.1'),
  quest(50, 'capitulo-vii-acto-iv', 'Capítulo VII', 'Snezhnaya', 'Acto IV', 'Un réquiem para el inframundo', '7.1', 'snezhnaya', 'El arco llega al inframundo y resuelve el movimiento narrativo publicado con la versión 7.1.', '7.1'),
  quest(51, 'capitulo-vii-acto-v', 'Capítulo VII', 'Snezhnaya', 'Acto V', 'La hora de la destrucción', '7.2', 'snezhnaya', 'La crisis de Snezhnaya entra en su fase decisiva y continúa directamente después del réquiem de la versión anterior.', '7.2'),
  quest(52, 'capitulo-vii-acto-vi', 'Capítulo VII', 'Snezhnaya', 'Acto VI', 'El ayer llegado desde el otro lado', '7.2', 'snezhnaya', 'El segundo acto de la versión 7.2 cierra el bloque publicado hasta la fecha y enlaza el presente con lo llegado desde el pasado.', '7.2'),
];

export const archonQuestArcs = [...new Set(archonQuests.map((entry) => entry.arc))];
export const archonQuestVersions = [...new Set(archonQuests.map((entry) => entry.version))];

export const archonQuestArcAnchor = (arc: string) => `capitulo-${arc
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('es')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '')}`;

export const archonQuestEntryHref = (id: string) => `/misiones/arconte/${encodeURIComponent(id)}/`;
