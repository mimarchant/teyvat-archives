import test from 'node:test';
import assert from 'node:assert/strict';
import { spoilerLevels } from '../src/data/spoilers.ts';
import { isSearchableArticle } from '../src/lib/search-visibility.ts';

test('only verified articles without spoilers are eligible for search', () => {
  assert.equal(isSearchableArticle({ reviewStatus: 'verified', spoilerLevel: 'none' }), true);
});
test('draft and pending-review content stay out of search regardless of spoiler level', () => {
  for (const reviewStatus of ['draft', 'needs-review']) for (const spoilerLevel of spoilerLevels) {
    assert.equal(isSearchableArticle({ reviewStatus, spoilerLevel }), false);
  }
});
test('verification never exposes protected article content through search excerpts', () => {
  for (const spoilerLevel of spoilerLevels.filter(level => level !== 'none')) {
    assert.equal(isSearchableArticle({ reviewStatus: 'verified', spoilerLevel }), false);
  }
});
test('unrecognized metadata fails closed', () => {
  assert.equal(isSearchableArticle({ reviewStatus: 'published', spoilerLevel: 'none' }), false);
  assert.equal(isSearchableArticle({ reviewStatus: 'verified', spoilerLevel: 'unknown' }), false);
});
