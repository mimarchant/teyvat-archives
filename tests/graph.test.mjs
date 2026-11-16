import test from 'node:test';
import assert from 'node:assert/strict';
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
  assert.equal(graph.nodes.find(n => n.collection === 'entities').href, undefined);
  assert.equal(graph.nodes.find(n => n.collection === 'chronicles').href, '/cronicas/same/');
});
test('builds directed relationships with the origin evidence and editorial classification', () => {
  const graph = buildKnowledgeGraph(linked());
  assert.equal(graph.edges[0].from, 'chronicles:fixture-a');
  assert.equal(graph.edges[0].to, 'entities:fixture-b');
  assert.equal(graph.edges[0].classification, 'theory');
  assert.deepEqual(graph.edges[0].evidence, [source]);
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
