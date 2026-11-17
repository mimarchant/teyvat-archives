import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';
import { buildKnowledgeGraph, canReveal, visibleEdges } from '../src/data/graph.ts';

// Synthetic editorial fixtures, never loaded into the site's content collections.
const source = { id: 'fixture-source', type: 'book', title: 'Fixture source', supports: 'Fixture statement' };
const entry = (collection, id, data = {}) => ({ collection, id, data: {
  title: id, summary: 'Fixture', classification: 'unresolved', reviewStatus: 'draft',
  spoilerLevel: 'none', updatedAt: new Date(0), sources: [source], relations: [], sections: [], ...data,
} });
const relation = (overrides = {}) => ({ id: 'fixture-relation',
  target: { collection: 'entities', id: 'fixture-b' }, type: 'mentions',
  classification: 'theory', reviewStatus: 'needs-review', spoilerLevel: 'sumeru',
  explanation: 'Synthetic fixture', sourceIds: [source.id], ...overrides,
});
const linked = () => [entry('chronicles', 'fixture-a', { relations: [relation()] }), entry('entities', 'fixture-b')];

test('preserves isolated entries without inventing edges or routes', () => {
  const graph = buildKnowledgeGraph([entry('entities', 'same'), entry('chronicles', 'same')]);
  assert.equal(graph.nodes.length, 2);
  assert.equal(graph.edges.length, 0);
  assert.equal(graph.nodes.find(n => n.collection === 'entities').href, '/entidades/same/');
  assert.equal(graph.nodes.find(n => n.collection === 'chronicles').href, '/cronicas/same/');
});
test('builds directed relationships with the origin evidence and editorial classification', () => {
  const graph = buildKnowledgeGraph(linked());
  assert.equal(graph.edges[0].from, 'chronicles:fixture-a');
  assert.equal(graph.edges[0].to, 'entities:fixture-b');
  assert.equal(graph.edges[0].classification, 'theory');
  assert.deepEqual(graph.edges[0].evidence, [source]);
});

test('article links encode IDs for every implemented collection route', () => {
  const graph = buildKnowledgeGraph([entry('entities', 'a b/é'), entry('quests', 'quest'), entry('mysteries', 'mystery')]);
  assert.equal(graph.nodes.find(n => n.collection === 'entities').href, '/entidades/a%20b/%C3%A9/');
  assert.equal(graph.nodes.find(n => n.collection === 'quests').href, '/misiones/quest/');
  assert.equal(graph.nodes.find(n => n.collection === 'mysteries').href, '/misterios/mystery/');
});
test('rejects dangling targets', () => {
  assert.throws(() => buildKnowledgeGraph([linked()[0]]), /destino inexistente/);
});
test('rejects unregistered and missing evidence', () => {
  for (const sourceIds of [[], ['missing-source']]) {
    assert.throws(() => buildKnowledgeGraph([
      entry('chronicles', 'fixture-a', { relations: [relation({ sourceIds })] }), entry('entities', 'fixture-b'),
    ]), /fuentes registradas/);
  }
});
test('rejects ambiguous duplicate source and relation IDs', () => {
  assert.throws(() => buildKnowledgeGraph([entry('chronicles', 'a', { sources: [source, source] })]), /fuentes duplicadas/);
  assert.throws(() => buildKnowledgeGraph([
    entry('chronicles', 'fixture-a', { relations: [relation(), relation()] }), entry('entities', 'fixture-b'),
  ]), /relación duplicado/);
});
test('rejects duplicate entry identifiers and self references', () => {
  assert.throws(() => buildKnowledgeGraph([entry('entities', 'a'), entry('entities', 'a')]), /duplicados/);
  assert.throws(() => buildKnowledgeGraph([entry('entities', 'fixture-b', { relations: [relation()] })]), /propia entrada/);
});
test('spoiler mode hide cannot be overridden by manual reveal', () => {
  assert.equal(canReveal('sumeru', 'hide', true), false);
  assert.equal(canReveal('sumeru', 'warn'), false);
  assert.equal(canReveal('sumeru', 'warn', true), true);
  assert.equal(canReveal('sumeru', 'show'), true);
  assert.equal(canReveal('none', 'hide'), true);
});
test('protected relationships stay hidden until explicitly revealed', () => {
  const graph = buildKnowledgeGraph(linked());
  const ids = new Set(graph.nodes.map(node => node.id));
  assert.equal(visibleEdges(graph, ids, 'warn').length, 0);
  assert.equal(visibleEdges(graph, ids, 'warn', [graph.edges[0].key]).length, 1);
  assert.equal(visibleEdges(graph, ids, 'hide', [graph.edges[0].key]).length, 0);
});
test('neither evidence nor topology is exposed when either endpoint is hidden', () => {
  const graph = buildKnowledgeGraph(linked());
  for (const id of graph.nodes.map(node => node.id)) {
    assert.deepEqual(visibleEdges(graph, new Set([id]), 'show'), []);
  }
});

test('published connection resolves its article and evidence without bypassing spoilers', async () => {
  const load = async (collection, id) => {
    const raw = await readFile(new URL(`../src/content/${collection}/${id}.mdx`, import.meta.url), 'utf8');
    const data = parse(raw.match(/^---\r?\n([\s\S]*?)\r?\n---/u)[1]);
    return { collection, id, data: { relations: [], ...data } };
  };
  const graph = buildKnowledgeGraph(await Promise.all([load('chronicles', 'khaenriah'), load('entities', 'dainsleif')]));
  const ids = new Set(graph.nodes.map(n => n.id));
  assert.equal(graph.edges.length, 1);
  assert.equal(graph.edges[0].evidence[0].id, 'registro-audiovisual-dainsleif');
  assert.equal(visibleEdges(graph, ids, 'hide').length, 0);
  assert.equal(visibleEdges(graph, ids, 'warn').length, 0);
  assert.equal(visibleEdges(graph, ids, 'show').length, 1);
  assert.equal(graph.nodes.find(n => n.id === graph.edges[0].to).href, '/entidades/dainsleif/');
});

test('the second sourced line adds only its reviewed Zibai mention', async () => {
  const load = async (collection, id) => {
    const raw = await readFile(new URL(`../src/content/${collection}/${id}.mdx`, import.meta.url), 'utf8');
    const data = parse(raw.match(/^---\r?\n([\s\S]*?)\r?\n---/u)[1]);
    return { collection, id, data: { relations: [], ...data } };
  };
  const graph = buildKnowledgeGraph(await Promise.all([
    load('chronicles', 'khaenriah'), load('entities', 'dainsleif'),
    load('chronicles', 'lang-gan'), load('entities', 'zibai'), load('entities', 'lang-gan'),
  ]));
  assert.equal(graph.nodes.length, 5);
  assert.equal(graph.edges.length, 3);
  const edge = graph.edges.find(item => item.key === 'chronicles:lang-gan/menciona-zibai');
  assert.ok(edge);
  assert.equal(edge.to, 'entities:zibai');
  assert.deepEqual(edge.evidence.map(source => source.id), ['teaser-nightmare-yore']);
  const ids = new Set(graph.nodes.map(node => node.id));
  assert.equal(visibleEdges(graph, ids, 'warn').length, 0);
  assert.equal(visibleEdges(graph, ids, 'warn', [edge.key]).length, 1);
  assert.equal(graph.nodes.find(node => node.id === edge.to).href, '/entidades/zibai/');
});

test('the first quest article links its reviewed passage without inventing character participation', async () => {
  const load = async (collection, id) => {
    const raw = await readFile(new URL(`../src/content/${collection}/${id}.mdx`, import.meta.url), 'utf8');
    const data = parse(raw.match(/^---\r?\n([\s\S]*?)\r?\n---/u)[1]);
    return { collection, id, data: { relations: [], ...data } };
  };
  const graph = buildKnowledgeGraph(await Promise.all([
    load('quests', 'we-will-be-reunited'), load('chronicles', 'khaenriah'), load('entities', 'dainsleif'),
    load('entities', 'abyss-order'), load('entities', 'treasure-hoarders'),
  ]));
  const edge = graph.edges.find(item => item.key === 'quests:we-will-be-reunited/relacionada-cronica-khaenriah');
  assert.ok(edge);
  assert.equal(edge.to, 'chronicles:khaenriah');
  assert.equal(edge.type, 'related-to');
  assert.equal(edge.classification, 'interpretation');
  assert.deepEqual(edge.evidence.map(source => source.id), ['anuncio-oficial-acto-iv', 'registro-audiovisual-pasaje']);
  assert.equal(graph.nodes.find(node => node.id === edge.from).href, '/misiones/we-will-be-reunited/');
  assert.equal(graph.edges.some(item => item.from === edge.from && item.to === 'entities:dainsleif'), false);
  assert.equal(graph.edges.filter(item => item.from === edge.from).length, 3);
  assert.deepEqual(graph.edges.filter(item => item.from === edge.from && item.type === 'mentions').map(item => item.to).sort(),
    ['entities:abyss-order', 'entities:treasure-hoarders']);
});

test('the expansion pack gives both open mysteries article routes and sourced targets', async () => {
  const load = async (collection, id) => {
    const raw = await readFile(new URL(`../src/content/${collection}/${id}.mdx`, import.meta.url), 'utf8');
    const data = parse(raw.match(/^---\r?\n([\s\S]*?)\r?\n---/u)[1]);
    return { collection, id, data: { relations: [], ...data } };
  };
  const graph = buildKnowledgeGraph(await Promise.all([
    load('mysteries', 'voice-over-lang-gan'), load('mysteries', 'fate-of-lang-gan'),
    load('entities', 'lang-gan'), load('chronicles', 'lang-gan'), load('entities', 'zibai'),
  ]));
  const mysteries = graph.nodes.filter(node => node.collection === 'mysteries');
  assert.equal(mysteries.length, 2);
  assert.ok(mysteries.every(node => node.href?.startsWith('/misterios/')));
  assert.deepEqual(graph.edges.filter(edge => edge.from.startsWith('mysteries:')).map(edge => edge.to).sort(),
    ['chronicles:lang-gan', 'entities:lang-gan']);
  assert.ok(graph.edges.filter(edge => edge.from.startsWith('mysteries:')).every(edge =>
    edge.classification === 'unresolved' && edge.evidence.length === 1));
});

test('Bough Keeper links only the name documented by its official title', async () => {
  const load = async (collection, id) => {
    const raw = await readFile(new URL(`../src/content/${collection}/${id}.mdx`, import.meta.url), 'utf8');
    const data = parse(raw.match(/^---\r?\n([\s\S]*?)\r?\n---/u)[1]);
    return { collection, id, data: { relations: [], ...data } };
  };
  const graph = buildKnowledgeGraph(await Promise.all([
    load('quests', 'bough-keeper-dainsleif'), load('entities', 'dainsleif'),
  ]));
  assert.equal(graph.edges.length, 1);
  assert.equal(graph.edges[0].to, 'entities:dainsleif');
  assert.equal(graph.edges[0].spoilerLevel, 'none');
  assert.deepEqual(graph.edges[0].evidence.map(source => source.id), ['notas-oficiales-1-3']);
});

test('the questline pack keeps promotional evidence distinct from mission plot claims', async () => {
  const load = async (collection, id) => {
    const raw = await readFile(new URL(`../src/content/${collection}/${id}.mdx`, import.meta.url), 'utf8');
    const data = parse(raw.match(/^---\r?\n([\s\S]*?)\r?\n---/u)[1]);
    return { collection, id, data: { relations: [], ...data } };
  };
  const graph = buildKnowledgeGraph(await Promise.all([
    load('quests', 'requiem-of-the-echoing-depths'), load('quests', 'caribert'),
    load('quests', 'bedtime-story'), load('quests', 'paralogism'),
    load('quests', 'a-space-and-time-for-you'), load('entities', 'dainsleif'),
  ]));
  assert.equal(graph.nodes.filter(node => node.collection === 'quests').length, 5);
  assert.equal(graph.edges.length, 1);
  assert.equal(graph.edges[0].key, 'quests:bedtime-story/trailer-acredita-dainsleif');
  assert.equal(graph.edges[0].classification, 'interpretation');
  assert.deepEqual(graph.edges[0].evidence.map(source => source.id), ['trailer-oficial-4-7']);
  assert.match(graph.edges[0].explanation, /no afirma por sí solo/u);
});

test('three official creature descriptions add only their explicit Abyss Order affiliation', async () => {
  const load = async (collection, id) => {
    const raw = await readFile(new URL(`../src/content/${collection}/${id}.mdx`, import.meta.url), 'utf8');
    const data = parse(raw.match(/^---\r?\n([\s\S]*?)\r?\n---/u)[1]);
    return { collection, id, data: { relations: [], ...data } };
  };
  const graph = buildKnowledgeGraph(await Promise.all([
    load('entities', 'abyss-order'), load('entities', 'abyss-herald-wicked-torrents'),
    load('entities', 'abyss-lector-violet-lightning'), load('entities', 'abyss-herald-frost-fall'),
  ]));
  assert.equal(graph.nodes.length, 4);
  assert.equal(graph.edges.length, 3);
  assert.ok(graph.edges.every(edge => edge.type === 'part-of' && edge.to === 'entities:abyss-order'));
  assert.deepEqual(graph.edges.map(edge => edge.evidence[0].id).sort(), [
    'notas-oficiales-1-4-herald', 'notas-oficiales-1-5-lector', 'notas-oficiales-3-5-frost-fall',
  ]);
});

test('the seven nation records stay isolated and use only the two declared official presentations', async () => {
  const ids = ['mondstadt', 'liyue', 'inazuma', 'sumeru', 'fontaine', 'natlan', 'snezhnaya'];
  const entries = await Promise.all(ids.map(async (id) => {
    const raw = await readFile(new URL(`../src/content/entities/${id}.mdx`, import.meta.url), 'utf8');
    const data = parse(raw.match(/^---\r?\n([\s\S]*?)\r?\n---/u)[1]);
    assert.equal(data.entityType, 'nation');
    assert.equal(data.spoilerLevel, 'none');
    assert.equal(data.reviewStatus, 'verified');
    assert.equal(data.sources.length, 2);
    assert.ok(data.sources.some(source => source.id === `mapa-oficial-${id}`));
    assert.ok(data.sources.some(source => source.id === `travail-${id}`));
    return { collection: 'entities', id, data: { relations: [], ...data } };
  }));
  const graph = buildKnowledgeGraph(entries);
  assert.equal(graph.nodes.length, 7);
  assert.equal(graph.edges.length, 0);
  assert.ok(graph.nodes.every(node => node.href === `/entidades/${node.id.split(':')[1]}/`));
});
