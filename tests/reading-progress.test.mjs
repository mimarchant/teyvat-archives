import test from 'node:test';
import assert from 'node:assert/strict';
import { clearProgress, decodeProgress, loadProgress, readingPosition, readingStorageKey,
  resumePosition, saveProgress } from '../src/lib/reading-progress.ts';

const record = { version: 1, revision: 'revision-a', anchor: 'section-a', offset: 0.5,
  percent: 40, completed: false, savedAt: 1000 };
const markers = [{ id: 'start', top: 200 }, { id: 'section-a', top: 400 }, { id: 'section-b', top: 800 }];
const storage = () => {
  const values = new Map();
  return { values, getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
};

test('persists position per collection and article without storing titles or body text', () => {
  const disk = storage();
  const key = readingStorageKey('chronicles', 'example/entry');
  assert.equal(saveProgress(disk, key, record), true);
  assert.deepEqual(loadProgress(disk, key), { record, available: true, invalid: false });
  assert.equal(loadProgress(disk, readingStorageKey('entities', 'example/entry')).record, null);
  assert.notEqual(key, readingStorageKey('chronicles', 'example%2Fentry'));
});
test('valid records are reconstructed with only known fields', () => {
  assert.deepEqual(decodeProgress(JSON.stringify({ ...record, title: 'not needed', body: 'not needed' })), record);
});
test('corrupt, oversized and unsupported records never crash the reader', () => {
  for (const raw of [null, '', '{', 'null', '[]', 'x'.repeat(4097), JSON.stringify({ ...record, version: 2 })]) {
    assert.equal(decodeProgress(raw), null);
  }
});
test('rejects invalid offsets, percentages, timestamps and control characters', () => {
  for (const patch of [{ offset: -1 }, { offset: 1.1 }, { offset: null }, { percent: 101 }, { percent: 2.5 },
    { percent: '10' }, { savedAt: -1 }, { savedAt: Number.MAX_SAFE_INTEGER + 1 }, { revision: '' },
    { anchor: 'bad\nanchor' }, { anchor: 'a'.repeat(257) }, { completed: 'true' }]) {
    assert.equal(decodeProgress(JSON.stringify({ ...record, ...patch })), null);
  }
});
test('missing and invalid storage records are distinguished', () => {
  const disk = storage();
  assert.deepEqual(loadProgress(disk, 'missing'), { record: null, available: true, invalid: false });
  disk.setItem('bad', '{');
  assert.deepEqual(loadProgress(disk, 'bad'), { record: null, available: true, invalid: true });
});
test('blocked storage and quota errors fall back without throwing', () => {
  const blocked = { getItem() { throw Error('blocked'); }, setItem() { throw Error('quota'); }, removeItem() { throw Error('blocked'); } };
  assert.deepEqual(loadProgress(blocked, 'key'), { record: null, available: false, invalid: false });
  assert.deepEqual(loadProgress(null, 'key'), { record: null, available: false, invalid: false });
  assert.equal(saveProgress(blocked, 'key', record), false);
  assert.equal(saveProgress(null, 'key', record), false);
  assert.equal(clearProgress(blocked, 'key'), false);
  assert.equal(clearProgress(null, 'key'), false);
});
test('reset removes only this article and leaves saved-library data untouched', () => {
  const disk = storage();
  const first = readingStorageKey('chronicles', 'first');
  const second = readingStorageKey('chronicles', 'second');
  saveProgress(disk, first, record); saveProgress(disk, second, record);
  disk.setItem('teyvat-archives:saved', '["first"]');
  assert.equal(clearProgress(disk, first), true);
  assert.equal(disk.getItem(first), null);
  assert.deepEqual(loadProgress(disk, second).record, record);
  assert.equal(disk.getItem('teyvat-archives:saved'), '["first"]');
});
test('capture selects the nearest preceding section and a bounded relative offset', () => {
  assert.deepEqual(readingPosition(400, 500, 200, 1200, markers), { anchor: 'section-a', offset: 0.25, percent: 40 });
  assert.deepEqual(readingPosition(0, 500, 200, 1200, markers), { anchor: 'start', offset: 0, percent: 0 });
  assert.deepEqual(readingPosition(1500, 500, 200, 1200, markers), { anchor: 'section-b', offset: 1, percent: 100 });
});
test('a short or missing article does not divide by zero or imply explicit completion', () => {
  assert.equal(readingPosition(100, 800, 200, 600, markers).percent, 100);
  assert.equal(readingPosition(100, 800, 200, 600, []), null);
});
test('restoring the same revision uses the saved relative section position', () => {
  const destination = resumePosition(record, 'revision-a', markers, 1200, 500);
  assert.equal(destination.anchor, 'section-a');
  assert.equal(destination.top, 499.5);
  assert.equal(destination.changed, false);
});
test('a changed revision returns to the section start and discards its old offset', () => {
  assert.deepEqual(resumePosition(record, 'revision-b', markers, 1200, 500), {
    anchor: 'section-a', top: 300, missing: false, changed: true, closed: false,
  });
});
test('a collapsed spoiler returns to its heading without opening it or using the hidden offset', () => {
  assert.deepEqual(resumePosition(record, 'revision-a', markers, 1200, 500, true), {
    anchor: 'section-a', top: 300, missing: false, changed: false, closed: true,
  });
});
test('removed or arbitrary anchors fall back to the article start', () => {
  const destination = resumePosition({ ...record, anchor: 'outside-article' }, 'revision-a', markers, 1200, 500);
  assert.equal(destination.anchor, 'start');
  assert.equal(destination.top, 100);
  assert.equal(destination.missing, true);
  assert.equal(resumePosition(record, 'revision-a', [], 1200, 500), null);
});
test('a 100 percent scroll position remains incomplete until the reader explicitly marks it read', () => {
  const position = readingPosition(1500, 500, 200, 1200, markers);
  const saved = decodeProgress(JSON.stringify({ ...record, ...position }));
  assert.equal(saved.percent, 100);
  assert.equal(saved.completed, false);
});
