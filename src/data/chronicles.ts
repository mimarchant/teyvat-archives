import type { CollectionEntry } from 'astro:content';

export type Chronicle = Pick<CollectionEntry<'chronicles'>['data'],
  'title' | 'summary' | 'era' | 'region' | 'classification' | 'spoilerLevel' |
  'reviewStatus' | 'timelineOrder' | 'chronologyConfirmed'> & { id: string; href: string };

export const classificationLabels = {
  canon: 'Canon', interpretation: 'Interpretación', theory: 'Teoría', unresolved: 'Sin resolver',
} satisfies Record<Chronicle['classification'], string>;
export const reviewLabels = {
  draft: 'Borrador editorial', 'needs-review': 'Revisión pendiente', verified: 'Verificada',
} satisfies Record<Chronicle['reviewStatus'], string>;

export function toChronicle(entry: CollectionEntry<'chronicles'>): Chronicle {
  const { title, summary, era, region, classification, spoilerLevel, reviewStatus,
    timelineOrder, chronologyConfirmed } = entry.data;
  return { id: entry.id, href: `/cronicas/${entry.id.split('/').map(encodeURIComponent).join('/')}/`,
    title, summary, era, region, classification, spoilerLevel, reviewStatus,
    timelineOrder, chronologyConfirmed };
}
