import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { archonQuests, archonQuestSources } from '../src/data/archon-quests.ts';
import { archonQuestExpandedSummaries } from '../src/data/archon-quest-summaries.ts';

test('the Archon Quest archive covers every act through version 7.2', () => {
  assert.equal(archonQuests.length, 52);
  assert.equal(archonQuests[0].id, 'prologo-acto-i');
  assert.equal(archonQuests.at(-1).id, 'capitulo-vii-acto-vi');
  assert.equal(archonQuests.at(-1).version, '7.2');
  assert.deepEqual(archonQuests.map(({ order }) => order), Array.from({ length: 52 }, (_, index) => index + 1));
});

test('entries and source references are unique and complete', () => {
  assert.equal(new Set(archonQuests.map(({ id }) => id)).size, archonQuests.length);
  for (const entry of archonQuests) {
    assert.ok(entry.title && entry.summary && entry.arc && entry.region && entry.version);
    const source = archonQuestSources[entry.sourceId];
    assert.ok(source, `Missing source ${entry.sourceId} for ${entry.id}`);
    assert.match(source.href, /^https:\/\/(genshin\.hoyoverse\.com|www\.hoyolab\.com|www\.youtube\.com)\//);
  }
});

test('every linked detailed article exists in the content collection', () => {
  const linkedEntries = archonQuests.filter(({ articleHref }) => articleHref);
  assert.equal(linkedEntries.length, 6);
  for (const entry of linkedEntries) {
    const slug = entry.articleHref.split('/').filter(Boolean).at(-1);
    const md = fileURLToPath(new URL(`../src/content/quests/${slug}.md`, import.meta.url));
    const mdx = fileURLToPath(new URL(`../src/content/quests/${slug}.mdx`, import.meta.url));
    assert.ok(existsSync(md) || existsSync(mdx), `Missing detailed article for ${entry.id}`);
  }
});

test('every act has a substantial narrative summary and an explicit outcome', () => {
  assert.deepEqual(new Set(Object.keys(archonQuestExpandedSummaries)), new Set(archonQuests.map(({ id }) => id)));
  for (const entry of archonQuests) {
    const expanded = archonQuestExpandedSummaries[entry.id];
    assert.ok(expanded.narrative.length >= 280, `${entry.id} narrative is too short`);
    assert.ok(expanded.outcome.length >= 100, `${entry.id} outcome is too short`);
  }
});
