import { archonQuests } from './archon-quests.ts';

const stageDefinitions = [
  {
    title: 'Mondstadt',
    chapter: 'Prólogo',
    summary: 'El inicio del viaje y el primer capítulo documentado del archivo.',
    firstOrder: 1,
    lastOrder: 3,
    anchor: 'capitulo-prologo',
  },
  {
    title: 'Liyue',
    chapter: 'Capítulo I',
    summary: 'La ruta principal de Liyue y el primer reencuentro con el hilo del gemelo.',
    firstOrder: 4,
    lastOrder: 7,
    anchor: 'capitulo-capitulo-i',
  },
  {
    title: 'Inazuma e intermedios',
    chapter: 'Capítulo II',
    summary: 'Inazuma, la Sima y los capítulos intermedios publicados entre ambas etapas.',
    firstOrder: 8,
    lastOrder: 14,
    anchor: 'capitulo-capitulo-ii',
  },
  {
    title: 'Sumeru',
    chapter: 'Capítulo III',
    summary: 'El arco de Sumeru y las misiones que continúan la búsqueda de respuestas.',
    firstOrder: 15,
    lastOrder: 21,
    anchor: 'capitulo-capitulo-iii',
  },
  {
    title: 'Fontaine',
    chapter: 'Capítulo IV',
    summary: 'El recorrido principal de Fontaine hasta su acto final documentado.',
    firstOrder: 22,
    lastOrder: 27,
    anchor: 'capitulo-capitulo-iv',
  },
  {
    title: 'Natlan',
    chapter: 'Capítulo V',
    summary: 'La secuencia de Natlan y los intermedios que preparan el siguiente destino.',
    firstOrder: 28,
    lastOrder: 35,
    anchor: 'capitulo-capitulo-v',
  },
  {
    title: 'Nod Krai',
    chapter: 'Canción lunar',
    summary: 'El preludio y los diez actos del ciclo lunar conservados en el archivo.',
    firstOrder: 36,
    lastOrder: 46,
    anchor: 'capitulo-cancion-lunar',
  },
  {
    title: 'Snezhnaya',
    chapter: 'Capítulo VII',
    summary: 'El capítulo vigente, documentado hasta los actos publicados en la versión 7.2.',
    firstOrder: 47,
    lastOrder: 52,
    anchor: 'capitulo-capitulo-vii',
  },
] as const;

export const homeJourneyStages = stageDefinitions.map((stage) => {
  const entries = archonQuests.filter(({ order }) => order >= stage.firstOrder && order <= stage.lastOrder);
  const firstVersion = entries.at(0)?.version ?? '';
  const lastVersion = entries.at(-1)?.version ?? '';
  return {
    ...stage,
    actCount: entries.length,
    versionLabel: firstVersion === lastVersion ? firstVersion : `${firstVersion} — ${lastVersion}`,
    href: `/misiones/arconte/#${stage.anchor}`,
  };
});

