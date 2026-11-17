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
  { id: 'mondstadt', name: 'Mondstadt', category: 'nation', subtitle: 'La Capital de la Libertad', description: 'Ficha territorial basada en la presentación del mapa oficial y en la asociación histórica del prólogo publicada en Travail.', element: 'Anemo', status: 'available', spoilerLevel: 'Sin spoilers argumentales', href: '/entidades/mondstadt/', order: 1 },
  { id: 'liyue', name: 'Liyue', category: 'nation', subtitle: 'El puerto próspero del este', description: 'Ficha territorial basada en la presentación del mapa oficial y en la asociación histórica del capítulo I publicada en Travail.', element: 'Geo', status: 'available', spoilerLevel: 'Sin spoilers argumentales', href: '/entidades/liyue/', order: 2 },
  { id: 'inazuma', name: 'Inazuma', category: 'nation', subtitle: 'El archipiélago del extremo oriente', description: 'Presentación territorial, áreas de apertura y mecanismos de exploración documentados para la versión 2.0.', element: 'Electro', status: 'available', spoilerLevel: 'Spoilers hasta Inazuma', href: '/entidades/inazuma/', order: 3 },
  { id: 'sumeru', name: 'Sumeru', category: 'nation', subtitle: 'La nación de eruditos', description: 'Presentación territorial de la selva y el desierto, contrastada con avances oficiales de las versiones 3.0 y 3.1.', element: 'Dendro', status: 'available', spoilerLevel: 'Spoilers hasta Sumeru', href: '/entidades/sumeru/', order: 4 },
  { id: 'fontaine', name: 'Fontaine', category: 'nation', subtitle: 'El origen de toda agua', description: 'Presentación territorial y primera apertura terrestre y submarina documentada para la versión 4.0.', element: 'Hydro', status: 'available', spoilerLevel: 'Spoilers hasta Fontaine', href: '/entidades/fontaine/', order: 5 },
  { id: 'natlan', name: 'Natlan', category: 'nation', subtitle: 'La nación de las alianzas', description: 'Presentación territorial, primeras áreas y convivencia con saurios documentadas para la versión 5.0.', element: 'Pyro', status: 'available', spoilerLevel: 'Spoilers hasta Natlan', href: '/entidades/natlan/', order: 6 },
  { id: 'snezhnaya', name: 'Snezhnaya', category: 'nation', subtitle: 'La nación del invierno eterno', description: 'Presentación territorial y expansión de áreas, ferrocarril y Puntos de encuentro documentada para la versión 7.2.', element: 'Cryo', status: 'available', spoilerLevel: 'Spoilers hasta Snezhnaya', href: '/entidades/snezhnaya/', order: 7 },
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
