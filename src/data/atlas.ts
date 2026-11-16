export type AtlasCategory = 'nation' | 'region' | 'civilization' | 'historic-site';

export interface AtlasEntry {
  id: string;
  name: string;
  category: AtlasCategory;
  subtitle: string;
  description: string;
  element?: string;
  status: 'available' | 'in-progress';
  spoilerLevel: string;
  href?: string;
  order: number;
}

export const atlasEntries: AtlasEntry[] = [
  { id: 'mondstadt', name: 'Mondstadt', category: 'nation', subtitle: 'La ciudad de la libertad', description: 'Una nación asociada al viento y a la libertad, donde la ciudad y sus territorios guardan historias de resistencia, canciones y antiguas leyendas.', element: 'Anemo', status: 'in-progress', spoilerLevel: 'Mondstadt', order: 1 },
  { id: 'liyue', name: 'Liyue', category: 'nation', subtitle: 'El puerto de los contratos', description: 'Un puerto construido sobre acuerdos, comercio y memoria. Sus paisajes conectan la vida cotidiana con tradiciones de larga data.', element: 'Geo', status: 'in-progress', spoilerLevel: 'Liyue', order: 2 },
  { id: 'inazuma', name: 'Inazuma', category: 'nation', subtitle: 'El reino de la eternidad', description: 'Un archipiélago marcado por el aislamiento, las tormentas y el debate sobre lo que significa preservar aquello que amamos.', element: 'Electro', status: 'in-progress', spoilerLevel: 'Inazuma', order: 3 },
  { id: 'sumeru', name: 'Sumeru', category: 'nation', subtitle: 'La nación de la sabiduría', description: 'Una tierra de selvas y desiertos donde el conocimiento, los sueños y la memoria ocupan un lugar central.', element: 'Dendro', status: 'in-progress', spoilerLevel: 'Sumeru', order: 4 },
  { id: 'fontaine', name: 'Fontaine', category: 'nation', subtitle: 'La nación de la justicia', description: 'Una sociedad fascinada por la innovación, el espectáculo y los juicios, rodeada por las aguas que definen su identidad.', element: 'Hydro', status: 'in-progress', spoilerLevel: 'Fontaine', order: 5 },
  { id: 'natlan', name: 'Natlan', category: 'nation', subtitle: 'La nación de la guerra', description: 'Una tierra de pueblos y tradiciones diversas, donde la competición, la comunidad y el espíritu de lucha dan forma a sus relatos.', element: 'Pyro', status: 'in-progress', spoilerLevel: 'Natlan', order: 6 },
  { id: 'snezhnaya', name: 'Snezhnaya', category: 'nation', subtitle: 'La nación de la nieve', description: 'Una nación aún envuelta en incógnitas para el archivo. Su papel en la historia merece entradas respaldadas por fuentes concretas.', element: 'Cryo', status: 'in-progress', spoilerLevel: 'Snezhnaya', order: 7 },
  { id: 'khaenriah', name: "Khaenri'ah", category: 'civilization', subtitle: 'La civilización caída', description: 'Una civilización sin Arconte cuya historia está ligada a algunos de los mayores misterios del mundo. Su crónica editorial está en preparación.', status: 'available', spoilerLevel: 'Alto · varias regiones', href: '/cronicas/khaenriah/', order: 8 },
];

export const atlasCategories: { id: 'all' | AtlasCategory; label: string }[] = [
  { id: 'all', label: 'Todo el atlas' },
  { id: 'nation', label: 'Naciones' },
  { id: 'region', label: 'Regiones' },
  { id: 'civilization', label: 'Civilizaciones' },
  { id: 'historic-site', label: 'Lugares históricos' },
];

export const atlasCategoryLabels: Record<AtlasCategory, string> = {
  nation: 'Nación',
  region: 'Región',
  civilization: 'Civilización',
  'historic-site': 'Lugar histórico',
};
