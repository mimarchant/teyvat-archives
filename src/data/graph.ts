import type { CollectionEntry } from 'astro:content';

export type ArchiveCollection = 'chronicles' | 'entities' | 'quests' | 'mysteries';
export type ArchiveEntry = CollectionEntry<ArchiveCollection>;
type EntryData = ArchiveEntry['data'];
export type SpoilerMode = 'hide' | 'warn' | 'show';
export type GraphNode = Pick<EntryData, 'title' | 'summary' | 'classification' | 'reviewStatus' | 'spoilerLevel'> & {
  id: string;
  collection: ArchiveCollection;
  href?: string;
};
export type GraphEdge = EntryData['relations'][number] & {
  key: string;
  from: string;
  to: string;
  evidence: EntryData['sources'];
};
export interface KnowledgeGraph { nodes: GraphNode[]; edges: GraphEdge[] }

export const collectionLabels: Record<ArchiveCollection, string> = {
  chronicles: 'Crónicas', entities: 'Entidades', quests: 'Misiones', mysteries: 'Misterios',
};
export const relationLabels: Record<GraphEdge['type'], string> = {
  mentions: 'Menciona', 'located-in': 'Se ubica en', 'part-of': 'Forma parte de',
  'participates-in': 'Participa en', 'related-to': 'Se relaciona con',
};
export const nodeId = (collection: ArchiveCollection, id: string) => `${collection}:${id}`;

/** Only collections with an implemented article route receive a link. */
function articleHref(entry: ArchiveEntry) {
  return entry.collection === 'chronicles'
    ? `/cronicas/${entry.id.split('/').map(encodeURIComponent).join('/')}/` : undefined;
}

export function buildKnowledgeGraph(entries: readonly ArchiveEntry[]): KnowledgeGraph {
  const nodes: GraphNode[] = entries.map(entry => ({
    id: nodeId(entry.collection, entry.id), collection: entry.collection, href: articleHref(entry),
    title: entry.data.title, summary: entry.data.summary, classification: entry.data.classification,
    reviewStatus: entry.data.reviewStatus, spoilerLevel: entry.data.spoilerLevel,
  })).sort((a, b) => a.id.localeCompare(b.id));
  const ids = new Set(nodes.map(node => node.id));
  if (ids.size !== nodes.length) throw new Error('Grafo: identificadores de entrada duplicados.');
  const edges: GraphEdge[] = [];
  for (const entry of entries) {
    const from = nodeId(entry.collection, entry.id);
    const sourceIds = new Set(entry.data.sources.map(source => source.id));
    if (sourceIds.size !== entry.data.sources.length) throw new Error(`Grafo: fuentes duplicadas en ${from}.`);
    const relationIds = new Set<string>();
    for (const relation of entry.data.relations) {
      const to = nodeId(relation.target.collection, relation.target.id);
      const fail = (reason: string): never => { throw new Error(`Grafo: ${from}/${relation.id}: ${reason}`); };
      if (relationIds.has(relation.id)) fail('identificador de relación duplicado.');
      relationIds.add(relation.id);
      if (!ids.has(to)) fail(`destino inexistente ${to}.`);
      if (from === to) fail('la relación apunta a su propia entrada.');
      if (!relation.sourceIds.length || relation.sourceIds.some(id => !sourceIds.has(id))) {
        fail('cada relación necesita fuentes registradas en la entrada de origen.');
      }
      edges.push({ ...relation, key: `${from}/${relation.id}`, from, to,
        evidence: entry.data.sources.filter(source => relation.sourceIds.includes(source.id)) });
    }
  }
  return { nodes, edges: edges.sort((a, b) => a.key.localeCompare(b.key)) };
}

export function canReveal(level: GraphNode['spoilerLevel'], mode: SpoilerMode, manuallyRevealed = false) {
  return level === 'none' || mode === 'show' || (mode === 'warn' && manuallyRevealed);
}

/** Hiding either endpoint also hides the relationship and its evidence. */
export function visibleEdges(graph: KnowledgeGraph, visibleNodeIds: ReadonlySet<string>, mode: SpoilerMode,
  revealedEdgeIds: readonly string[] = []) {
  return graph.edges.filter(edge => visibleNodeIds.has(edge.from) && visibleNodeIds.has(edge.to) &&
    canReveal(edge.spoilerLevel, mode, revealedEdgeIds.includes(edge.key)));
}
